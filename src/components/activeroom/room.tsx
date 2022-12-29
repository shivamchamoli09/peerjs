import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ActiveUsersList from "./activeusers";
import MessageComponent from "./message";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useReducer, useState } from "react";
import {
  connectToSocket,
  sendToSocket,
} from "../../core/services/socketio.service";
import { SOCKET_CONNECTIONS } from "../../core/constants/socket.constants";
import {
  getCurrentUser,
  getCurrentUserToken,
} from "../../core/services/user.service";
import { useRouter } from "next/router";
import { LoaderContext } from "../../core/context/loader.context";
import TextFieldTemplate from "../common/TextField";
import RoomCall from "./room-call";
import dynamic from "next/dynamic";
import { peersReducer } from "../../core/reducers/peerReducer";
import {
  addPeerStreamAction,
  removeAllPeersAction,
  removePeerStreamAction,
} from "../../core/reducers/peerActions";
import { addDomEvent } from "framer-motion/types/events/use-dom-event";
import { usersReducer } from "../../core/reducers/roomusers.reducer";
import { observer, useLocalObservable } from "mobx-react-lite";
import { toJS } from "mobx";

const ActiveRoom = observer(() => {
  const user = getCurrentUser();
  const router = useRouter();
  const [messages, setMessages] = React.useState([] as any);
  const [room, setRoom] = React.useState({} as any);
  const [roomId, setRoomId] = React.useState("");
  const [subscribers, setSubscribers] = React.useState([] as any);
  const [subscribersCount, setSubscribersCount] = React.useState(0);
  // const [startCall, setStartCall] = React.useState(false);
  // const [initiateCall, setInitiateCall] = React.useState(false);
  const [streams, setStreams] = React.useState<MediaStream[]>();
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [formFields, setFormFields] = React.useState({
    message: "",
    type: "TEXT",
  });
  const [socket, setSocket] = React.useState(null as any);
  const [onSubmit, setOnSubmt] = React.useState(false);
  const [peer, setPeer] = React.useState<any>();
  const [connectedUsers, setConnectedUsers] = useState([] as any);

  const store = useLocalObservable(() => ({
    flags: {
      initiateCall: false,
      incomingCall: false,
      startCall: false,
    } as any,
    setFlags(key: string, value: boolean) {
      this.flags[key] = value;
    },
    roomUsers: [] as string[],
    setRoomUsers(data: string[]) {
      this.roomUsers = data;
    },
    calls: {} as any,
    setCalls(data: any) {
      this.calls = data;
    },
    peers: peers,
    setPeers(data: any) {
      this.peers = data;
    },
  }));

  useEffect(() => {
    if (roomId) {
      assignPeer();
    }
  }, [roomId]);

  useEffect(() => {
    if (store?.flags?.initiateCall && store?.flags?.startCall) {
      window.addEventListener("beforeunload", closeCall);
    }
  }, [store?.flags?.startCall, store?.flags?.initiateCall]);

  useEffect(() => {
    if (peer && socket) {
      try {
        addPeer();
      } catch (error) {
        console.log(error);
      }
    }
  }, [peer, socket]);

  function addPeer() {
    peer.on("call", async (call: any) => {
      store?.setCalls({ ...store?.calls, [call.peer]: call });
      acceptIncomingCalls();
    });
  }

  async function acceptIncomingCalls() {
    if (!store.flags?.initiateCall && !store?.flags?.startCall) return;
    const streamVid = await getVideoStream();
    Object.values(store?.calls)?.map((call: any, i: number) => {
      call.answer(streamVid);
      call.on("stream", async (peerStream: any) => {
        const peerId = connectedUsers.includes(call?.peer);
        if (!peerId) {
          setConnectedUsers((prev: any) =>
            Array?.from(new Set([...prev, user?._id]))
          );
          pushNewStream(call.peer, peerStream);
          captureStream();
        }
      });
    });
  }

  function getMyMedia() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((streamVid: MediaStream) => {
        pushNewStream(user._id, streamVid);
      });
  }

  function pushNewStream(id: string, stream: MediaStream) {
    dispatch(addPeerStreamAction(id, stream));
  }

  async function connectToPeer(peerId: string) {
    if (peer) {
      const streamVid = await getVideoStream();
      const call = peer?.call(peerId, streamVid);
      call.on("stream", (peerStream: any) => {
        if (!connectedUsers?.includes(peerId)) {
          setConnectedUsers((prev: any) =>
            Array?.from(new Set([...prev, peerId]))
          );
          pushNewStream(peerId, peerStream);
        }
      });
    }
  }

  async function captureStream() {
    try {
      if (typeof window === "undefined") {
        captureStream();
        return;
      }
      const vidStream = await getVideoStream();
      pushNewStream(user._id, vidStream);
      store?.roomUsers?.map((id: string) => {
        if (!connectedUsers?.includes(id) && store?.flags?.initiateCall) {
          connectToPeer(id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  function assignPeer() {
    const { Peer } = require("peerjs");
    if (typeof window === "undefined") {
      assignPeer();
      return;
    }
    const p = new Peer(user?._id);
    setPeer(p);
  }

  useEffect(() => {
    if (router?.query?.roomId && typeof router?.query?.roomId === "string") {
      setRoomId(router.query.roomId);
    }
  }, [router]);

  useEffect(() => {
    if (roomId?.length) {
      sendToSocket(
        SOCKET_CONNECTIONS.JOIN_ROOM,
        { room_id: roomId, token: getCurrentUserToken() },
        roomId
      );
      sendToSocket(
        SOCKET_CONNECTIONS.USER_JOINED,
        { room_id: roomId, token: getCurrentUserToken(), user_id: user?._id },
        roomId
      );
    }
  }, [roomId]);

  useEffect(() => {
    socketConnection();
  }, []);

  function setformValues(key: string, value: string) {
    setFormFields({ ...formFields, [key]: value });
  }

  async function getVideoStream(): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((streamVid: MediaStream) => {
          resolve(streamVid);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /**
   * required logic for socket connection and project requirements
   */
  async function socketConnection() {
    try {
      const socketClient = await connectToSocket();
      setSocket(socketClient);
      socketClient.on("fetchAllMessages", (data: any) => {
        setMessages(data?.data?.messages);
        setTimeout(() => {
          scrollChatToBottom();
        }, 500);
      });
      socketClient.on("fetchMessage", (data: any) => {
        setMessages((previousMessages: any) => [
          ...previousMessages,
          ...data?.data?.messages,
        ]);
        setTimeout(() => {
          scrollChatToBottom();
        }, 500);
      });
      socketClient.on("currentRoom", (data: any) => {
        setRoom(data?.data?.room);
      });
      socketClient.on(SOCKET_CONNECTIONS.SUBSCRIBED_USERS, (data: any) => {
        setSubscribers(data?.data?.users);
        setSubscribersCount(data?.data?.number_of_users);
      });
      socketClient.on("userDisconnected", (data: any) => {
        dispatch(removePeerStreamAction(data?.userId));
        console.log(peers);
        const index = connectedUsers?.indexOf(data?.userId);
        if (index > -1) {
          setConnectedUsers((prev: any) =>
            prev.filter((id: string) => id !== data?.userId)
          );
        }
        // const i = store?.roomUsers?.indexOf(data?.userId);
        // if (i > -1) {
        //     const userRoomsTemp = JSON.parse(JSON.stringify(store?.roomUsers));
        //     userRoomsTemp.splice(i, 1);
        //     store?.setRoomUsers(userRoomsTemp);
        // }
      });

      socketClient.on(SOCKET_CONNECTIONS.ON_USER_JOINED, (data) => {
        handleUserJoin(data);
      });

      socketClient.on(SOCKET_CONNECTIONS.CALL_STARTED, (data) => {
        store?.setFlags("incomingCall", true);
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function handleJoinCall() {
    store?.setFlags("initiateCall", true);
    store?.setFlags("startCall", true);
    if (Object.values(store?.calls)?.length) {
      acceptIncomingCalls();
    } else {
      captureStream();
    }
  }

  function handleUserJoin(data: any) {
    if (
      !store?.roomUsers?.includes(data?.userId) &&
      data?.userId !== user?._id
    ) {
      store?.setRoomUsers([...store?.roomUsers, data?.userId]);
    }
  }

  function handleStartCall() {
    store?.setFlags("startCall", true);
    store?.setFlags("initiateCall", true);
    captureStream();
    sendToSocket(
      "startCall",
      { room_id: roomId, token: getCurrentUserToken(), hostId: user?._id },
      roomId
    );
  }

  function handleMessageSend(e: any) {
    e?.preventDefault();
    setOnSubmt(true);
  }

  useEffect(() => {
    if (onSubmit && formFields?.message?.length) {
      sendToSocket(
        SOCKET_CONNECTIONS.MESSAGE_EVENT,
        { ...formFields, token: getCurrentUserToken(), room_id: roomId },
        roomId
      );
      setformValues("message", "");
      setOnSubmt(false);
    }
  }, [onSubmit, formFields]);

  function scrollChatToBottom() {
    const el = document?.querySelector("#messageBody") as any;
    if (el) {
      var messageBody = el;
      messageBody.scrollTop =
        messageBody?.scrollHeight - messageBody?.clientHeight;
    }
  }

  async function closeCall() {
    sendToSocket("disconnectUser", {
      room_id: roomId,
      token: getCurrentUserToken(),
    });
    setConnectedUsers([]);
    store?.setFlags("startCall", false);
    store?.setFlags("initiateCall", false);
    dispatch(removeAllPeersAction());
    window.removeEventListener("beforeunload", closeCall);
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h3" sx={{ p: 2 }}>
          {room?.name}
        </Typography>
        <Box sx={{ display: "flex", ml: "auto" }}>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            onClick={() => {
              closeCall();
              router.push("/rooms");
            }}
          >
            All Rooms
          </Button>
          <Button
            disabled={store?.flags?.incomingCall}
            sx={{ mr: 2 }}
            variant="contained"
            onClick={() => {
              handleStartCall();
            }}
          >
            Call
          </Button>
          {store?.flags?.incomingCall && (
            <Button
              sx={{ mr: 2 }}
              variant="contained"
              onClick={() => {
                handleJoinCall();
              }}
            >
              Join Call
            </Button>
          )}
        </Box>
      </Box>
      <Grid container>
        <Grid item md={8} sm={12} xs={12}>
          <Card variant="outlined" sx={{ m: 2 }}>
            <CardContent style={{ padding: "2rem" }}>
              <Box
                sx={{ height: "480px", overflowY: "scroll" }}
                id="messageBody"
              >
                {messages?.map((message: any, i: number) => {
                  return (
                    <MessageComponent
                      key={i}
                      username={message?.sender?.name}
                      message={message?.message}
                      align={
                        message?.sender?._id === user?._id ? "right" : "left"
                      }
                    />
                  );
                })}
              </Box>
              <Box>
                <form onSubmit={handleMessageSend}>
                  <TextFieldTemplate
                    sx={{ width: "90%" }}
                    value={formFields.message}
                    id="message"
                    name="message"
                    fullWidth
                    variant="outlined"
                    label="Type here"
                    onGetValues={onSubmit}
                    getValues={(e: any) => setformValues("message", e?.message)}
                  />
                  <Button
                    variant="contained"
                    sx={{ borderRadius: 15, ml: 2, height: "60px" }}
                    onClick={handleMessageSend}
                    startIcon={<SendIcon sx={{ fontSize: 160 }} />}
                  ></Button>
                </form>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={4} sm={12} xs={12} mt={2}>
          <Card variant="outlined">
            <CardContent style={{ padding: "1rem" }}>
              <Typography variant="h5" style={{ padding: "0px" }}>
                Subscribed Users({subscribersCount})
              </Typography>
              <ActiveUsersList users={subscribers} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {store?.flags?.startCall && (
        <RoomCall
          streams={streams}
          open={store?.flags?.startCall}
          roomId={roomId}
          peer={peer}
          peers={peers}
          onLeave={closeCall}
        />
      )}
    </Box>
  );
});

export default ActiveRoom;

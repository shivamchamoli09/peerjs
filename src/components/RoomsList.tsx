import { Button, Card, CardContent, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IMAGES } from "../core/constants/constants";
import { LoaderContext } from "../core/context/loader.context";
import { apiRequest } from "../core/services/http.service";
import CardComponent from "./common/Card";
import CreateRoom from "./rooms/create";

export default function ChannelList() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [createRoom, setCreateRoom] = useState(false);
  const [roomImages, setRoomImages] = useState([] as string[]);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    const response = await apiRequest("/rooms?status=ACTIVE", "GET", {});
    let c = 0;
    let img = roomImages;
    for (let i = 0; i < response?.data.length; i++) {
      img?.push(IMAGES[c++]);
      if (c === IMAGES.length) {
        c = 0;
      }
    }
    setRoomImages(img);
    setRooms(response?.data);
  }

  return (
    <Card variant="outlined" style={{ minHeight: "100vh" }}>
      <CardContent style={{ padding: "1rem" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ float: "right" }}
          onClick={() => setCreateRoom(!createRoom)}
        >
          Create Room
        </Button>
        <Grid container spacing={4}>
          {rooms?.map((room: any, i: number) => (
            <Grid item md={3} sm={12} xs={12} key={i}>
              <CardComponent
                image={roomImages[i]}
                id={room._id}
                title={room.name}
                description={room.description}
                subDescription={room?.subscribers?.number_of_users}
                onButtonClick={(id: string) => {
                  window?.location?.replace(`/rooms/${id}`);
                }}
                buttonText={"Join Room"}
              />
            </Grid>
          ))}
        </Grid>

        {createRoom && (
          <CreateRoom
            onClose={() => {
              setCreateRoom(false);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

import { IPeer } from "../types/peer.types";
import {
    ADD_PEER_STREAM,
    REMOVE_PEER_STREAM,
    ADD_PEER_NAME,
    ADD_ALL_PEERS,
    ADD_ALL_USERS,
    REMOVE_ALL_PEERS,
} from "./peerActions";

export type PeerState = Record<
    string,
    { stream?: MediaStream; userName?: string; peerId: string }
>;
type PeerAction =
    | {
        type: typeof ADD_PEER_STREAM;
        payload: { peerId: string; stream: MediaStream };
    }
    | {
        type: typeof REMOVE_PEER_STREAM;
        payload: { peerId: string };
    }
    | {
        type: typeof ADD_PEER_NAME;
        payload: { peerId: string; userName: string };
    }
    | {
        type: typeof ADD_ALL_PEERS;
        payload: {
            peers: Record<string, IPeer>;
        };
    }
    | {
        type: typeof ADD_ALL_USERS;
        payload: {
            users: any;
        }
    } | {
        type: typeof REMOVE_ALL_PEERS;
        payload: {};
    }

export const peersReducer = (state: PeerState, action: PeerAction) => {
    function isRecordExists(id: string, array: string[]) {
        return array?.includes(id);
    }

    switch (action.type) {
        case ADD_PEER_STREAM:
            return isRecordExists(action?.payload?.peerId, Object.keys(state)) ? state : {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    stream: action.payload.stream,
                },
            };
        case ADD_PEER_NAME:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    userName: action.payload.userName,
                },
            };
        case REMOVE_PEER_STREAM:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    stream: undefined,
                },
            };
        case ADD_ALL_PEERS:
            return { ...state, ...action.payload.peers };
        case REMOVE_ALL_PEERS:
            Object.values(state).forEach((stream: any) => {
                console.log(stream)
                stream?.stream?.getTracks().forEach((s: any) => s.stop())
            })
            return {};
        default:
            return { ...state };
    }
};
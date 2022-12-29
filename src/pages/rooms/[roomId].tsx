import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import ActiveRoom from "../../components/activeroom/room";
const ActiveRoom = dynamic(() => import('../../components/activeroom/room'));

export default function ActiveRoomPage() {
    return <ActiveRoom />
}
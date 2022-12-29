import { Typography } from "@mui/material";
import { useEffect, useRef } from "react"


export default function VideoPlayer({ stream, title }: { stream: MediaStream | undefined; title: string }) {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (stream && videoRef?.current) {
            videoRef.current.srcObject = stream;
        }
        if (!stream && videoRef?.current) {
            videoRef.current.srcObject = null;
        }
    }, [stream])

    return (<>
        <video id="video-streamer" width={'200px'} height="200px" ref={videoRef} autoPlay muted={true} />
        <Typography variant="h6">{title}</Typography>
    </>
    )
}
import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMWFjOTg2ZS01ZTI2LTQ2ZjUtODBmZC0xNjQ1Mjk2NjVhM2UiLCJpYXQiOjE3Mzc3MDQzNDR9.glozEwch0Ysr1mlDzA2zuTdR3WE209Hg4d_y-v6hSsc`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }
}


//token=
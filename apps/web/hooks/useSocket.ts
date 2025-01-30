"use client";
import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";
import { useSession } from "next-auth/react";

export function useSocket() {
    const session = useSession();
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();
    console.log("hook",session.data?.token)
    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=${session?.data?.token}`);
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
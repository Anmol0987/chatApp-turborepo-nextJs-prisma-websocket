import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMTU4ZGU0Yy01YjY5LTQ5YjUtOTIxYS00OTI3MjFkZGE1OGMiLCJpYXQiOjE3MzcxMzI0Njl9.PEn_SnDkzGA8qz2d0UmlaRalmboGxMgfZNE95vRn2mk`);
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
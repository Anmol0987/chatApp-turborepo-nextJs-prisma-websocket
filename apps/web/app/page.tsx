"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const [roomId, setRoomId] = useState("")
  const router = useRouter()
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "black"
    }}>
      <div>
        <div style={{
          display: "flex",
          flexDirection:"column",
          gap: "16px",
        }} >
          <input style={{padding:"15px"}} value={roomId} onChange={(e) => setRoomId(e.target.value)} type="text" placeholder="RoomId" />
          <button style={{padding:"15px"}} onClick={() => router.push(`/room/${roomId}`)}>Enter Room</button>
        </div>
      </div>
    </div>
  );
}

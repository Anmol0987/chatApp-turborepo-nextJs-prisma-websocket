"use client";
import { ArrowRight, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinRoomCard({isLogin,setIsLogin}:{isLogin:boolean,setIsLogin:React.Dispatch<React.SetStateAction<boolean>>}) {
    const [roomId, setRoomId] = useState('');
    const router = useRouter();
    const { data: session } = useSession();

    const joinRoomHandler = async () => {
        if(!isLogin || !session){
            alert("Please login first")
        }
        else{
            router.push(`/room/${roomId}`)
        }
    }

    return (<div>
        <h1 className="text-5xl font-bold mb-6">Connect, Chat, Collaborate</h1>
        <p className="text-gray-400 text-lg mb-8">
            Create or join chat rooms instantly. Share ideas, collaborate with teams,
            or just hang out with friends in real-time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
                type="text"
                placeholder="Enter room ID to join..."
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <button onClick={joinRoomHandler} className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition flex items-center justify-center space-x-2">
                <span>Join Room</span>
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span>1,234 users online now</span>
        </div>
    </div>
    )
}


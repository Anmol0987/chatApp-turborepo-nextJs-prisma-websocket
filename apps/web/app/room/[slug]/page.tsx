import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../../lib/auth";
import { useSession } from "next-auth/react";
const getId = async (slug: string) => {
    //@ts-ignore
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    console.log("Session:", session?.token);

    console.log("Slug+++++++++++++:", slug);
    try {
        console.log("Calling API");
        const response = await axios.get(`${BACKEND_URL}/room/${slug}`, {
            headers: {
                //@ts-ignore
                Authorization: session?.token
            }
        })
        console.log("Response", response);
        return response.data.room.id;
    } catch (error: any) {
        console.error("Error Fetching Room ID:");
    }
};

const chatRoomId = async ({ params }: { params: { slug: string } }) => {

    console.log("chatRoomId called");
    const slug = (await params).slug;
    console.log("Slug:", slug);
    const roomId = await getId(slug);
    console.log("Room ID:", roomId);
    return <ChatRoom id={roomId} />;
};

export default chatRoomId;

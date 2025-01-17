import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";
const getId = async (slug: string) => {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    console.log(response.data)
    return response.data.room.id

}

const chatRoomId = async ({ params }: { params: { slug: string } }) => {
    const slug = (await params).slug
    const roomId = await getId(slug)

    return (

        <ChatRoom id={roomId} ></ChatRoom>
    )
}

export default chatRoomId

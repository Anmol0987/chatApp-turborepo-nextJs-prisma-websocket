import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { ChatClient } from "./ChatClient";

const getMessages = async (id: string) => {
    const res = await axios.get(`${BACKEND_URL}/chats/${id}`)
    console.log("------------------------")
    console.log(res.data.messages)
    return res.data.messages

}
export const ChatRoom =async  ({ id }: { id: string }) => {

    const messages = await getMessages(id);
    return <ChatClient id={id} messages={messages} />

}
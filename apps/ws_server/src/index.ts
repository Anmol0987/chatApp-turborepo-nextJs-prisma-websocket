import { WebSocketServer, WebSocket } from "ws"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 })

interface User {
    userId: string
    ws: WebSocket
    rooms: string[]
}

const users: User[] = []

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded == "string") {
            console.log("string nul")
            return null;
        }

        if (!decoded || !decoded.userId) {
            console.log("decoded nul")
            return null;
        }

        return decoded.userId;
    } catch (e) {
        console.log(e)
        return null;
    }
    return null;
}

wss.on("connection", (ws, request) => {

    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    console.log(token)

    const userId = checkUser(token)
    console.log(userId)

    if (userId == null) {
        ws.close()
        return;
    }
    users.push({
        userId,
        ws,
        rooms: []
    })
    ws.on("message", async (data) => {
        let parsedData;
        if (typeof data !== "string") {
            parsedData = JSON.parse(data.toString());
        } else {
            parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
        }

        if (parsedData.type == "join_room") {
            const user = users.find(x => x.ws === ws)
            user?.rooms.push(parsedData.roomId)
        }

        if (parsedData.type == "leave_room") {
            const user = users.find(x => x.ws === ws)
            if (!user) {
                return;
            }
            user.rooms = user?.rooms.filter(x => x === parsedData.room)
        }

        if (parsedData.type == "chat") {
            const roomId = parsedData.roomId
            const message = parsedData.message

            await prismaClient.chat.create({
                data: {
                    message,
                    roomId: Number(roomId),
                    userId
                }
            })

            const roomUsers = users.filter(x => x.rooms.includes(roomId))
            roomUsers.forEach(x => x.ws.send(JSON.stringify({
                type: "chat",
                roomId: Number(roomId),
                message
            })))
        }

    })

})
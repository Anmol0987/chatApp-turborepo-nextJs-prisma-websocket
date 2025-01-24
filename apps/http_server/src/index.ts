import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleWare";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import cors from "cors"
const app = express();
app.use(express.json());

app.use(cors())

app.post("/signup", async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    console.log(parsedData)
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                name: parsedData.data.name,
                // TODO: Hash the pw
                password: parsedData.data.password
            }
        })
        console.log(user)
        res.json({
            userId: user?.id
        })
    }//4a809c7c-2dbd-4619-9e54-053d1b37bb9e
    catch (e) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
})

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // TODO: Compare the hashed pws here
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })
    if (!user) {
        res.status(403).json({
            message: "Not authorized"
        })
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.json({
        token
    })
})

// app.post("/room", middleware, async (req, res) => {

//     const parsedData = CreateRoomSchema.safeParse(req.body);
//     if (!parsedData.success) {
//         res.json({
//             message: "Incorrect inputs"
//         })
//         return;
//     }
//     // @ts-ignore: TODO: Fix this
//     const userId = req.userId;

//     try {
//         const room = await prismaClient.room.create({
//             data: {
//                 slug: parsedData.data.name,
//                 adminId: userId
//             }
//         })

//         res.json({
//             roomId: room.id
//         })
//     } catch (e) {
//         res.status(411).json({
//             message: "Room already exists with this name"
//         })
//     }
// })


app.get("/room/:slug",middleware, async (req, res) => {
    const slug = req.params.slug;
    //@ts-ignore
    const adminId = req.userId;
    console.log("slug",slug);
    try {
        let room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        });
        if (!room) {
            room = await prismaClient.room.create({
                data: {
                    slug: slug || '',
                    adminId
                }
            })
        }
        console.log("++++++++++++++++++", room);

        res.json({
            room
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error"
        });

    }
})
app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "asc"
            },
            take: 50
        });

        res.json({
            messages
        })
    } catch (e) {
        console.log(e);
        res.json({
            messages: []
        })
    }

})

app.listen(3001);
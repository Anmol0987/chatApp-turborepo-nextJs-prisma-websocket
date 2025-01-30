import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";

export function middleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        console.log("token", token);
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided",
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        if (!decoded) {
            //@ts-ignore
            req.userId = decoded.userId;
        }

        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({
            message: "Unauthorized: Token verification failed",
        });
    }
}

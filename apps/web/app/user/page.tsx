import { get } from "http";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../lib/auth";

export default function User() {
    //@ts-ignore
    const session = getServerSession(NEXT_AUTH_CONFIG);
    return (
        <div>
            <h1>User Page</h1>
            {JSON.stringify(session)}
        </div>
    );

}
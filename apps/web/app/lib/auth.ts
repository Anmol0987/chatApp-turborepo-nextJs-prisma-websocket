import axios from "axios";
import CredentialsProvider from 'next-auth/providers/credentials';

export const NEXT_AUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'username', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {
                console.log(process.env.NEXTAUTH_SECRET);
                console.log(credentials);
                try {
                    const response = await axios.post("http://localhost:3001/signin", {
                        username: credentials.username,
                        password: credentials.password
                    });
                    const user = response.data;
                    console.log("User received:", user);

                    if (user && user.token) {
                        return {
                            id: user.id,
                            username: user.username,
                            token: user.token,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Error in authorize function:", error);
                    return null;
                }
            },
        })
    ],
   
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 1, // 1 days
    },
    callbacks: {
        async jwt({ user, token }:any) {
            console.log("JWT Callback - User:", user);
            console.log("JWT Callback - Token:", token);

            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.token = user.token;
            }

            return token;
        },
        async session({ session, token }:any) {
            console.log("Session Callback - Token:", token);

            if (session.user) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.token = token.token;
                session.token = token.token;
            }

            console.log("Session after modification:", session);
            return session;
        }
    },
    pages: {
        signIn: "/",
    },
   
};

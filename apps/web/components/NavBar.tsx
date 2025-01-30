import Cookies from "js-cookie";
import { LogOutIcon, MessageSquare } from "lucide-react"
import { signOut, useSession } from "next-auth/react";

export default function NavBar({ setShowAuthModal, isLogin, setIsLogin }: { setShowAuthModal: any, isLogin: boolean, setIsLogin: any }) {
    const session = useSession();
    return (
        <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-2">
                <MessageSquare className="w-8 h-8" />
                <span className="text-xl font-bold">ChatRooms</span>
            </div>
            <div className="flex space-x-4">
                {isLogin || session.data ? (
                    <button
                        className="px-4 flex items-center py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
                    >
                        <LogOutIcon onClick={() => {
                            signOut();
                            setIsLogin(false)
                            setShowAuthModal(null)
                        }} className="w-4 h-4" />
                        <span className="ml-2">Sign Out</span>
                    </button>
                ) : (<>
                    <button
                        onClick={() => setShowAuthModal('signin')}
                        className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setShowAuthModal('signup')}
                        className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition"
                    >
                        Sign Up
                    </button>
                </>)}
            </div>
        </nav>
    )
}
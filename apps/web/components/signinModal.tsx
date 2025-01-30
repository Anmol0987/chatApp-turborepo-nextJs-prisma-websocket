"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
// import axios from "axios";
import { Eye, EyeOff, Github, Mail, UserRoundSearch } from "lucide-react";

export default function SigninModal({ onSwitch, setShowAuthModal, setIsLogin }: {
  onSwitch: () => void,
  setShowAuthModal: any,
  setIsLogin: any

}) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signinHandler = async (e: React.FormEvent) => {
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      console.log(res);
      setIsLogin(true);
      setShowAuthModal(null);
    } catch (error: any) {
      console.log(error);
    }
  };



  return (
    <div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
        <p className="text-gray-400">Sign in to continue to ChatRooms</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">username</label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <UserRoundSearch className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <button onClick={signinHandler} className="w-full py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
          Sign In
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-zinc-900 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition">
            <Mail className="w-5 h-5" />
            <span>Google</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition">
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <button onClick={onSwitch} className="text-white hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );

}
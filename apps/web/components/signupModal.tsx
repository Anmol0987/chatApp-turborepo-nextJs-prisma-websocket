"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Github, Mail, UserRoundSearch } from 'lucide-react';
import axios from 'axios';
export default function SignupModal({ onSwitch, setShowAuthModal }: {
    onSwitch: () => void
    setShowAuthModal: any
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const signupHandler = async () => {
        const response = await axios.post('http://localhost:3001/signup', {
            username,
            password,
            name
        }).then((res) => {
            if (res.data.userId !== null) {
                onSwitch()
            }
        }).catch((err) => {
            alert("wrong credentials")
        })
    }
    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Create an account</h2>
                <p className="text-gray-400">Join ChatRooms today</p>
            </div>

            <div className="space-y-4">
                <div className="">
                    <div className='relative'>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">username</label>
                    <div className="relative">
                        <input
                            type="email"
                            className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
                            placeholder="Enter your Username"
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
                            placeholder="Create a password"
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
                    <p className="mt-1 text-sm text-gray-400">Must be at least 3 characters</p>
                </div>
                <button onClick={signupHandler} className="w-full py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
                    Create Account
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
                    Already have an account?{' '}
                    <button onClick={onSwitch} className="text-white hover:underline">
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
}


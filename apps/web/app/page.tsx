"use client";
import React, { useState } from 'react';
import { MessageSquare, Users, Plus, ArrowRight, Lock, Globe, Mail, Eye, EyeOff, Github, ToggleLeft as Google, UserRoundSearch, User, X, LogOutIcon, LogOut } from 'lucide-react';
import axios from 'axios';
import { on } from 'events';


function App() {
  const [showAuthModal, setShowAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [roomId, setRoomId] = useState('');


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-8 h-8" />
            <span className="text-xl font-bold">ChatRooms</span>
          </div>
          <div className="flex space-x-4">
            {isLogin ? (
              <button
                onClick={()=>{
                  localStorage.removeItem('token')
                  setIsLogin(false)
                  setShowAuthModal(null)
                }}
                className="px-4 flex items-center py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
              >
                <LogOutIcon className="w-4 h-4" />
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">Connect, Chat, Collaborate</h1>
            <p className="text-gray-400 text-lg mb-8">
              Create or join chat rooms instantly. Share ideas, collaborate with teams,
              or just hang out with friends in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Enter room ID to join..."
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition flex items-center justify-center space-x-2">
                <span>Join Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="w-4 h-4" />
              <span>1,234 users online now</span>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Active Rooms</h3>
                <button className="p-2 flex items-center justify-center border-white/20 border-2 hover:bg-white/10 rounded-full transition gap-2">

                  <Plus className="w-5 h-5" />
                  <span>Create Room</span>
                </button>
              </div>

              <div className="space-y-4">
                <RoomCard
                  name="Design Team Sync"
                  members={8}
                  isPrivate={true}
                />
                <RoomCard
                  name="Coffee Chat"
                  members={12}
                  isPrivate={false}
                />
                <RoomCard
                  name="Project Alpha Discussion"
                  members={5}
                  isPrivate={true}
                />
              </div>
            </div>

            <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Globe className="w-6 h-6" />}
            title="Join Anywhere"
            description="Access your chat rooms from any device, anywhere in the world."
          />
          <FeatureCard
            icon={<Lock className="w-6 h-6" />}
            title="Secure Chats"
            description="End-to-end encryption ensures your conversations stay private."
          />
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Real-time Chat"
            description="Experience seamless, instant messaging with zero lag."
          />
        </div>
      </div>

      {/* Auth Modals */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-md relative border border-white/10">
            <button
              onClick={() => setShowAuthModal(null)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition"
            >
              <X />
            </button>

            {showAuthModal === 'signin' ? (
              <SignInForm setShowAuthModal={setShowAuthModal} setIsLogin={setIsLogin} onSwitch={() => setShowAuthModal('signup')} />
            ) : (
              <SignUpForm setShowAuthModal={setShowAuthModal} onSwitch={() => setShowAuthModal('signin')} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SignInForm({ onSwitch, setShowAuthModal, setIsLogin }: {
  onSwitch: () => void,
  setShowAuthModal: any,
  setIsLogin: any

}) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signinHandler = async () => {
    const response = await axios.post('http://localhost:3001/signin', {
      username,
      password
    })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      setIsLogin(true);
      setShowAuthModal(null)
    }
    else {
      alert("wrong credentials")
    }
  }


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
            <Google className="w-5 h-5" />
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
function SignUpForm({ onSwitch, setShowAuthModal }: {
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
            <Google className="w-5 h-5" />
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

function RoomCard({ name, members, isPrivate }: {
  name: string;
  members: number;
  isPrivate: boolean;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/10">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="font-medium">{name}</h4>
            {isPrivate && <Lock className="w-4 h-4 text-gray-400" />}
          </div>
          <p className="text-sm text-gray-400">{members} members</p>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition">
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="p-3 bg-white/10 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}




export default App;
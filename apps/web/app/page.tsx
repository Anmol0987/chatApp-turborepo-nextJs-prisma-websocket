"use client";
import React, { useState } from 'react';
import { MessageSquare, Users, Plus, ArrowRight, Lock, Globe, Mail, Eye, EyeOff, Github, ToggleLeft as Google, UserRoundSearch, User, X, LogOutIcon, LogOut } from 'lucide-react';
import SigninModal from '../components/signinModal';
import SignupModal from '../components/signupModal';
import FeatureCard from '../components/FeatureCard';
import ActiveRoomCard from '../components/ActiveRoomCard';
import JoinRoomCard from '../components/JoinRoomCard';
import NavBar from '../components/NavBar';
import { useSession } from 'next-auth/react';




function App() {
  const [showAuthModal, setShowAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const session = useSession();

  return (
    <div className="min-h-screen bg-black text-white">
      {JSON.stringify(session.data)}
      <div className="container mx-auto px-4 py-16">
        <NavBar setShowAuthModal={setShowAuthModal} isLogin={isLogin} setIsLogin={setIsLogin} />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <JoinRoomCard isLogin={isLogin} setIsLogin={setIsLogin} />
          <ActiveRoomCard />
        </div>
      </div>
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
              <SigninModal setShowAuthModal={setShowAuthModal} setIsLogin={setIsLogin} onSwitch={() => setShowAuthModal('signup')} />
            ) : (
              <SignupModal setShowAuthModal={setShowAuthModal} onSwitch={() => setShowAuthModal('signin')} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
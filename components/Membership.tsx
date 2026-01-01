
import React from 'react';
import { MembershipTier } from '../types';
import { ShieldCheck, Zap, Star, Bot, Headphones, Brain, Lock } from 'lucide-react';

const Membership: React.FC<{ onSelect: (tier: MembershipTier) => void }> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-y-auto">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
        {/* Free Plan */}
        <div className="bg-gray-900 border border-gray-800 rounded-[3rem] p-10 flex flex-col hover:border-gray-700 transition-colors">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-400">Standard Access</h2>
            <h1 className="text-4xl font-black text-white mt-1">Free Tier</h1>
            <p className="text-gray-500 mt-4 text-sm leading-relaxed">Essential cognitive maintenance and baseline tracking.</p>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-400">
              <ShieldCheck className="w-5 h-5 text-gray-600" /> Daily Brain Protocols (Lite)
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-400">
              <ShieldCheck className="w-5 h-5 text-gray-600" /> Basic IQ Tracking
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-400">
              <ShieldCheck className="w-5 h-5 text-gray-600" /> Smart To-Do List
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-800">
              <Lock className="w-4 h-4" /> AI Thinking Twin (Audio disabled)
            </li>
          </ul>

          <button 
            onClick={() => onSelect(MembershipTier.FREE)}
            className="w-full py-4 border-2 border-gray-800 rounded-2xl text-gray-400 font-bold hover:bg-gray-800 transition-all"
          >
            Start Base Training
          </button>
        </div>

        {/* Premium Plan */}
        <div className="relative bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[3rem] p-10 flex flex-col shadow-2xl shadow-indigo-500/20 transform md:scale-105">
          <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
            Recommended
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-indigo-100/60">Elite Access</h2>
            <h1 className="text-4xl font-black text-white mt-1">Premium</h1>
            <p className="text-indigo-100/70 mt-4 text-sm leading-relaxed">The complete neuro-adaptive ecosystem for 10x cognitive output.</p>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <Zap className="w-5 h-5 text-yellow-300" /> AI Tutor 24/7 + Backup Human Support
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <Bot className="w-5 h-5 text-indigo-200" /> AI Thinking Twin (Audio Spark™ Enabled)
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <Brain className="w-5 h-5 text-indigo-200" /> Cognitive Decay Monitor™ (CDM)
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <Star className="w-5 h-5 text-indigo-200" /> Neuro-Link™ Document Integration
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <Headphones className="w-5 h-5 text-indigo-200" /> Thought-to-Text Prewriting Assistant
            </li>
          </ul>

          <button 
            onClick={() => onSelect(MembershipTier.PREMIUM)}
            className="w-full py-5 bg-white text-indigo-900 font-black rounded-2xl shadow-xl hover:bg-gray-100 transition-all"
          >
            Go Premium Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Membership;

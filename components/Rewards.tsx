
import React from 'react';
import { Trophy, Medal, Star, Target, Zap, Crown } from 'lucide-react';

const Rewards: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Cognitive Achievements</h1>
          <p className="text-gray-400">Your roadmap to becoming a Polymath.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Total Neuro-Points</p>
          <p className="text-4xl font-black text-indigo-400">14,250</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/20 p-8 rounded-3xl flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-10 h-10 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold">The Synthesizer</h3>
          <p className="text-sm text-gray-500 mt-2">Combined 50 concepts in the Neuro-Link Recall Trainer.</p>
          <div className="w-full h-2 bg-gray-800 rounded-full mt-6">
            <div className="w-full h-full bg-amber-500 rounded-full" />
          </div>
          <p className="text-[10px] text-amber-500 font-bold uppercase mt-2 tracking-widest">Completed</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
            <Crown className="w-10 h-10 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold">Hyper-Focus King</h3>
          <p className="text-sm text-gray-500 mt-2">Maintain 90%+ focus for 4 hours consecutive.</p>
          <div className="w-full h-2 bg-gray-800 rounded-full mt-6">
            <div className="w-3/4 h-full bg-indigo-500 rounded-full" />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase mt-2 tracking-widest">75% Complete</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
            <Zap className="w-10 h-10 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold">Quantum Thinker</h3>
          <p className="text-sm text-gray-500 mt-2">Solve 10 logic riddles in under 60 seconds.</p>
          <div className="w-full h-2 bg-gray-800 rounded-full mt-6">
            <div className="w-1/4 h-full bg-emerald-500 rounded-full" />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase mt-2 tracking-widest">2/10 Solved</p>
        </div>
      </div>
    </div>
  );
};

export default Rewards;

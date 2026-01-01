
import React, { useState } from 'react';
import { MembershipTier } from '../types';
import { Brain, Zap, Target, Box, Compass, Timer, Moon, Activity, Grid3X3, Share2 } from 'lucide-react';

const modes = [
  { id: 'adaptive', name: 'Neuro-Adaptive Engine', icon: Brain, color: 'from-blue-500 to-indigo-600', premium: false, desc: 'Detects fatigue & adjusts difficulty' },
  { id: 'reflex', name: 'Mental Reflex Gym', icon: Zap, color: 'from-orange-500 to-red-600', premium: false, desc: 'Reaction time & Stroop drills' },
  { id: 'reality', name: 'Reality Riddle Simulator', icon: Box, color: 'from-purple-500 to-pink-600', premium: true, desc: 'AR-based spatial logic tasks' },
  { id: 'mapping', name: 'Smart Mind Mapping', icon: Grid3X3, color: 'from-emerald-500 to-teal-600', premium: true, desc: 'Behavior & style analysis' },
  { id: 'recall', name: 'Neuro-Link Recall', icon: Compass, color: 'from-cyan-500 to-blue-600', premium: true, desc: 'Long-term memory boosting' },
  { id: 'time', name: 'Time-Bending Tasks', icon: Timer, color: 'from-amber-500 to-yellow-600', premium: true, desc: 'High-speed decision games' },
  { id: 'dream', name: 'Dream-to-Task Enhancer', icon: Moon, color: 'from-indigo-600 to-purple-800', premium: true, desc: 'Logs to creative puzzles' },
  { id: 'riddle', name: 'Riddle Your Life', icon: Activity, color: 'from-slate-600 to-slate-800', premium: false, desc: 'Schedule into logic riddles' },
];

const TrainingHub: React.FC<{ tier: MembershipTier }> = ({ tier }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'premium' | 'daily'>('all');

  const filteredModes = modes.filter(m => {
    if (activeTab === 'premium') return m.premium;
    if (activeTab === 'daily') return !m.premium;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Neuro-Adaptive Training Center</h1>
          <p className="text-gray-400">Scientifically designed protocols to maximize synaptic plasticity.</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
          <Share2 className="w-4 h-4" /> Share Progress
        </button>
      </header>

      <div className="flex gap-2 p-1 bg-gray-900 w-fit rounded-2xl border border-gray-800">
        {(['all', 'premium', 'daily'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
              activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab === 'daily' ? 'Base Training' : tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredModes.map((mode) => (
          <div 
            key={mode.id}
            className={`group relative overflow-hidden bg-gray-900 border border-gray-800 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 ${
              mode.premium && tier === MembershipTier.FREE ? 'opacity-50 grayscale' : ''
            }`}
          >
            <div className={`h-2 w-full bg-gradient-to-r ${mode.color}`} />
            <div className="p-6">
              <div className={`w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <mode.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{mode.name}</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{mode.desc}</p>
              
              {mode.premium && tier === MembershipTier.FREE ? (
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4" /> Premium Required
                </div>
              ) : (
                <button className="w-full bg-gray-800 group-hover:bg-indigo-600 py-3 rounded-xl text-sm font-bold transition-all">
                  Initiate Sync
                </button>
              )}
            </div>
            
            {/* Visual background effect */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${mode.color} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingHub;

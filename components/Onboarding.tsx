
import React, { useState } from 'react';
import { UserProfile, MembershipTier } from '../types';
import { BrainCircuit, ArrowRight, User, GraduationCap, Target, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: Omit<UserProfile, 'tier'>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    course: '',
    strengthAreas: [] as string[],
    focusGoals: [] as string[]
  });

  const next = () => setStep(s => s + 1);

  const handleSubmit = () => {
    onComplete({
      ...formData,
      cognitiveScore: 8.5, // Initial baseline
      productivityLevel: 6.0,
      iqBaseline: 110
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-black to-black">
      <div className="max-w-lg w-full bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl space-y-8 animate-in zoom-in-95 duration-700">
        <header className="text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-indigo-500/20 rotate-3">
            <BrainCircuit className="text-white w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tighter">NEURO-ELEVATE</h1>
            <p className="text-gray-400 text-sm">Initialize your cognitive-shadow synchronization protocol.</p>
          </div>
        </header>

        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <label className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                <User className="w-3 h-3" /> Identity Signature
              </label>
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-5 py-4 text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-indigo-400 uppercase tracking-widest">Chronological Age</label>
              <input 
                type="number" 
                placeholder="Age"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-5 py-4 text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={formData.age || ''}
                onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
              />
            </div>
            <button 
              disabled={!formData.name || !formData.age}
              onClick={next}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 transition-all group"
            >
              Continue Calibration <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <label className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <GraduationCap className="w-3 h-3" /> Intellectual Pathway
              </label>
              <input 
                type="text" 
                placeholder="Main Course / Field of Focus"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-5 py-4 text-gray-100 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                value={formData.course}
                onChange={e => setFormData({...formData, course: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <Target className="w-3 h-3" /> Primary Focus Goal
              </label>
              <select 
                className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-5 py-4 text-gray-100 outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                onChange={e => setFormData({...formData, focusGoals: [e.target.value]})}
              >
                <option value="">Select Priority</option>
                <option value="IQ Enhancement">IQ Enhancement</option>
                <option value="Productivity Burst">Productivity Burst</option>
                <option value="Deep Focus">Deep Focus</option>
                <option value="Creative Synthesis">Creative Synthesis</option>
              </select>
            </div>
            <button 
              disabled={!formData.course}
              onClick={handleSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all group"
            >
              Sync Neural Profile <Sparkles className="w-5 h-5" />
            </button>
            <button onClick={() => setStep(1)} className="w-full text-xs text-gray-500 hover:text-gray-300 font-bold uppercase tracking-widest">Back</button>
          </div>
        )}

        <div className="flex justify-center gap-2">
          <div className={`w-12 h-1 rounded-full ${step === 1 ? 'bg-indigo-500' : 'bg-gray-800'}`} />
          <div className={`w-12 h-1 rounded-full ${step === 2 ? 'bg-indigo-500' : 'bg-gray-800'}`} />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

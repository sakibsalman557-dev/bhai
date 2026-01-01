
import React from 'react';
import { UserProfile, MembershipTier } from '../types';
import { Settings as SettingsIcon, Shield, User, Bell, Fingerprint, Database, LogOut } from 'lucide-react';

const Settings: React.FC<{ profile: UserProfile, setProfile: (p: UserProfile) => void }> = ({ profile, setProfile }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-bold">System Configuration</h1>
        <p className="text-gray-400">Fine-tune your neural interface and privacy parameters.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-2">
          {[
            { label: 'Profile Settings', icon: User, active: true },
            { label: 'Neural Security', icon: Shield, active: false },
            { label: 'Neuro-Notifications', icon: Bell, active: false },
            { label: 'Biometric Learning ID', icon: Fingerprint, active: false },
            { label: 'Cloud Persistence', icon: Database, active: false },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-800'}`}>
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </aside>

        <div className="md:col-span-2 space-y-6">
          <section className="bg-gray-900 border border-gray-800 p-8 rounded-[2rem] space-y-6">
            <h2 className="text-lg font-bold">Neural Fingerprint Learning ID™</h2>
            <div className="flex items-center gap-6 p-6 bg-gray-950 rounded-2xl border border-indigo-500/20">
              <div className="p-4 bg-indigo-500/10 rounded-full">
                <Fingerprint className="w-8 h-8 text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">Learning ID: 092-XFA-992</p>
                <p className="text-xs text-gray-500 mt-1">Your cognitive fingerprint is encrypted and stored locally. Used for Neuro-Adaptive Challenge Engine™ synchronization.</p>
              </div>
              <button className="text-xs font-black text-indigo-400 uppercase tracking-widest px-4 py-2 border border-indigo-400/30 rounded-lg hover:bg-indigo-400/10">Re-Scan</button>
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex justify-between items-center py-4 border-b border-gray-800">
                <div>
                  <p className="font-bold">Mind Drift Guardian™ (MDG)</p>
                  <p className="text-xs text-gray-500">Enable real-time focus correction via camera analysis.</p>
                </div>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-800">
                <div>
                  <p className="font-bold">Cognitive Decay Monitor™</p>
                  <p className="text-xs text-gray-500">Alert me when logic stability drops below 75%.</p>
                </div>
                <div className="w-12 h-6 bg-gray-700 rounded-full relative cursor-pointer">
                   <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                localStorage.removeItem('neuro_profile');
                window.location.reload();
              }}
              className="flex items-center gap-2 text-red-400 text-sm font-bold hover:text-red-300 transition-colors mt-8"
            >
              <LogOut className="w-4 h-4" /> Erase Cognitive Profile Data
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;

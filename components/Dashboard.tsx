
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { UserProfile } from '../types';
import { Zap, Target, Brain, Activity, Clock, ShieldAlert } from 'lucide-react';

const iqData = [
  { day: 'Mon', score: 110 },
  { day: 'Tue', score: 112 },
  { day: 'Wed', score: 115 },
  { day: 'Thu', score: 114 },
  { day: 'Fri', score: 118 },
  { day: 'Sat', score: 121 },
  { day: 'Sun', score: 125 },
];

const skillData = [
  { subject: 'Memory', A: 120, B: 110, fullMark: 150 },
  { subject: 'Logic', A: 98, B: 130, fullMark: 150 },
  { subject: 'Focus', A: 86, B: 130, fullMark: 150 },
  { subject: 'Creativity', A: 99, B: 100, fullMark: 150 },
  { subject: 'Speed', A: 85, B: 90, fullMark: 150 },
  { subject: 'Analysis', A: 65, B: 85, fullMark: 150 },
];

const Dashboard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Neuro-Intelligence Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {profile.name}. Your cognitive state is <span className="text-green-400 font-semibold">Optimal</span>.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-700 flex items-center gap-2">
            <Zap className="text-yellow-400 w-4 h-4" />
            <span className="text-sm font-semibold">Streak: 12 Days</span>
          </div>
        </div>
      </header>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'IQ Baseline', val: profile.iqBaseline, change: '+5%', icon: Brain, color: 'text-blue-400' },
          { label: 'Productivity', val: `${profile.productivityLevel}/10`, change: '+12%', icon: Target, color: 'text-purple-400' },
          { label: 'Cognitive Score', val: profile.cognitiveScore, change: '+2.1', icon: Activity, color: 'text-emerald-400' },
          { label: 'Deep Work', val: '4.2h', change: '-5m', icon: Clock, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900/40 p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg bg-gray-800 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold mt-1 text-white">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Charts */}
          <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2"><Activity className="w-5 h-5 text-indigo-400" /> Daily IQ Trajectory</h3>
              <select className="bg-gray-800 border-none rounded-lg text-xs font-semibold p-2 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={iqData}>
                  <defs>
                    <linearGradient id="colorIq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="day" stroke="#9ca3af" axisLine={false} tickLine={false} />
                  <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorIq)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 shadow-xl">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6"><Brain className="w-5 h-5 text-purple-400" /> Cognitive Mind-Style</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" stroke="#9ca3af" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#374151" tick={false} />
                  <Radar name="You" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Observation Card */}
          <div className="bg-indigo-950/20 border border-indigo-500/30 p-6 rounded-2xl flex items-start gap-4">
            <div className="bg-indigo-500/20 p-3 rounded-full">
              <ShieldAlert className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h4 className="font-bold text-indigo-100">AI Twin Observation: Cognitive Decay Alert</h4>
              <p className="text-indigo-200/70 text-sm mt-1">
                "We've detected a slight decline in your 'Logic' stability over the last 48 hours. This typically correlates with a lack of REM sleep. Consider attempting the 'Neuro-Link Recall Trainer' before 10 PM today to stabilize associations."
              </p>
              <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
                Initiate Stabilization
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

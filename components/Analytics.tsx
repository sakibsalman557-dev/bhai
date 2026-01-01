
import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Clock, Activity, FileDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const focusData = [
  { name: 'Mon', hours: 4.5 },
  { name: 'Tue', hours: 5.2 },
  { name: 'Wed', hours: 3.8 },
  { name: 'Thu', hours: 6.1 },
  { name: 'Fri', hours: 4.9 },
  { name: 'Sat', hours: 2.5 },
  { name: 'Sun', hours: 1.2 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance Analytics</h1>
          <p className="text-gray-400">Long-term cognitive growth trends and productivity correlations.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20">
          <FileDown className="w-5 h-5" /> Export Weekly Growth Report
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900/60 p-8 rounded-[2.5rem] border border-gray-800 shadow-xl">
          <h3 className="text-lg font-bold mb-8 flex items-center gap-2"><Clock className="w-5 h-5 text-indigo-400" /> Deep Work Hours / Week</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={focusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" axisLine={false} tickLine={false} />
                <YAxis stroke="#6b7280" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#374151', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }}
                />
                <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                  {focusData.map((entry, index) => (
                    <Cell key={index} fill={entry.hours > 5 ? '#6366f1' : '#4f46e5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl">
                <TrendingUp className="text-emerald-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-400 text-sm uppercase tracking-wider">Reasoning Accuracy</h4>
                <p className="text-2xl font-black text-white">+14.2% <span className="text-sm font-normal text-gray-500">vs last week</span></p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-500/10 rounded-2xl">
                <Activity className="text-indigo-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-400 text-sm uppercase tracking-wider">Brain Performance Index</h4>
                <p className="text-2xl font-black text-white">88/100</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Optimization</span>
                <span>Peak Efficiency</span>
              </div>
              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: '88%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

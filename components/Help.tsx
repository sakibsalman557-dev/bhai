
import React from 'react';
import { HelpCircle, Book, MessageSquare, Shield, Video, Zap } from 'lucide-react';

const Help: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-bold">Knowledge Base & Support</h1>
        <p className="text-gray-400">Everything you need to master the NeuroElevate ecosystem.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: Book, title: 'Neural Science Docs', desc: 'The science behind our Neuro-Adaptive protocols.' },
          { icon: Video, title: 'App Masterclass', desc: 'Tutorials on using the AI Twin & OCR scanner.' },
          { icon: MessageSquare, title: 'AI Assistant Help', desc: 'Chat with our support twin for instant fixes.' },
          { icon: Shield, title: 'Privacy & Data', desc: 'Learn how we secure your cognitive fingerprint.' },
        ].map((item, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-3xl hover:border-gray-700 transition-all flex items-start gap-4">
            <div className="p-3 bg-gray-800 rounded-2xl">
              <item.icon className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 p-8 rounded-3xl relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-2xl font-black text-white">Need a Backup Human Tutor?</h2>
          <p className="text-indigo-100/70 mt-2 max-w-lg">If the AI Twin fails to resolve your cognitive blockage, our expert human neuro-coaches are available for Premium members 24/7.</p>
          <button className="mt-6 bg-white text-indigo-600 px-8 py-3 rounded-2xl font-black hover:scale-105 transition-transform">
            Connect to Human Support
          </button>
        </div>
        <Zap className="absolute -bottom-10 -right-10 w-48 h-48 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
      </div>
    </div>
  );
};

export default Help;


import React from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  CheckSquare, 
  BarChart3, 
  Lightbulb, 
  UserCircle2, 
  Trophy, 
  Settings, 
  HelpCircle 
} from 'lucide-react';
import { AppRoute } from '../types';

interface SidebarProps {
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeRoute, onNavigate }) => {
  const items = [
    { route: AppRoute.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { route: AppRoute.TRAINING, icon: BrainCircuit, label: 'Training' },
    { route: AppRoute.TASKS, icon: CheckSquare, label: 'Tasks' },
    { route: AppRoute.ANALYTICS, icon: BarChart3, label: 'Analytics' },
    { route: AppRoute.AI_TIPS, icon: Lightbulb, label: 'AI Tips' },
    { route: AppRoute.AI_TWIN, icon: UserCircle2, label: 'AI Twin' },
    { route: AppRoute.REWARDS, icon: Trophy, label: 'Rewards' },
    { route: AppRoute.SETTINGS, icon: Settings, label: 'Settings' },
    { route: AppRoute.HELP, icon: HelpCircle, label: 'Help' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <BrainCircuit className="text-white w-5 h-5" />
        </div>
        <span className="hidden md:block font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          NeuroElevate
        </span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {items.map((item) => (
          <button
            key={item.route}
            onClick={() => onNavigate(item.route)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
              activeRoute === item.route 
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-inner' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <item.icon className={`w-5 h-5 transition-colors ${activeRoute === item.route ? 'text-indigo-400' : 'group-hover:text-gray-200'}`} />
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-800">
        <div className="hidden md:flex items-center gap-3 p-3 bg-gray-800/50 rounded-2xl border border-gray-700/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold">
            NE
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">Elite User</p>
            <p className="text-xs text-gray-500">Neuro-Level: 8.4</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

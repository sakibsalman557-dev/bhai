
import React, { useState, useEffect } from 'react';
import { AppRoute, UserProfile, MembershipTier } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TrainingHub from './components/TrainingHub';
import TaskManager from './components/TaskManager';
import Analytics from './components/Analytics';
import AITwin from './components/AITwin';
import Onboarding from './components/Onboarding';
import Membership from './components/Membership';
import Settings from './components/Settings';
import Help from './components/Help';
import AITips from './components/AITips';
import Rewards from './components/Rewards';
import FocusGuardian from './components/FocusGuardian';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.DASHBOARD);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [needsMembership, setNeedsMembership] = useState(false);

  // Load profile from local storage if exists
  useEffect(() => {
    const saved = localStorage.getItem('neuro_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
      setIsOnboarding(false);
    }
  }, []);

  const handleProfileComplete = (newProfile: Omit<UserProfile, 'tier'>) => {
    setProfile({ ...newProfile, tier: MembershipTier.FREE } as UserProfile);
    setIsOnboarding(false);
    setNeedsMembership(true);
  };

  const handleMembershipSelection = (tier: MembershipTier) => {
    if (profile) {
      const updated = { ...profile, tier };
      setProfile(updated);
      localStorage.setItem('neuro_profile', JSON.stringify(updated));
    }
    setNeedsMembership(false);
  };

  if (isOnboarding) {
    return <Onboarding onComplete={handleProfileComplete} />;
  }

  if (needsMembership) {
    return <Membership onSelect={handleMembershipSelection} />;
  }

  const renderRoute = () => {
    switch (currentRoute) {
      case AppRoute.DASHBOARD: return <Dashboard profile={profile!} />;
      case AppRoute.TRAINING: return <TrainingHub tier={profile?.tier!} />;
      case AppRoute.TASKS: return <TaskManager />;
      case AppRoute.ANALYTICS: return <Analytics />;
      case AppRoute.AI_TWIN: return <AITwin tier={profile?.tier!} />;
      case AppRoute.AI_TIPS: return <AITips />;
      case AppRoute.REWARDS: return <Rewards />;
      case AppRoute.SETTINGS: return <Settings profile={profile!} setProfile={setProfile} />;
      case AppRoute.HELP: return <Help />;
      default: return <Dashboard profile={profile!} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden relative">
      <Sidebar activeRoute={currentRoute} onNavigate={setCurrentRoute} />
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 to-black p-4 md:p-8 relative">
        {renderRoute()}
      </main>
      
      {/* Global Mind Drift Guardian persistence */}
      <FocusGuardian />
    </div>
  );
};

export default App;

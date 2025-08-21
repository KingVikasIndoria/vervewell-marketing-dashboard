import React from 'react';
import { VerveWellDashboard } from './components/VerveWellDashboard';
import { MarketingCopilot } from './components/MarketingCopilot';

export default function App() {
  return (
    <div className="relative">
      <VerveWellDashboard />
      <MarketingCopilot />
    </div>
  );
}
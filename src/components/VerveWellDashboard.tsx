import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts';
import { TrendingUp, TrendingDown, Bell, User, Calendar, Target, Zap, Clock, BarChart3, Users, Globe, Smartphone, AlertTriangle, CheckCircle, XCircle, Play, Pause, Edit, Eye, Filter, Download, Settings, RefreshCw } from 'lucide-react';

const performanceData = [
  { date: '2024-01-01', agent: 3.4, traditional: 1.2, industry: 1.1 },
  { date: '2024-01-02', agent: 3.6, traditional: 1.3, industry: 1.0 },
  { date: '2024-01-03', agent: 3.2, traditional: 1.1, industry: 1.1 },
  { date: '2024-01-04', agent: 2.9, traditional: 1.0, industry: 1.0 },
  { date: '2024-01-05', agent: 3.8, traditional: 1.4, industry: 1.2 },
  { date: '2024-01-06', agent: 3.5, traditional: 1.2, industry: 1.1 },
  { date: '2024-01-07', agent: 3.3, traditional: 1.1, industry: 1.0 },
];

const channelData = [
  { name: 'YouTube', roas: 4.8, amount: 4800, ctr: 2.9, cpc: 12.50, frequency: 3.2 },
  { name: 'Facebook', roas: 4.2, amount: 4200, ctr: 2.1, cpc: 15.80, frequency: 4.1 },
  { name: 'Instagram', roas: 3.9, amount: 3900, ctr: 1.8, cpc: 18.20, frequency: 2.8 },
  { name: 'Google Ads', roas: 4.5, amount: 4500, ctr: 3.4, cpc: 11.20, frequency: 2.1 },
  { name: 'LinkedIn', roas: 3.2, amount: 3200, ctr: 1.4, cpc: 22.40, frequency: 1.9 },
];

const conversionData = [
  { stage: 'Impressions', value: 500000, percentage: 100 },
  { stage: 'Clicks', value: 25000, percentage: 5.0 },
  { stage: 'Views', value: 20000, percentage: 4.0 },
  { stage: 'Leads', value: 8000, percentage: 1.6 },
  { stage: 'Conversions', value: 2400, percentage: 0.48 },
];

const regionalData = [
  { name: 'Mumbai', value: 35, color: '#00ff88', engagement: '+18%', tier: 'Tier-1' },
  { name: 'Delhi', value: 28, color: '#ff6b6b', engagement: '+12%', tier: 'Tier-1' },
  { name: 'Bangalore', value: 20, color: '#4ecdc4', engagement: '+15%', tier: 'Tier-1' },
  { name: 'Tier-2 Cities', value: 17, color: '#ffe66d', engagement: '+23%', tier: 'Tier-2' },
];

const revenueData = [
  { channel: 'Digital (Agent-optimized)', amount: 450000, percentage: 60 },
  { channel: 'Traditional Media', amount: 225000, percentage: 30 },
  { channel: 'Influencer Marketing', amount: 75000, percentage: 10 },
];

const velocityMetricsData = [
  {
    metric: 'Campaign Launch Time',
    preAgent: '14 days',
    postAgent: '2 days',
    improvement: '85%',
    description: 'From ideation to go-live',
    status: 'excellent',
    trend: '+12% this quarter'
  },
  {
    metric: 'Creative Refresh Time',
    preAgent: '14 days',
    postAgent: '2 days',
    improvement: '85%',
    description: 'Agent-triggered creative updates',
    status: 'excellent',
    trend: '+8% this quarter'
  },
  {
    metric: 'Optimization Response',
    preAgent: '4 hours',
    postAgent: '15 mins',
    improvement: '94%',
    description: 'Time to react to performance dips',
    status: 'excellent',
    trend: '+5% this quarter'
  },
  {
    metric: 'A/B Test Completion',
    preAgent: '10 days',
    postAgent: '3 days',
    improvement: '70%',
    description: 'Statistical significance reached',
    status: 'good',
    trend: '+3% this quarter'
  },
  {
    metric: 'Budget Reallocation',
    preAgent: '2 days',
    postAgent: '30 mins',
    improvement: '75%',
    description: 'Cross-channel budget optimization',
    status: 'good',
    trend: '+15% this quarter'
  },
  {
    metric: 'Personalization Deployment',
    preAgent: '7 days',
    postAgent: '2 hours',
    improvement: '88%',
    description: 'Localized content delivery',
    status: 'excellent',
    trend: '+20% this quarter'
  }
];

const campaignPerformanceData = [
  { 
    campaign: '18-34 Female (Brand X Core)', 
    demographics: 'Millennials',
    region: 'Pan-India',
    ctr: '2.8%', 
    roas: '₹4.5', 
    reach: '₹0.4L',
    conversions: 1200,
    cpc: '₹12.50',
    frequency: 3.2,
    trend: 'up',
    trendPercent: '+15%',
    agentOptimized: true
  },
  { 
    campaign: '25-40 Female (Brand X Premium)', 
    demographics: 'Millennials',
    region: 'Metro Cities',
    ctr: '3.1%', 
    roas: '₹5.2', 
    reach: '₹0.8L',
    conversions: 2300,
    cpc: '₹10.80',
    frequency: 2.8,
    trend: 'up',
    trendPercent: '+8%',
    agentOptimized: true
  },
  { 
    campaign: '18-25 Male (Brand X Core)', 
    demographics: 'Gen Z',
    region: 'Tier-2 Cities',
    ctr: '2.1%', 
    roas: '₹3.9', 
    reach: '₹1.1K',
    conversions: 850,
    cpc: '₹15.20',
    frequency: 4.1,
    trend: 'down',
    trendPercent: '-5%',
    agentOptimized: false
  },
  { 
    campaign: '25-35 Male (Brand X Premium)', 
    demographics: 'Millennials',
    region: 'Mumbai/Delhi',
    ctr: '2.4%', 
    roas: '₹4.8', 
    reach: '₹1.8K',
    conversions: 1450,
    cpc: '₹11.90',
    frequency: 2.5,
    trend: 'up',
    trendPercent: '+12%',
    agentOptimized: true
  },
  { 
    campaign: '35+ All (Brand X Classic)', 
    demographics: 'Gen X',
    region: 'Pan-India',
    ctr: '1.9%', 
    roas: '₹4.1', 
    reach: '₹0.9K',
    conversions: 680,
    cpc: '₹18.50',
    frequency: 3.8,
    trend: 'up',
    trendPercent: '+3%',
    agentOptimized: true
  }
];

const realTimeAlerts = [
  {
    id: 1,
    type: 'critical',
    title: 'RoAS Below Target Threshold',
    message: 'YouTube wellness campaign: 2.8x vs 3.5x target',
    time: '2 min ago',
    action: 'Agent paused campaign automatically. Seeking approval for budget reallocation.',
    status: 'pending',
    threshold: 'RoAS < 3.0x',
    autoAction: 'Campaign Paused',
    estimatedImpact: '-₹25K potential loss prevented'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Personalization Match Rate Drop',
    message: 'Tier-2 cities showing 65% match vs 80% baseline',
    time: '5 min ago',
    action: 'Agent reverting to generic content. Creative review needed (Legal team)',
    status: 'pending',
    threshold: 'Match Rate < 70%',
    autoAction: 'Content Fallback',
    estimatedImpact: 'Est. -12% engagement'
  },
  {
    id: 3,
    type: 'success',
    title: 'Performance Anomaly - Positive',
    message: 'Instagram Brand X Premium: 40% above expected CTR',
    time: '8 min ago',
    action: 'Agent recommended budget increase (+25%). Auto-approved via threshold.',
    status: 'auto-resolved',
    threshold: 'CTR > 150% expected',
    autoAction: 'Budget Increased',
    estimatedImpact: '+₹45K revenue opportunity'
  },
  {
    id: 4,
    type: 'info',
    title: 'Daily Budget Threshold Reached',
    message: '85% of daily spend reached at 3:30 PM',
    time: '12 min ago',
    action: 'Agent reallocated ₹15K from Facebook to YouTube for optimal RoAS.',
    status: 'approved',
    threshold: 'Daily Spend > 80%',
    autoAction: 'Budget Reallocation',
    estimatedImpact: '+8% projected RoAS'
  },
  {
    id: 5,
    type: 'warning',
    title: 'Frequency Cap Approaching',
    message: 'Facebook Brand X Core reaching 4.5x frequency limit',
    time: '15 min ago',
    action: 'Agent reducing bid by 15% to control frequency.',
    status: 'auto-resolved',
    threshold: 'Frequency > 4.0x',
    autoAction: 'Bid Reduction',
    estimatedImpact: 'Maintain engagement quality'
  }
];

const approvalTrackingData = [
  {
    id: 1,
    time: 'Apr 8, 3:00PM',
    action: 'Agent recommended increasing YouTube budget by +15% based on 4.8x RoAS performance',
    status: 'approved',
    approver: 'Jane Doe (Marketing Manager)',
    approvalTime: '3:05PM',
    impact: '+₹18K revenue (actual)',
    category: 'Budget Optimization',
    urgency: 'Medium',
    autoThreshold: 'RoAS > 4.5x',
    reasoning: 'Performance 37% above target, reallocate from underperforming channels'
  },
  {
    id: 2,
    time: 'Apr 8, 10:00AM',
    action: 'Agent generated new Tamil ad copy for tier-2 market expansion',
    status: 'pending',
    approver: 'Legal Team (Compliance Review)',
    approvalTime: null,
    impact: 'Est. +12% engagement in Tamil Nadu',
    category: 'Creative Content',
    urgency: 'Low',
    autoThreshold: 'N/A - Legal required',
    reasoning: 'Localization opportunity identified, cultural adaptation needed'
  },
  {
    id: 3,
    time: 'Apr 7, 2:30PM',
    action: 'Agent suggested pausing underperforming Instagram campaign (1.8% CTR vs 2.5% target)',
    status: 'approved',
    approver: 'Mike Chen (Campaign Manager)',
    approvalTime: '2:45PM',
    impact: '-₹8K wastage prevented (actual)',
    category: 'Campaign Management',
    urgency: 'High',
    autoThreshold: 'CTR < 75% of target',
    reasoning: 'Performance declining 3 days straight, frequency reaching saturation'
  },
  {
    id: 4,
    time: 'Apr 7, 9:15AM',
    action: 'Agent proposed creative refresh for Gen Z segment based on engagement patterns',
    status: 'pending',
    approver: 'Sarah Wilson (Creative Director)',
    approvalTime: null,
    impact: 'Est. +20% CTR improvement',
    category: 'Creative Optimization',
    urgency: 'Medium',
    autoThreshold: 'Engagement decline > 15%',
    reasoning: 'Creative fatigue detected, trending content analysis suggests refresh'
  },
  {
    id: 5,
    time: 'Apr 6, 4:20PM',
    action: 'Agent recommended bid adjustment for competitive keyword targeting',
    status: 'approved',
    approver: 'Auto-approved (Threshold)',
    approvalTime: '4:20PM',
    impact: '+12% impression share (actual)',
    category: 'Bid Management',
    urgency: 'Low',
    autoThreshold: 'Competitor bid increase > 10%',
    reasoning: 'Competitor activity increased, maintain market position'
  }
];

const benchmarkingData = {
  prePostComparison: [
    { metric: 'CTR', preAgent: '1.2%', postAgent: '2.3%', improvement: '+92%', industry: '1.1%', vs_industry: '+109%' },
    { metric: 'RoAS', preAgent: '2.8x', postAgent: '4.2x', improvement: '+50%', industry: '3.1x', vs_industry: '+35%' },
    { metric: 'CPA', preAgent: '₹68', postAgent: '₹42.50', improvement: '-37%', industry: '₹55', vs_industry: '-23%' },
    { metric: 'Conversion Rate', preAgent: '0.31%', postAgent: '0.48%', improvement: '+55%', industry: '0.35%', vs_industry: '+37%' },
    { metric: 'Engagement Rate', preAgent: '2.1%', postAgent: '3.8%', improvement: '+81%', industry: '2.5%', vs_industry: '+52%' }
  ],
  industryBenchmarks: {
    'Personal Care FMCG': { ctr: '1.1%', roas: '3.1x', cpa: '₹55', engagement: '2.5%' },
    'Beauty & Cosmetics': { ctr: '1.4%', roas: '3.8x', cpa: '₹48', engagement: '3.1%' },
    'Health & Wellness': { ctr: '0.9%', roas: '2.9x', cpa: '₹62', engagement: '2.2%' }
  }
};

export function VerveWellDashboard() {
  const [activeView, setActiveView] = useState('Marketing Ops Dashboard');
  const [timeRange, setTimeRange] = useState('Last 7 days');
  const [filterCampaign, setFilterCampaign] = useState('All Campaigns');
  const [filterChannel, setFilterChannel] = useState('All Channels');

  const formatValue = (value: number, type: 'currency' | 'percentage' | 'number' = 'number') => {
    if (type === 'currency') {
      return `₹${value.toLocaleString()}`;
    }
    if (type === 'percentage') {
      return `${value}%`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-600/20 border-green-400/30';
      case 'pending': return 'text-yellow-400 bg-yellow-600/20 border-yellow-400/30';
      case 'rejected': return 'text-red-400 bg-red-600/20 border-red-400/30';
      case 'auto-resolved': return 'text-blue-400 bg-blue-600/20 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-600/20 border-gray-400/30';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'info': return <Bell className="h-4 w-4 text-blue-400" />;
      default: return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const getVelocityStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-600/20 text-green-300 border-green-400/30';
      case 'good': return 'bg-blue-600/20 text-blue-300 border-blue-400/30';
      case 'needs-improvement': return 'bg-yellow-600/20 text-yellow-300 border-yellow-400/30';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen dashboard-gradient text-white">
      {/* Header */}
      <div className="flex flex-col min-[610px]:flex-row items-start min-[610px]:items-center justify-between gap-3 min-[610px]:gap-0 p-4 min-[610px]:p-6 border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg min-[610px]:text-2xl font-bold text-white leading-tight">VerveWell Brand X Marketing Performance</h1>
            <p className="text-[var(--light-gray)] text-xs min-[610px]:text-sm hidden min-[610px]:block">Real-time insights and Agent performance tracking for Brand Managers</p>
          </div>
        </div>
        <div className="flex flex-nowrap overflow-x-auto items-center gap-2 min-[610px]:gap-3 w-full min-[610px]:w-auto">
          <select 
            className="bg-[var(--dropdown-bg)] text-white px-3 min-[610px]:px-4 py-2 rounded-lg border border-white/20 text-sm w-auto shrink-0"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
            <option value="Year to date">Year to date</option>
          </select>
          <select 
            className="bg-[var(--dropdown-bg)] text-white px-3 min-[610px]:px-4 py-2 rounded-lg border border-white/20 text-sm w-auto shrink-0"
            value={filterCampaign}
            onChange={(e) => setFilterCampaign(e.target.value)}
          >
            <option value="All Campaigns">All Campaigns</option>
            <option value="Agent vs Non-Agent">Agent vs Non-Agent</option>
            <option value="Active Campaigns">Active Campaigns</option>
            <option value="Completed Campaigns">Completed Campaigns</option>
          </select>
          <Button variant="outline" className="bg-red-600/20 text-red-200 border-red-400/30 hover:bg-red-600/30 flex-none text-sm min-[610px]:text-base shrink-0">
            <Bell className="h-4 w-4 mr-2" />
            Alerts (5)
          </Button>
          <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 flex-none text-sm min-[610px]:text-base shrink-0">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="px-6 pt-6">
        <div className="flex gap-2 mb-6">
          {['Marketing Ops Dashboard', 'CMO Executive View'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all border ${
                activeView === tab 
                  ? 'bg-white text-[var(--medium-purple)] border-white shadow-lg' 
                  : 'bg-[var(--widget-container)] text-white border-white/20 hover:bg-[var(--dropdown-bg)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeView === 'Marketing Ops Dashboard' && (
        <div className="px-6 pb-6 space-y-6">
          {/* Granular KPI Cards for Marketing Ops */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
            <Card className="widget-card text-white border-white/10">
              <CardHeader className="pb-0 sm:pb-2">
                <CardTitle className="text-xs font-medium text-[var(--light-gray)]">CTR (Brand X)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 sm:pt-6">
                <div className="text-sm sm:text-2xl font-bold">2.3%</div>
                <div className="flex items-center gap-1 text-xs mt-0 sm:mt-1">
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  <span className="text-green-400">+0.6%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="widget-card text-white border-white/10">
              <CardHeader className="pb-0 sm:pb-2">
                <CardTitle className="text-xs font-medium text-[var(--light-gray)]">CPC (Avg)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 sm:pt-6">
                <div className="text-sm sm:text-2xl font-bold">₹14.20</div>
                <div className="flex items-center gap-1 text-xs mt-0 sm:mt-1">
                  <TrendingDown className="h-3 w-3 text-red-400" />
                  <span className="text-red-400">-8%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="widget-card text-white border-white/10">
              <CardHeader className="pb-0 sm:pb-2">
                <CardTitle className="text-xs font-medium text-[var(--light-gray)]">Reach (7d)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 sm:pt-6">
                <div className="text-sm sm:text-2xl font-bold">2.8M</div>
                <div className="flex items-center gap-1 text-xs mt-0 sm:mt-1">
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  <span className="text-green-400">+12%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="widget-card text-white border-white/10">
              <CardHeader className="pb-0 sm:pb-2">
                <CardTitle className="text-xs font-medium text-[var(--light-gray)]">Frequency</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 sm:pt-6">
                <div className="text-sm sm:text-2xl font-bold">3.1x</div>
                <div className="flex items-center gap-1 text-xs mt-0 sm:mt-1">
                  <TrendingUp className="h-3 w-3 text-yellow-400" />
                  <span className="text-yellow-400">+0.2x</span>
                </div>
              </CardContent>
            </Card>

            <Card className="widget-card text-white border-white/10">
              <CardHeader className="pb-0 sm:pb-2">
                <CardTitle className="text-xs font-medium text-[var(--light-gray)]">RoAS</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 sm:pt-6">
                <div className="text-sm sm:text-2xl font-bold">4.2x</div>
                <div className="flex items-center gap-1 text-xs mt-0 sm:mt-1">
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  <span className="text-green-400">+15%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="widget-card text-white border-white/10">
              <CardHeader className="pb-0 sm:pb-2">
                <CardTitle className="text-xs font-medium text-[var(--light-gray)]">Agent Automated</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 sm:pt-6">
                <div className="text-sm sm:text-2xl font-bold">65%</div>
                <div className="flex items-center gap-1 text-xs mt-0 sm:mt-1">
                  <TrendingUp className="h-3 w-3 text-blue-400" />
                  <span className="text-blue-400">+5%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Velocity Metrics - Enhanced */}
          <Card className="chart-panel text-white border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-white">Velocity Metrics - Agent Responsiveness</CardTitle>
                  <p className="text-[var(--light-gray)] text-sm mt-1">Measuring marketing agility improvements and optimization latency</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600/20 text-green-300 border-green-400/30">
                    Avg 82% faster
                  </Badge>
                  <Zap className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {velocityMetricsData.map((metric, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white">{metric.metric}</h3>
                      <Badge className={getVelocityStatusColor(metric.status)}>
                        {metric.improvement} faster
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--light-gray)]">Pre-Agent: {metric.preAgent}</span>
                        <span className="text-white font-medium">→ {metric.postAgent}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" 
                          style={{ width: `${metric.improvement.replace('%', '')}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-[var(--light-gray)]">{metric.description}</p>
                        <span className="text-xs text-green-400">{metric.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-600/10 rounded-lg border border-green-400/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-300">Live Agent Performance</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-[var(--light-gray)]">Campaigns Monitored:</span>
                    <span className="ml-2 text-white font-medium">34 active</span>
                  </div>
                  <div>
                    <span className="text-[var(--light-gray)]">Avg Response Time:</span>
                    <span className="ml-2 text-white font-medium">8 minutes</span>
                  </div>
                  <div>
                    <span className="text-[var(--light-gray)]">Auto-Optimizations Today:</span>
                    <span className="ml-2 text-white font-medium">12 actions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Channel Performance with filtering */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="chart-panel text-white border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Channel Performance Deep Dive</CardTitle>
                    <p className="text-[var(--light-gray)] text-sm">CPC, RoAS, CTR, and Frequency by channel</p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={channelData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#CFCFCF" fontSize={12} />
                    <YAxis stroke="#CFCFCF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--widget-container)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Bar dataKey="roas" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="roas" position="top" style={{ fill: '#ffffff', fontSize: '12px' }} formatter={(value: number) => `${value}x`} />
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${250 + index * 15}, 70%, 60%)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {channelData.map((channel, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="text-[var(--light-gray)]">{channel.name}</span>
                      <div className="flex gap-4">
                        <span className="text-white">CTR: {channel.ctr}%</span>
                        <span className="text-white">CPC: ₹{channel.cpc}</span>
                        <span className="text-white">Freq: {channel.frequency}x</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="chart-panel text-white border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Agent vs Traditional vs Industry CTR</CardTitle>
                <p className="text-[var(--light-gray)] text-sm">Performance comparison over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="#CFCFCF" fontSize={12} />
                    <YAxis stroke="#CFCFCF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--widget-container)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="agent" stroke="#00ff88" strokeWidth={3} dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }} name="Agent-Powered" />
                    <Line type="monotone" dataKey="traditional" stroke="#8C4DE8" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#8C4DE8', strokeWidth: 2, r: 3 }} name="Traditional" />
                    <Line type="monotone" dataKey="industry" stroke="#ff6b6b" strokeWidth={2} strokeDasharray="2 2" dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 3 }} name="Industry Benchmark" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Campaign Performance Breakdown */}
          <Card className="chart-panel text-white border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Campaign Performance Breakdown</CardTitle>
                  <p className="text-[var(--light-gray)] text-sm">Granular insights by demographics, regions, and Agent optimization status</p>
                </div>
                <div className="flex gap-2">
                  <select className="bg-[var(--dropdown-bg)] text-white px-3 py-2 rounded text-sm border border-white/20">
                    <option>All Demographics</option>
                    <option>Millennials</option>
                    <option>Gen Z</option>
                    <option>Gen X</option>
                  </select>
                  <select className="bg-[var(--dropdown-bg)] text-white px-3 py-2 rounded text-sm border border-white/20">
                    <option>All Regions</option>
                    <option>Metro Cities</option>
                    <option>Tier-2 Cities</option>
                    <option>Pan-India</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-3 text-[var(--light-gray)]">Campaign</th>
                      <th className="text-left p-3 text-[var(--light-gray)]">Region</th>
                      <th className="text-left p-3 text-[var(--light-gray)]">CTR</th>
                      <th className="text-left p-3 text-[var(--light-gray)]">CPC</th>
                      <th className="text-left p-3 text-[var(--light-gray)]">RoAS</th>
                      <th className="text-left p-3 text-[var(--light-gray)]">Freq</th>
                      <th className="text-left p-3 text-[var(--light-gray)]">Conv</th>
                      <th className="text-left p-3 text-[var(--light-gray)]">Trend</th>
                      <th className="text-left p-3 text-[var(--light-gray)]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignPerformanceData.map((campaign, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-3">
                          <div>
                            <div className="font-medium text-white text-xs">{campaign.campaign}</div>
                            <div className="text-xs text-[var(--light-gray)]">{campaign.demographics}</div>
                          </div>
                        </td>
                        <td className="p-3 text-white text-xs">{campaign.region}</td>
                        <td className="p-3 text-white font-medium text-xs">{campaign.ctr}</td>
                        <td className="p-3 text-white font-medium text-xs">{campaign.cpc}</td>
                        <td className="p-3 text-white font-medium text-xs">{campaign.roas}</td>
                        <td className="p-3 text-white font-medium text-xs">{campaign.frequency}x</td>
                        <td className="p-3 text-white font-medium text-xs">{formatValue(campaign.conversions)}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {campaign.trend === 'up' ? (
                              <TrendingUp className="h-6 w-6 text-green-400" />
                            ) : (
                              <TrendingDown className="h-6 w-6 text-red-400" />
                            )}
                            <span className={`text-xs ${campaign.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                              {campaign.trendPercent}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={campaign.agentOptimized ? 'bg-blue-600/20 text-blue-300 border-blue-400/30' : 'bg-gray-600/20 text-gray-300 border-gray-400/30'}>
                            {campaign.agentOptimized ? 'Agent' : 'Manual'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Real-time Alerts with Thresholds */}
          <Card className="chart-panel text-white border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Real-time Alerts & Threshold Monitoring
                  </CardTitle>
                  <p className="text-[var(--light-gray)] text-sm">Agent monitoring, automated responses, and threshold triggers</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realTimeAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{alert.title}</h4>
                          <span className="text-xs text-[var(--light-gray)]">{alert.time}</span>
                        </div>
                        <p className="text-sm text-[var(--light-gray)] mb-3">{alert.message}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="space-y-1">
                            <span className="text-xs text-[var(--light-gray)]">Threshold Triggered</span>
                            <div className="text-xs text-white font-medium">{alert.threshold}</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs text-[var(--light-gray)]">Auto Action Taken</span>
                            <div className="text-xs text-white font-medium">{alert.autoAction}</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs text-[var(--light-gray)]">Estimated Impact</span>
                            <div className="text-xs text-green-400 font-medium">{alert.estimatedImpact}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-white">{alert.action}</p>
                          <Badge className={`text-xs ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Agent Approval Tracking */}
          <Card className="chart-panel text-white border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Agent Approval Tracking & Governance
              </CardTitle>
              <p className="text-[var(--light-gray)] text-sm">Comprehensive audit trail of Agent-human collaboration with impact analysis</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvalTrackingData.map((item) => (
                  <div key={item.id} className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="text-xs text-[var(--light-gray)] min-w-[100px]">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="text-xs bg-purple-600/20 text-purple-300 border-purple-400/30">
                            {item.category}
                          </Badge>
                          <Badge className={`text-xs ${item.urgency === 'High' ? 'bg-red-600/20 text-red-300' : item.urgency === 'Medium' ? 'bg-yellow-600/20 text-yellow-300' : 'bg-blue-600/20 text-blue-300'}`}>
                            {item.urgency} Priority
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-white mb-2">{item.action}</p>
                        
                        <div className="text-xs text-[var(--light-gray)] mb-3 italic">
                          Reasoning: {item.reasoning}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div className="space-y-1">
                            <span className="text-xs text-[var(--light-gray)]">Auto Threshold</span>
                            <div className="text-xs text-white">{item.autoThreshold}</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs text-[var(--light-gray)]">Business Impact</span>
                            <div className="text-xs text-green-400 font-medium">{item.impact}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                              {item.status}
                            </Badge>
                            {item.status === 'approved' && item.approver && (
                              <span className="text-xs text-[var(--light-gray)]">
                                Approved by {item.approver} at {item.approvalTime}
                              </span>
                            )}
                            {item.status === 'pending' && (
                              <span className="text-xs text-yellow-400">
                                Pending approval from {item.approver}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benchmarking and Learning */}
          <Card className="chart-panel text-white border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Benchmarking & Learning</CardTitle>
              <p className="text-[var(--light-gray)] text-sm">Pre-Agent vs Post-Agent performance and industry comparisons</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-white mb-4">Performance Evolution: Pre-Agent vs Post-Agent</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left p-3 text-[var(--light-gray)]">Metric</th>
                          <th className="text-left p-3 text-[var(--light-gray)]">Pre-Agent</th>
                          <th className="text-left p-3 text-[var(--light-gray)]">Post-Agent</th>
                          <th className="text-left p-3 text-[var(--light-gray)]">Improvement</th>
                          <th className="text-left p-3 text-[var(--light-gray)]">Industry Avg</th>
                          <th className="text-left p-3 text-[var(--light-gray)]">vs Industry</th>
                        </tr>
                      </thead>
                      <tbody>
                        {benchmarkingData.prePostComparison.map((item, index) => (
                          <tr key={index} className="border-b border-white/5">
                            <td className="p-3 text-white font-medium">{item.metric}</td>
                            <td className="p-3 text-[var(--light-gray)]">{item.preAgent}</td>
                            <td className="p-3 text-white font-medium">{item.postAgent}</td>
                            <td className="p-3">
                              <Badge className="bg-green-600/20 text-green-300 border-green-400/30">
                                {item.improvement}
                              </Badge>
                            </td>
                            <td className="p-3 text-[var(--light-gray)]">{item.industry}</td>
                            <td className="p-3">
                              <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30">
                                {item.vs_industry}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-white mb-4">Industry Benchmarks (Personal Care FMCG)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                      <div className="text-sm text-[var(--light-gray)]">Industry CTR</div>
                      <div className="text-xl font-bold text-white">1.1%</div>
                      <div className="text-xs text-green-400">We're at 2.3% (+109%)</div>
                    </div>
                    <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                      <div className="text-sm text-[var(--light-gray)]">Industry RoAS</div>
                      <div className="text-xl font-bold text-white">3.1x</div>
                      <div className="text-xs text-green-400">We're at 4.2x (+35%)</div>
                    </div>
                    <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                      <div className="text-sm text-[var(--light-gray)]">Industry CPA</div>
                      <div className="text-xl font-bold text-white">₹55</div>
                      <div className="text-xs text-green-400">We're at ₹42.50 (-23%)</div>
                    </div>
                    <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                      <div className="text-sm text-[var(--light-gray)]">Industry Engagement</div>
                      <div className="text-xl font-bold text-white">2.5%</div>
                      <div className="text-xs text-green-400">We're at 3.8% (+52%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeView === 'CMO Executive View' && (
        <div className="px-6 pb-6 space-y-6">
          {/* Executive KPIs - Business Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="widget-card text-white border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[var(--light-gray)]">Overall Marketing ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">340%</div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">+25% vs pre-Agent</span>
                </div>
                <div className="text-xs text-[var(--light-gray)] mt-1">Target: 300%</div>
              </CardContent>
            </Card>

            <Card className="widget-card text-white border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[var(--light-gray)]">Customer Acquisition Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹850</div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <TrendingDown className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">-15% vs quarter</span>
                </div>
                <div className="text-xs text-[var(--light-gray)] mt-1">Target: ₹1,000</div>
              </CardContent>
            </Card>

            <Card className="widget-card text-white border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[var(--light-gray)]">Brand Health Index</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">78/100</div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">+5 pts vs quarter</span>
                </div>
                <div className="text-xs text-[var(--light-gray)] mt-1">Target: 75</div>
              </CardContent>
            </Card>

            <Card className="widget-card text-white border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[var(--light-gray)]">Market Share Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">+2.3%</div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">YoY growth</span>
                </div>
                <div className="text-xs text-[var(--light-gray)] mt-1">vs +1.5% target</div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Attribution and Agent Business Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="chart-panel text-white border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Brand X Revenue Attribution by Channel</CardTitle>
                <p className="text-[var(--light-gray)] text-sm">How marketing drives business outcomes</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.channel}</span>
                        <span className="text-sm font-bold">₹{formatValue(item.amount)} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-purple-500' : 'bg-blue-500'}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="chart-panel text-white border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Agent Impact on Brand X</CardTitle>
                <p className="text-[var(--light-gray)] text-sm">Key business outcomes from Agent deployment</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-green-600/10 rounded-lg border border-green-400/20">
                    <div>
                      <div className="font-medium text-green-300">Brand X Campaigns Automated</div>
                      <div className="text-2xl font-bold text-white">65%</div>
                    </div>
                    <div className="text-3xl">🎯</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-600/10 rounded-lg border border-blue-400/20">
                    <div>
                      <div className="font-medium text-blue-300">Response Time Improvement</div>
                      <div className="text-2xl font-bold text-white">-87%</div>
                    </div>
                    <div className="text-3xl">⚡</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-purple-600/10 rounded-lg border border-purple-400/20">
                    <div>
                      <div className="font-medium text-purple-300">Brand Efficiency Gain</div>
                      <div className="text-2xl font-bold text-white">+32%</div>
                    </div>
                    <div className="text-3xl">📈</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Insights for CMO */}
          <Card className="chart-panel text-white border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Strategic Insights & Recommendations</CardTitle>
              <p className="text-[var(--light-gray)] text-sm">Data-driven strategy guidance for leadership decisions</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-600/10 rounded-lg border border-green-400/20">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-300">Tier-2 Market Expansion Opportunity</h4>
                    <p className="text-sm text-[var(--light-gray)] mt-1">
                      Agent personalization showing 23% higher engagement in tier-2 cities. Market analysis suggests 15% untapped customer base. 
                      Recommend allocating additional ₹50L budget for Q2 expansion with localized content strategy.
                    </p>
                    <div className="mt-2 text-xs text-green-400">Projected ROI: +₹1.2Cr revenue, +180% return</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-yellow-600/10 rounded-lg border border-yellow-400/20">
                  <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-300">Digital Channel Optimization</h4>
                    <p className="text-sm text-[var(--light-gray)] mt-1">
                      Agent identified 15% budget reallocation opportunity from Facebook to YouTube for premium products. 
                      Current YouTube RoAS 4.8x vs Facebook 4.2x. Strategic shift could improve overall marketing efficiency.
                    </p>
                    <div className="mt-2 text-xs text-yellow-400">Projected Impact: +8% overall RoAS, +₹35L incremental revenue</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-600/10 rounded-lg border border-blue-400/20">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-300">Q2 Seasonal Demand Forecast</h4>
                    <p className="text-sm text-[var(--light-gray)] mt-1">
                      Agent predictive models indicate 20% demand increase in Q2. Historical data shows supply chain lead time of 6 weeks. 
                      Recommend proactive inventory scaling and campaign budget preparation to capture market opportunity.
                    </p>
                    <div className="mt-2 text-xs text-blue-400">Risk Mitigation: Prevent ₹45L stockout losses, secure market share</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-600/10 rounded-lg border border-purple-400/20">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300">Competitive Intelligence Update</h4>
                    <p className="text-sm text-[var(--light-gray)] mt-1">
                      Agent monitoring indicates competitor X increased digital spend by 25% in beauty segment. 
                      Our current market share advantage at risk. Recommend defensive strategy with enhanced personalization and influencer partnerships.
                    </p>
                    <div className="mt-2 text-xs text-purple-400">Strategic Priority: Maintain #2 market position, protect ₹80L annual revenue</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
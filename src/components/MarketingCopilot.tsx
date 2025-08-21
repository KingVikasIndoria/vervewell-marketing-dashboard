import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MessageCircle, X, Send, User, Bot, TrendingUp, BarChart3, Target, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  metrics?: {
    name: string;
    value: string;
    change: string;
  }[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    content: 'Hello! I\'m your Marketing Copilot for VerveWell Brand X. I can help you analyze campaign performance, understand Agent insights, and provide strategic recommendations. How can I assist you today?',
    timestamp: new Date(),
  }
];

const quickSuggestions = [
  'Show CTR trends for Brand X',
  'Agent performance summary',
  'Campaign optimization tips',
  'Regional performance breakdown'
];

export function MarketingCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Try backend chat first; fallback to local simulated response
    try {
      const body = JSON.stringify({ messages: [{ role: 'user', content }] });

      // Attempt via Vite proxy first
      let resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      // If proxy path fails, retry absolute URL to bypass proxy
      if (!resp.ok) {
        resp = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
      }

      if (resp.ok) {
        const data = await resp.json();
        const botMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: typeof data.reply === 'string' ? data.reply : 'Sorry, I could not parse the response.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        return;
      }
    } catch (e) {
      // ignore and fallback
    }

    // Fallback to on-device heuristic response
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    if (input.includes('ctr') || input.includes('click-through')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Here\'s the current CTR performance for VerveWell Brand X. The Agent has improved CTR by 30% compared to traditional campaigns.',
        timestamp: new Date(),
        metrics: [
          { name: 'Current CTR', value: '2.3%', change: '+0.6% vs last week' },
          { name: 'Agent CTR', value: '3.2%', change: '+30% vs traditional' },
          { name: 'Industry Avg', value: '1.1%', change: 'Below our performance' }
        ]
      };
    }
    
    if (input.includes('agent') || input.includes('performance')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Agent performance for Brand X is exceptional! Here are the key improvements since deployment:',
        timestamp: new Date(),
        metrics: [
          { name: 'Campaigns Automated', value: '65%', change: '+50% efficiency' },
          { name: 'Response Time', value: '15 mins', change: '-94% vs manual' },
          { name: 'RoAS Improvement', value: '4.2x', change: '+10% vs pre-Agent' }
        ]
      };
    }
    
    if (input.includes('optimization') || input.includes('tips')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Based on Agent analysis, here are optimization recommendations for Brand X:\n\n• Increase YouTube budget by 15% - showing highest RoAS\n• Focus on tier-2 cities - 23% higher engagement\n• Creative refresh needed for Instagram campaigns\n• A/B test mobile-first ad formats',
        timestamp: new Date(),
      };
    }
    
    if (input.includes('regional') || input.includes('region')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Regional performance breakdown for Brand X shows strong growth in tier-2 cities:',
        timestamp: new Date(),
        metrics: [
          { name: 'Mumbai', value: '35%', change: 'Revenue share' },
          { name: 'Delhi', value: '28%', change: 'Strong conversion' },
          { name: 'Tier-2 Cities', value: '17%', change: '+23% engagement' }
        ]
      };
    }
    
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: 'I can help you with campaign analysis, Agent performance insights, optimization recommendations, and strategic guidance for VerveWell Brand X. What specific aspect would you like to explore?',
      timestamp: new Date(),
    };
  };

  const handleQuickSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-[var(--vervewell-azure)] to-[var(--vervewell-violet)] hover:from-[var(--vervewell-violet)] hover:to-[var(--vervewell-azure)] text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`widget-card border-white/20 transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'}`}>
        <CardHeader className="pb-2 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--vervewell-azure)] to-[var(--vervewell-violet)] flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm text-white">Marketing Copilot</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-[var(--light-gray)]">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-[var(--light-gray)] hover:text-white h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-[var(--light-gray)] hover:text-white h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 p-4 overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'bot' && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--vervewell-azure)] to-[var(--vervewell-violet)] flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <div className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user' ? 'bg-[var(--vervewell-azure)] text-white ml-4' : 'bg-[var(--widget-container)] text-white'}`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        {message.metrics && (
                          <div className="mt-3 space-y-2">
                            {message.metrics.map((metric, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-black/20 rounded">
                                <span className="text-xs font-medium">{metric.name}</span>
                                <div className="text-right">
                                  <div className="text-sm font-bold">{metric.value}</div>
                                  <div className="text-xs text-green-300">{metric.change}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="text-xs text-[var(--light-gray)] mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {message.type === 'user' && (
                        <div className="w-6 h-6 rounded-full bg-[var(--widget-container)] flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--vervewell-azure)] to-[var(--vervewell-violet)] flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                      <div className="bg-[var(--widget-container)] text-white p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestions */}
                {messages.length <= 1 && (
                  <div className="mb-4">
                    <p className="text-xs text-[var(--light-gray)] mb-2">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickSuggestion(suggestion)}
                          className="text-xs px-2 py-1 bg-[var(--dropdown-bg)] text-white rounded hover:bg-[var(--vervewell-azure)] transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    placeholder="Ask about Brand X performance..."
                    className="flex-1 bg-[var(--chart-background)] border-white/20 text-white placeholder:text-[var(--light-gray)]"
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-[var(--vervewell-azure)] to-[var(--vervewell-violet)] hover:from-[var(--vervewell-violet)] hover:to-[var(--vervewell-azure)] text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {isMinimized && (
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-white">Marketing Copilot ready</span>
            </div>
            <Badge className="bg-[var(--vervewell-azure)]/20 text-[var(--vervewell-azure)] border-[var(--vervewell-azure)]/30">
              {messages.length - 1}
            </Badge>
          </div>
        )}
      </Card>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, RefreshCw, ChevronDown, User } from 'lucide-react';
import { sendAiChatMessageApi } from '../../services/api';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Hello! 👋 I'm **Dayflow AI**, your intelligent assistant powered by **Gemini**. Ask me anything about attendance, leaves, payroll, or company onboarding!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    'How does attendance tracking work?',
    'What are the pricing plans?',
    'How do I apply for leave?',
    'Can I auto-generate employee IDs?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend = null) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      // Build brief history for context
      const history = messages.slice(-4).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await sendAiChatMessageApi(query, history);

      if (res.ok && res.data?.reply) {
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: res.data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        const fallbackMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: "I'm having trouble connecting to Gemini API right now. Dayflow HRMS allows automated attendance, 1-click leave approvals, and instant payroll PDF downloads. Try asking again in a moment!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, fallbackMsg]);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to simple-format markdown bold & linebreaks
  const formatText = (text) => {
    if (!text) return '';
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-[#281A26]/10 px-1 py-0.5 rounded text-[11px] font-mono">$1</code>')
      .replace(/\n/g, '<br/>');
    return { __html: formatted };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-inter">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3.5 bg-[#FF5D7A] hover:bg-[#FF4263] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ring-4 ring-[#FF5D7A]/20"
          aria-label="Open Dayflow AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#FF5D7A]" />
          </div>
          <span className="font-sora text-xs font-bold tracking-wide pr-1 hidden sm:inline-block">
            Ask Dayflow AI
          </span>
          
          <div className="absolute -top-10 right-0 bg-[#281A26] text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md whitespace-nowrap">
            Powered by Gemini ✨
          </div>
        </button>
      )}

      {/* AI Chat Window Popup */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] bg-[#FDFBFD] border border-[#E2D5E0] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#281A26] via-[#3D273A] to-[#281A26] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF5D7A] flex items-center justify-center text-white shadow-md shadow-[#FF5D7A]/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sora text-sm font-bold flex items-center gap-1.5">
                  <span>Dayflow AI</span>
                  <span className="text-[10px] bg-white/20 text-white font-mono px-2 py-0.5 rounded-full font-normal">
                    Gemini
                  </span>
                </h3>
                <p className="text-[11px] text-purple-200/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • HR Virtual Assistant</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-purple-200/70 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#FAF4F7] to-[#F8F2F6] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.sender === 'ai' ? (
                  <div className="w-7 h-7 rounded-xl bg-[#FF5D7A] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-xl bg-[#281A26] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF5D7A] text-white rounded-tr-none font-medium'
                      : 'bg-white border border-[#E2D5E0] text-[#281A26] rounded-tl-none'
                  }`}
                >
                  <div 
                    className="prose prose-xs max-w-none text-xs"
                    dangerouslySetInnerHTML={formatText(msg.text)} 
                  />
                  <span
                    className={`block text-[9px] mt-1.5 text-right font-mono ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-[#6B5667]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#6B5667]">
                <div className="w-7 h-7 rounded-xl bg-[#FF5D7A] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white border border-[#E2D5E0] rounded-2xl px-4 py-2.5 text-[#6B5667] flex items-center gap-2">
                  <span className="font-semibold">Dayflow AI is thinking</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#FF5D7A] rounded-full animate-ping" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2.5 bg-[#F5ECF2] border-t border-[#E2D5E0] overflow-x-auto whitespace-nowrap flex items-center gap-2 no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 bg-white hover:bg-[#FF5D7A] hover:text-white border border-[#E2D5E0] rounded-full text-[11px] font-medium text-[#281A26] transition-colors shrink-0 cursor-pointer shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#E2D5E0] flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Dayflow AI anything..."
              className="flex-1 bg-[#F5ECF2] border border-[#E2D5E0] rounded-xl px-3.5 py-2.5 text-xs text-[#281A26] placeholder-[#6B5667] focus:outline-none focus:border-[#FF5D7A]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-[#FF5D7A] hover:bg-[#FF4263] disabled:opacity-40 text-white rounded-xl shadow-md transition cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default AIChatbot;

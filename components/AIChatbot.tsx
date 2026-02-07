// components/ClaudeChatbot.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles, Phone } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ClaudeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "שלום! 👋 אני העוזרת הוירטואלית של חגית.\n\nאני כאן לעזור לך עם כל שאלה על הסוויטה, המחירים, או ההזמנה.\n\nמה תרצי לדעת? 💕",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.message || 'Unknown error');
      }
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: error.message || "אופס! משהו השתבש. אפשר לנסות שוב או לכתוב בוואטסאפ 🙏",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    { text: "מה המחיר? 💰", query: "כמה עולה להזמין את הסוויטה?" },
    { text: "איך מזמינים? 📅", query: "איך מזמינים את הסוויטה?" },
    { text: "מה כלול? ✨", query: "מה כלול בחבילה?" },
    { text: "יש זמינות? 🗓️", query: "מה הזמינות שלכם?" },
  ];

  const handleQuickQuestion = (query: string) => {
    setInput(query);
    setTimeout(() => {
      const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
      document.querySelector('form')?.dispatchEvent(submitEvent);
    }, 100);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gold-400"
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative bg-gradient-to-r from-gold-400 to-gold-600 
                          text-white rounded-full p-4 shadow-2xl">
              <MessageCircle className="w-7 h-7" />
              
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 
                           rounded-full flex items-center justify-center text-xs font-bold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                AI
              </motion.div>

              <motion.div
                className="absolute -top-2 -left-2"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </motion.div>
            </div>

            <div className="absolute bottom-full right-0 mb-2 opacity-0 
                          group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-charcoal-900 text-white text-sm px-3 py-2 
                            rounded-lg shadow-lg whitespace-nowrap">
                יש לך שאלה? דברי איתי! 💬
                <div className="absolute top-full right-4 w-0 h-0 
                              border-l-8 border-r-8 border-t-8 
                              border-transparent border-t-charcoal-900" />
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 left-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] 
                     h-[650px] max-h-[calc(100vh-3rem)] bg-white rounded-3xl 
                     shadow-2xl overflow-hidden flex flex-col border-2 border-gold-200"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-gold-400 to-gold-600 p-5 text-white">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 
                              bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 
                              bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="relative flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm 
                                  rounded-full flex items-center justify-center 
                                  border-2 border-white/30">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 
                                  bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg">העוזרת של חגית</h3>
                    <p className="text-sm text-white/90 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      מחוברת עכשיו
                    </p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="relative mt-3 flex gap-2">
                <button
                  onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`, '_blank')}
                  className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 
                           rounded-full px-3 py-1.5 text-xs font-medium 
                           transition-all flex items-center justify-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  וואטסאפ
                </button>
                <button
                  onClick={() => window.location.href = `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
                  className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 
                           rounded-full px-3 py-1.5 text-xs font-medium 
                           transition-all flex items-center justify-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  התקשרי
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blush-50 to-white">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%]`}>
                    <div
                      className={`p-4 rounded-2xl shadow-md ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-br-none"
                          : "bg-white text-charcoal-900 rounded-bl-none border border-gold-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <p className={`text-xs mt-1 opacity-60 ${
                      message.role === "user" ? "text-left" : "text-right"
                    }`}>
                      {message.timestamp.toLocaleTimeString("he-IL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-md border border-gold-100">
                    <div className="flex gap-2">
                      <motion.div
                        className="w-2 h-2 bg-gold-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gold-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gold-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && (
              <div className="px-4 py-3 bg-white border-t border-gold-100">
                <p className="text-xs text-warm-gray-600 mb-2 font-medium">שאלות מהירות:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((q, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickQuestion(q.query)}
                      className="text-xs px-3 py-2 bg-gradient-to-r from-gold-50 to-gold-100 
                               text-gold-700 rounded-lg hover:from-gold-100 hover:to-gold-200 
                               transition-all font-medium border border-gold-200"
                    >
                      {q.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gold-100">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="כתבי את השאלה שלך..."
                  className="flex-1 px-4 py-3 border-2 border-gold-200 rounded-full 
                           focus:outline-none focus:ring-2 focus:ring-gold-400 
                           focus:border-transparent transition-all text-sm"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-gold-500 to-gold-600 text-white 
                           rounded-full p-3 hover:from-gold-600 hover:to-gold-700 
                           disabled:opacity-50 disabled:cursor-not-allowed 
                           transition-all shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
              
              <div className="mt-2 text-center">
                <p className="text-xs text-warm-gray-500 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  מופעל על ידי Claude AI
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

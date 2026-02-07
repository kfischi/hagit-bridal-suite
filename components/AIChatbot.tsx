"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles, Phone } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "שלום! 👋 אני העוזרת של חגית.\n\nאשמח לעזור לך עם שאלות על הווילה, מחירים והזמנות.\n\nמה תרצי לדעת? 💕",
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
        throw new Error(data.message || 'שגיאה');
      }
    } catch (error: any) {
      const errorMessage: Message = {
        role: "assistant",
        content: "אופס! משהו לא עבד. נסי שוב או כתבי לי בוואטסאפ 🙏",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    { text: "מה המחיר? 💰", query: "כמה עולה?" },
    { text: "איך מזמינים? 📅", query: "איך מזמינים?" },
    { text: "מה כלול? ✨", query: "מה כלול?" },
    { text: "זמינות? 🗓️", query: "מה הזמינות?" },
  ];

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 left-6 z-40 bg-gradient-to-r from-[#C9A86A] to-[#D4AF37] 
                     text-white rounded-full p-4 shadow-2xl"
            whileHover={{ scale: 1.1 }}
            aria-label="פתח צ'אט AI"
          >
            <MessageCircle className="w-7 h-7" />
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full 
                       flex items-center justify-center text-xs font-bold"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              AI
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] 
                     h-[650px] max-h-[calc(100vh-3rem)] bg-white rounded-3xl 
                     shadow-2xl flex flex-col border-2 border-[#C9A86A]/30"
          >
            <div className="bg-gradient-to-r from-[#C9A86A] to-[#D4AF37] p-5 text-white rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold">העוזרת של חגית</h3>
                    <p className="text-sm opacity-90">מחוברת עכשיו</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#FAF6EE] to-white">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-[#C9A86A] to-[#D4AF37] text-white"
                      : "bg-white border border-[#C9A86A]/20"
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl border border-[#C9A86A]/20">
                    <Loader2 className="w-5 h-5 animate-spin text-[#C9A86A]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && (
              <div className="px-4 py-3 bg-white border-t">
                <p className="text-xs text-gray-600 mb-2">שאלות מהירות:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((q, i) => (

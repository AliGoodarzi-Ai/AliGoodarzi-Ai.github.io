import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Sparkles, Send } from "lucide-react";

interface Message {
  role: "ai" | "user";
  content: string;
  typing?: boolean;
}

const conversation: { role: "ai" | "user"; content: string }[] = [
  { role: "user", content: "What are your research interests?" },
  { role: "ai", content: "I specialize in Human-AI Interaction, LLMs, and AI Agents. My work focuses on augmenting human cognition through structured AI collaboration." },
  { role: "user", content: "Tell me about Mind Elevator" },
  { role: "ai", content: "Mind Elevator is an AI-powered argumentation system that enhances critical thinking using Toulmin analysis and GPT-4. It achieved a 5/5 grade as my Master's thesis!" },
  { role: "user", content: "What technologies do you use?" },
  { role: "ai", content: "Python, PyTorch, React, LangChain, OpenAI APIs, vector embeddings, and more. I love combining deep learning with human-centric design." },
];

const AIChatSimulator = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentIndex >= conversation.length) {
      // Reset after a pause
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentIndex(0);
      }, 5000);
      return () => clearTimeout(resetTimer);
    }

    const nextMessage = conversation[currentIndex];
    
    if (nextMessage.role === "user") {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, nextMessage]);
        setCurrentIndex((i) => i + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // AI typing effect
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, nextMessage]);
        setCurrentIndex((i) => i + 1);
      }, 2000);
      return () => clearTimeout(typingTimer);
    }
  }, [currentIndex]);

  return (
    <div className="glass-glow p-4 sm:p-6 rounded-2xl max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-secondary border-2 border-card" />
        </div>
        <div>
          <div className="font-semibold text-sm">AI Assistant</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Online
          </div>
        </div>
        <Sparkles className="w-4 h-4 text-primary ml-auto animate-pulse" />
      </div>

      {/* Messages */}
      <div className="space-y-3 min-h-[200px] max-h-[300px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary/20 text-foreground rounded-br-sm"
                    : "bg-muted/50 text-foreground/90 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-6 h-6 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-3.5 h-3.5 text-secondary" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2"
            >
              <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="bg-muted/50 px-4 py-2 rounded-xl rounded-bl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area (decorative) */}
      <div className="mt-4 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2 bg-muted/30 rounded-xl px-3 py-2">
          <input
            type="text"
            placeholder="Ask me anything..."
            disabled
            className="flex-1 bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground/50 outline-none cursor-not-allowed"
          />
          <Send className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default AIChatSimulator;

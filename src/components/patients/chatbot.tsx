"use client";

import { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useAskChatbotMutation } from "@/app/store/features/ai-services/appApi"; // RTK Query
import { toast } from "sonner";

interface Message {
  id: number;
  user: "bot" | "user";
  text: string;
}

export default function ChatBotBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [askChatbot, { isLoading }] = useAskChatbotMutation();
  const messageIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage: Message = {
      id: messageIdRef.current++,
      user: "user",
      text: query,
    };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");

    try {
      const res = await askChatbot({ query }).unwrap();
      const botMessage: Message = {
        id: messageIdRef.current++,
        user: "bot",
        text: res.answer,
      };
      setMessages((prev) => [...prev, botMessage]);

      // Scroll to bottom
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get response from chatbot.");
    }
  };

  return (
    <div className="flex flex-col border rounded-md shadow-sm h-[500px] bg-white">
      <div className="p-3 border-b">
        <h2 className="font-semibold text-sm">ChatBot Support</h2>
      </div>

      <ScrollArea className="flex-grow p-3 space-y-2 overflow-y-auto" ref={scrollRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${msg.user === "bot" ? "justify-start" : "justify-end"}`}
          >
            {msg.user === "bot" && (
              <Avatar className="w-8 h-8">
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg px-3 py-2 max-w-xs text-sm ${
                msg.user === "bot"
                  ? "bg-muted text-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="p-3 border-t flex gap-2">
        <Input
          placeholder="Type a message..."
          className="flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} disabled={isLoading}>
          Send
        </Button>
      </div>
    </div>
  );
}

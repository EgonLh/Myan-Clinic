"use client";
// ---- Component: ChatBotBox ----- //
// - Review [x]
import { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useAskChatbotMutation } from "@/app/store/features/ai-services/appApi"; // RTK Query
import { toast } from "sonner";
import { Bot, Send, SendHorizontal, Trash } from "lucide-react";

// ----- Message type ----- //
interface Message {
  id: number;
  user: "bot" | "user";
  text: string;
}

// ----- Suggested questions ----- //
const SUGGESTED_QUESTIONS = [
  "How do I book an appointment online?",
  "How can I contact customer support?",
  "Are my medical records secure?",
  "Do you provide online consultations?",
  "Can I use Myan Clinic on mobile?",
  "Is my data shared with third parties?"
];

export default function ChatBotBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [askChatbot] = useAskChatbotMutation();
  const messageIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ----- Send message handler -----
  const handleSend = async (text?: string) => {
    const messageText = text ?? query.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: messageIdRef.current++,
      user: "user",
      text: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setShowDropdown(false);

    try {
      setIsBotTyping(true);

      // Fetch bot answer
      const res = await askChatbot({ query: messageText }).unwrap();
      const botWords = res.answer.split(" "); // Split into words
      const botMessageId = messageIdRef.current++;

      // Add empty bot message first
      setMessages((prev) => [...prev, { id: botMessageId, user: "bot", text: "" }]);

      // Word-by-word typing effect
      let wordIndex = 0;
      const typingInterval = setInterval(() => {
        wordIndex++;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId ? { ...m, text: botWords.slice(0, wordIndex).join(" ") } : m
          )
        );

        // Scroll down while typing
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });

        if (wordIndex >= botWords.length) {
          clearInterval(typingInterval);
          setIsBotTyping(false);
        }
      }, 100); // adjust speed: 100ms per word

    } catch (err) {
      console.error(err);
      toast.error("Failed to get response from chatbot.");
      setIsBotTyping(false);
    }
  };

  // ----- Clear chat history -----
  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col border order-1 w-full rounded max-h-full min-h-[400px] bg-white">
      {/* ----- Header ----- */}
      <div className="p-3 border-b-2 border-dashed flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg font-mono hover:underline hover:decoration-wavy underline-offset-3">Support Bot</h2>
          <div className="text-xs text-muted-foreground">
            RAG Chatbot for Medical Assistance. Ask about telemedicine services.
          </div>
        </div>
        <Button size="sm" variant="ghost" onClick={handleClear} className="border-none shadow-none">
          <Trash size={16} />
        </Button>
      </div>

      {/* ----- Chat Messages ----- */}
      <ScrollArea
        className="flex-grow px-2  max-h-96"
        ref={scrollRef}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 font-mono tracking-wide text-xs text-justify ${msg.user === "bot" ? "justify-start" : "justify-end my-2"}`}
          >
            {msg.user === "bot" && (
              <Avatar className="w-8 h-8 border rounded bg-gradient-to-r from-green-500 to-purple-500 flex items-center justify-center">
                <AvatarFallback>
                  <Bot className="text-white" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded px-3 py-2 max-w-xs  text-xs break-words ${msg.user === "bot"
                ? "border"
                : "text-black"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Bot typing indicator */}
        {isBotTyping && (
          <div className="flex items-start gap-2 justify-start">
            <Avatar className="w-8 h-8 border rounded bg-gradient-to-r from-green-500 to-purple-500 flex items-center justify-center">
              <AvatarFallback>
                <Bot className="text-white" />
              </AvatarFallback>
            </Avatar>

            <div className=" px-3 py-2 max-w-xs text-sm break-words italic">
              Typing...
            </div>
          </div>
        )}
      </ScrollArea>

      {/* ----- Input + Dropdown ----- */}
      <div className="p-3 border-t flex flex-col gap-2 relative">
        {showDropdown && (
          <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-dotted border-neutral-300 rounded shadow-md z-10 max-h-40 overflow-y-auto">
            {SUGGESTED_QUESTIONS.filter((q) =>
              q.toLowerCase().includes(query.toLowerCase())
            ).map((q, idx) => (
              <div
                key={idx}
                className="px-3 py-2 hover:bg-neutral-100 cursor-pointer text-sm font-mono break-words"
                onMouseDown={() => handleSend(q)}
              >
                {q}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 items-center">

          <Input
            placeholder="Type a message..."
            className="flex-1 py-2 font-mono shadow-none bg-slate-100/[0.5] rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <Button
            variant="outline"
            onClick={() => handleSend()}
            disabled={isBotTyping}
            className=" md:w-fit text-center shadow-none bg-slate-100/[0.5] rounded"
          >
            <Send size={16} />
          </Button>
        </div>

      </div>
    </div>
  );
}

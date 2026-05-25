import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Message = {
  id: number;
  text: string;
  isBot: boolean;
};

// Enhanced knowledge base
const businessInfo = {
  en: {
    company: "BLF Cashews",
    location: "Arusha, Tanzania",
    phone: "+255 760 016 527",
    email: "hello@blfcashews.com",
    founded: "2020",
    mission: "Bringing premium Tanzanian cashews to the world",
  },
  sw: {
    company: "BLF Koroshi",
    location: "Arusha, Tanzania",
    phone: "+255 760 016 527",
    email: "hello@blfcashews.com",
    founded: "2020",
    mission: "Kutoa koroshi bora za Tanzania kwa ajili ya ulimwengu",
  },
};

const qaKnowledge = {
  en: {
    greeting: "Hello! I'm the BLF Cashew Assistant. I can help with pricing, orders, delivery, or tell you about our premium Tanzanian cashews.",
    default: "I can answer questions about our cashews, pricing, ordering, delivery, and more. Try asking about health benefits, our varieties, or delivery options!",
    contact: "You can reach us at +255 760 016 527 on WhatsApp, or email hello@blfcashews.com. Our office is in Arusha, Tanzania.",
    products: "We offer 4 premium varieties: Raw (TSh 18,000/500g), Roasted (TSh 22,000/500g), Salted (TSh 24,000/500g), and Honey (TSh 28,000/500g).",
    health: "Cashews contain 18g protein per 100g, heart-healthy monounsaturated fats, magnesium for brain function, and vitamin E for immunity. A true superfood!",
    origin: "Our cashews come from Mtwara and Lindi regions in southern Tanzania - renowned for producing the world's finest cashew kernels.",
    delivery: "We deliver across Tanzania in 1-3 days. East Africa: 2-5 days. International shipping available - contact us on WhatsApp for rates.",
    process: "Hand-picked at peak ripeness, slow-roasted in small batches, and sealed for freshness. No preservatives, ever.",
  },
  sw: {
    greeting: "Habari! Mwongoza wako wa BLF Cashew. Ninaweza kusaidia na bei, agizo, usafirishaji, au kukuambia kuhusu koroshi zetu za premium.",
    default: "Ninaweza kujibu maswali kuhusu koroshi, bei, agizo, usafirishaji, na zaidi. Jaribu kuuliza kuhusu faida za afya, aina zetu, au chaguo za usafirishaji!",
    contact: "Unaweza kututembelea kwa +255 760 016 527 WhatsApp, au barua pepe hello@blfcashews.com. Ofisi yetu iko Arusha, Tanzania.",
    products: "Tunatoa aina 4: Asili (TSh 18,000/500g), Choma (TSh 22,000/500g), Chumvi (TSh 24,000/500g), na Asali (TSh 28,000/500g).",
    health: "Koroshi zina protini 18g kwa 100g, mafuta mazuri ya moyo, magnesi kwa akili, na vitamin E kwa kinga.",
    origin: "Koroshi zetu zinaokolewa kutoka Mikoa ya Mtwara na Lindi - maarufu kwa matunda ya ubora.",
    delivery: "Tunawasha Tanzania ndani ya siku 1-3. Afrika Mashariki: siku 2-5. Usafirishaji kimataifa unapatikana.",
    process: "Zinachomwa kwa mikono, zinachomwa kwa slow roast, na zinafungwa kwa freshness. Hakuna preservatives.",
  },
};

// AI API endpoint - uses serverless function or falls back to local knowledge
async function fetchAIResponse(input: string, lang: "en" | "sw"): Promise<string> {
  try {
    const response = await fetch("/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, lang }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.reply;
    }
  } catch {
    // Fall through to local knowledge
  }

  // Local knowledge fallback
  const knowledge = qaKnowledge[lang];
  const lower = input.toLowerCase();
  
  if (lower.includes("hello") || lower.includes("hi")) return knowledge.greeting;
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("email")) return knowledge.contact;
  if (lower.includes("product") || lower.includes("varieties") || lower.includes("types")) return knowledge.products;
  if (lower.includes("health") || lower.includes("benefit") || lower.includes("nutrition")) return knowledge.health;
  if (lower.includes("origin") || lower.includes("tanzanian") || lower.includes("source")) return knowledge.origin;
  if (lower.includes("deliv") || lower.includes("ship")) return knowledge.delivery;
  if (lower.includes("process") || lower.includes("roast")) return knowledge.process;
  
  return knowledge.default;
}

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm your BLF Cashew Assistant. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { lang } = useI18n();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        text:
          lang === "en"
            ? "Hi! I'm your BLF Cashew Assistant. How can I help you today?"
            : "Habari! Mwongoza wako wa BLF Cashew. Nikusaidie vipi?",
        isBot: true,
      },
    ]);
  }, [lang]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: Message = { id: Date.now(), text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await fetchAIResponse(input, lang);
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: reply, isBot: true }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting. Try asking about pricing or delivery!", isBot: true },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        id="ai-chat-trigger"
        onClick={() => setOpen(true)}
        className="fixed bottom-28 right-20 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-amber-800/70 text-amber-200 shadow-md transition-transform hover:scale-110"
        aria-label="Open AI Assistant"
      >
        <Bot className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed bottom-28 right-20 z-50 w-80 rounded-2xl border border-amber-700/30 bg-amber-950/90 shadow-xl backdrop-blur-xl md:w-96">
          <div className="flex items-center justify-between border-b border-amber-700/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-amber-400" />
              <span className="font-semibold text-amber-50">BLF Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-amber-50/60 hover:text-amber-50">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-80 overflow-y-auto px-4 py-3">
            {messages.map((m) => (
              <div key={m.id} className={`mb-3 flex ${m.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.isBot ? "bg-amber-800/60 text-amber-50" : "bg-amber-700 text-amber-50"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-3 flex justify-start">
                <div className="bg-amber-800/60 rounded-2xl px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-amber-700/40 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={lang === "en" ? "Ask about cashews..." : "Uliza kuhusu koroshi..."}
                className="flex-1 rounded-full bg-amber-900/60 px-4 py-2 text-sm text-amber-50 placeholder:text-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-600"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700 text-amber-50 transition-colors hover:bg-amber-600 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
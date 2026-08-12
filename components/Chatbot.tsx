"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

const quickReplies = [
  "What services do you offer?",
  "How can I contact the team?",
  "Can I see your projects?",
  "How do I start a project?",
];

const buildReply = (input: string) => {
  const normalized = input.toLowerCase();

  if (normalized.includes("service") || normalized.includes("offer")) {
    return "We design and deliver digital products, web platforms, mobile experiences, AI solutions, and strategic innovation consulting.";
  }

  if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("phone")) {
    return "You can use the contact page to send your request, or reach out through the listed business channels on the site.";
  }

  if (normalized.includes("project") || normalized.includes("portfolio")) {
    return "Visit the projects page to explore our latest published work and case studies.";
  }

  if (normalized.includes("start") || normalized.includes("launch") || normalized.includes("build")) {
    return "You can start by sending a message through the contact page and describing your goal, timeline, and scope.";
  }

  if (normalized.includes("hello") || normalized.includes("hi")) {
    return "Hello! I’m the Fosforge assistant. Ask me about services, projects, or how to start a collaboration.";
  }

  return "I can help with services, project visibility, and the contact flow. Try one of the quick replies or describe what you need.";
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! I’m your assistant. Ask about services, projects, or how to get in touch.",
    },
  ]);

  const greeting = useMemo(
    () => (open ? "Hide assistant" : "Open assistant"),
    [open]
  );

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    const botMessage: Message = {
      id: Date.now() + 1,
      sender: "bot",
      text: buildReply(trimmed),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[340px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_20px_70px_-25px_rgba(37,99,235,0.6)]">
          <div className="flex items-center justify-between bg-[#2563eb] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">Fosforge Assistant</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-blue-100">Online now</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold"
            >
              Close
            </button>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "bg-[#2563eb] text-white"
                      : "bg-white text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-[#2563eb]"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-bold text-white"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full bg-[#2563eb] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_35px_-10px_rgba(37,99,235,0.7)] transition hover:bg-[#1d4ed8]"
      >
        {greeting}
      </button>
    </div>
  );
}

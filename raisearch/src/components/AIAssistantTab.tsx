"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type Message = {
  role: "user" | "ai";
  content: string;
};

function ChatbotTab() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // ✅ Tell TS that role is of type "user"
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input } as Message,
    ];
    setMessages(newMessages);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: `You said: "${input}" 🤖` } as Message,
      ]);
    }, 600);

    setInput("");
  };

  return (
    <Card className="max-w-md mx-auto shadow-lg rounded-2xl h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">AI Chatbot</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-muted text-foreground"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </CardContent>

      <CardFooter>
        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-2 items-center"
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default ChatbotTab;

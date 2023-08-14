"use client";

import { useCompletion } from "ai/react";
import { FormEvent, useState } from "react";
import { Associate, Message } from "@prisma/client";
import { useRouter } from "next/navigation";

import { ChatHeader } from "@/components/ChatHeader";
import { ChatForm } from "@/components/ChatForm";
import { ChatMessages } from "@/components/ChatMessages";

interface IChatClientProps {
  associate: Associate & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatClient = ({ associate }: IChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>(associate.messages);
  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${associate.id}`,
      onFinish(prompt, completion) {
        const systemMessage = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: "system",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader associate={associate} />
      <ChatMessages
        associate={associate}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

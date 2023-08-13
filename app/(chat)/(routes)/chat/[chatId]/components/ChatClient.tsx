"use client";

import { ChatHeader } from "@/components/ChatHeader";
import { Associate, Message } from "@prisma/client";

interface IChatClientProps {
  associate: Associate & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatClient = ({ associate }: IChatClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader associate={associate} />
    </div>
  );
};

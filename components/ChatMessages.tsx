"use client";

import { Associate } from "@prisma/client";
import { ChatMessage, IChatMessageProps } from "./ChatMessage";

interface IChatMessagesProps {
  associate: Associate;
  isLoading: boolean;
  messages: IChatMessageProps[];
}

export const ChatMessages = ({
  associate,
  isLoading,
  messages = [],
}: IChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        src={associate.src}
        role="system"
        content={`Hello I am ${associate.name}, ${associate.description}`}
      />
      <ChatMessage
        src={associate.src}
        role="user"
        content={`Hello I am ${associate.name}, ${associate.description}`}
      />
    </div>
  );
};

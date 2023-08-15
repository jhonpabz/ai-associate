"use client";

import { useEffect, useState } from "react";
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
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={associate.src}
        role="system"
        content={`Hello I am ${associate.name}, ${associate.description}`}
      />
    </div>
  );
};

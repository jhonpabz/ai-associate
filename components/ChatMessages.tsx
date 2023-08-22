"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
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
  const scrollRef = useRef<ElementRef<"div">>(null);
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

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    console.log(messages, "messages");
  }, [messages, messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={associate.src}
        role="system"
        content={`Hello I am ${associate.name}, ${associate.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          src={associate.src}
          content={message.content}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={associate.src} isLoading />}

      <div ref={scrollRef} />
    </div>
  );
};

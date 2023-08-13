"use client";

import { Associate, Message } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { ChevronLeft, MessageSquare, MoreVertical } from "lucide-react";
import { BotAvatar } from "./BotAvatar";
import { useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface IChatHeaderProps {
  associate: Associate & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatHeader = ({ associate }: IChatHeaderProps) => {
  const router = useRouter();
  const user = useUser();
  console.log("user: ", user?.user?.id);

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={associate.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{associate.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 mr-1" />
              {associate._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by {associate.userName}
          </p>
        </div>
      </div>
    </div>
  );
};

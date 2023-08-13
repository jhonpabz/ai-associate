import { auth, redirectToSignIn } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { ChatClient } from "./components/ChatClient";

interface IChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({ params }: IChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const associate = await prismadb.associate.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!associate) {
    redirect("/");
  }
  return (
    <div>
      <ChatClient associate={associate} />
    </div>
  );
};

export default ChatIdPage;

import prismadb from "@/lib/prismadb";
import { AssociateForm } from "./components/AssociateForm";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface IAssociateIdPageProps {
  params: {
    associateId: string;
  };
}

const AssociateIdPage = async ({ params }: IAssociateIdPageProps) => {
  // TODO: Check subscription

  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const associate = await prismadb.associate.findUnique({
    where: {
      id: params.associateId,
      userId,
    },
  });

  const categories = await prismadb.category.findMany();
  return (
    <div>
      <AssociateForm categories={categories} initialData={associate} />
    </div>
  );
};

export default AssociateIdPage;

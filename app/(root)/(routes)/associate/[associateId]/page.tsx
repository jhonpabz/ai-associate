import prismadb from "@/lib/prismadb";
import { AssociateForm } from "./components/AssociateForm";

interface IAssociateIdPageProps {
  params: {
    associateId: string;
  };
}

const AssociateIdPage = async ({ params }: IAssociateIdPageProps) => {
  // TODO: Check subscription

  const associate = await prismadb.associate.findUnique({
    where: {
      id: params.associateId,
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

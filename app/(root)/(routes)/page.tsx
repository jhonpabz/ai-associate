import { Associates } from "@/components/Associates";
import { Categories } from "@/components/Categories";
import { SearchInput } from "@/components/SearchInput";
import prismadb from "@/lib/prismadb";

interface IRootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const RootPage = async ({ searchParams }: IRootPageProps) => {
  const data = await prismadb.associate.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Associates data={data} />
    </div>
  );
};

export default RootPage;

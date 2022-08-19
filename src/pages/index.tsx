import { trpc } from "src/utils/trpc";

const Index = () => {
  const { data, isLoading } = trpc.useQuery(["hello", { text: "from tRPC" }]);

  if (isLoading) return <div>loading...</div>;
  if (data) return <div>{data.greeting}</div>;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl sm:text-3xl font-bold sm:font-black">
        Which Pokémon is Rounder?
      </div>
      <div className="p-2" />
      <div className="border-2 rounded p-8 flex justify-between items-center">
        <div className="w-16 h-16 bg-red-800"></div>
        <div className="p-8 text-3xl font-semibold italic">vs</div>
        <div className="w-16 h-16 bg-green-800"></div>
      </div>
    </div>
  );
};

export default Index;

import Addtodo from "@/components/Addtodo";
import Navbar from "@/components/Navbar";
import Todos from "@/components/Todos";

const page = () => {
  return (
    <main>
      <h1>Todo Next + Typescript</h1>
      <Navbar />
      <Addtodo />
      <Todos />
    </main>
  );
};

export default page;

"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const Navbar = () => {
  const searchParams = useSearchParams();
  const todoData = searchParams.get("todos");

  return (
    <nav>
      <Link href="/" className={todoData === null ? "active" : ""}>All</Link>
      <Link href="/?todos=active" className={todoData === "active" ? "active" : ""}>Active</Link>
      <Link href="/?todos=completed" className={todoData === "completed" ? "active" : ""}>Completed</Link>
    </nav>
  );
};

export default Navbar;

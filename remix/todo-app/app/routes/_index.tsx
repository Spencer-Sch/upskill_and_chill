import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo App" },
    { name: "Upskill & Chill", content: "Welcome to Upskill & Chill!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-5">
      <h1 className="text-4xl">Upskill & Chill: Remix!</h1>
      <Link to="/todo" className="text-blue-500">
        Todo App
      </Link>
    </div>
  );
}

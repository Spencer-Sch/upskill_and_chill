// import { Suspense } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
// import { prisma } from "../../prisma/client";
import Task from "../components/Task";
import type { LoaderFunctionArgs } from "@remix-run/node";
import TodoForm from "../components/TodoForm";
import { authenticator } from "~/services/auth.server";
import { supabase } from "../../supabase/client";
import { Tables } from "../../database.types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  // const tasks: Task[] = await prisma.task.findMany();
  const { data, error } = await supabase
    .from('tasks')
    .select()
  if (error) console.error(error)
  const tasks: Tables<'tasks'>[] = data ?? []
  return json(tasks);
};

export default function Todo() {
  const tasks = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <>
      <div className="bg-primary-400 flex space-x-10 w-fit rounded-md">
        <div className="p-10">
          <TodoForm />
        </div>
        <div className="p-10">
          <ul className="space-y-3 max-h-[700px] overflow-y-scroll pr-5">
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            {navigation.state === "loading" ? (
              <p>Loading...</p>
            ) : (
              tasks.map((task) => <Task key={task.id} taskData={task} />)
            )}
            {/* </Suspense> */}
          </ul>
        </div>
      </div>
    </>
  );
}

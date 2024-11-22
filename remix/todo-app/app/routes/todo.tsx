import { Suspense } from "react";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { prisma } from "../../prisma/client";
import Task from "../components/Task";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import TodoForm from "../components/TodoForm";
import { createTask, deleteTask } from "~/actions/todo-actions";
import { authenticator } from "~/services/auth.server";
import { supabase } from '../../supabase/client'
import { Tables } from '../../database.types'

// export async function loader({ request }: LoaderFunctionArgs) {
// 	// If the user is already authenticated redirect to /dashboard directly
// 	const user = await authenticator.isAuthenticated(request, {
// 		failureRedirect: '/login',
// 	})
// 	console.log('user - dashboard: ', user)
// 	return user
// }

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
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

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}

export default function Todo() {
  const tasks = useLoaderData<typeof loader>();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "12px",
        }}
      >
        <Form method="POST">
          <button>Log Out</button>
        </Form>
      </div>
      <div className="bg-primary-400 flex space-x-10 w-fit rounded-md">
        <div className="p-10">
          <TodoForm />
        </div>
        <div className="p-10">
          <ul className="space-y-3 max-h-[700px] overflow-y-scroll pr-5">
            <Suspense fallback={<div>Loading...</div>}>
              {tasks.map((task) => (
                <Task key={task.id} taskData={task} />
              ))}
            </Suspense>
          </ul>
        </div>
      </div>
    </>
  );
}

import type { ActionFunctionArgs } from "@remix-run/node";
import { deleteTask } from "~/actions/todo-actions";


export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id ?? ''
  // const formData = await request.formData();
  switch (request.method) {
    case "DELETE":
      return deleteTask(id);
  }
};
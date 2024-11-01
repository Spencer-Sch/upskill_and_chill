import { json } from "@remix-run/node";
import { prisma } from "../../prisma/client";


export const loader = async () => {
  const tasks: Task[] = await prisma.task.findMany();
  return json(tasks);
};


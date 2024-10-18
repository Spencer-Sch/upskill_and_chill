import { randomUUID } from "crypto";
import { prisma } from "../../prisma/client";

export const createTask = async (data: FormData) => {
  const taskName = String(data.get("taskName"));
  const description = String(data.get("description"));
  const priority = Number(data.get("priority"));
  const createdAt = Date.now().toString();
  const id = randomUUID();
  const newTask = prisma.task.create({
    data: {
      taskName,
      description,
      priority,
      id,
      createdAt,
      completed: false,
    },
  });
  return newTask;
};

export const deleteTask = async (data: FormData) => {
  const taskId = String(data.get("taskId"));
  const deletedTask = prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  return deletedTask;
};

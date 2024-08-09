'use server'
import { revalidatePath } from 'next/cache'

export const addTask = async (formData: FormData) => {
  const data = await fetch('http://localhost:3000/api/task', {
    method: 'POST',
    body: JSON.stringify({
      taskName: formData.get('taskName'),
      description: formData.get('description'),
      priority: Number(formData.get('priority')),
      completed: false
    })
  }).then(res => res.json())
  console.log(data)
  revalidatePath('/todo')
}
'use client'
import { useRef } from 'react'
import { priorityOptions } from '@/app/constants/todo/constants'
import TextInput from '@/app/components/todo/TextInput'
import Button from '@/app/components/todo/Button'
import { addTask } from '@/app/lib/actions'

const TodoForm = () => {
  const form = useRef<HTMLFormElement>(null)
  const handleSubmit = async (formData: FormData) => {
    try {
      await addTask(formData)
      form.current?.reset()
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <form
      ref={form}
      action={handleSubmit}
      className="flex flex-col space-y-5"
    >
      <TextInput
        inputName="taskName"
        label="Task"
      />
      <TextInput
        inputType="textarea"
        inputName="description"
        label="Description"
      />
      <div className="flex flex-col">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
        >
          {priorityOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <Button label="Submit" type="submit" />
    </form>
  )
}

export default TodoForm
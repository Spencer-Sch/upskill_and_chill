// import { useRef, useState } from 'react'
import { Form } from "@remix-run/react";
import { priorityOptions } from "../constants/constants";
import TextInput from "./TextInput";
import Button from "./Button";
// import { addTask } from '../../lib/actions'
// import { SpinnerGap } from '@phosphor-icons/react'

const TodoForm = () => {
  // const [loading, setLoading] = useState(false)
  // const form = useRef<HTMLFormElement>(null)

  return (
    <Form className="flex flex-col space-y-5" method="post">
      <TextInput inputName="taskName" label="Task" />
      <TextInput
        inputType="textarea"
        inputName="description"
        label="Description"
      />
      <div className="flex flex-col">
        <label htmlFor="priority">Priority</label>
        <select id="priority" name="priority">
          {priorityOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="submit"
        label="Submit"
        // label={loading ? '' : 'Submit'}
        // icon={loading ? <SpinnerGap /> : null}
        // disabled={loading}
      />
    </Form>
  );
};

export default TodoForm;

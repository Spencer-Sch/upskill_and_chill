'use client'

const Todo = () => {

  return (
    <div>
      This works
      <form onSubmit={(e) => {
        e.preventDefault()
      }}>
        <input 
          type="text"
          className="border-[1px]"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Todo
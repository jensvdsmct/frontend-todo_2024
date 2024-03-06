import { Todo } from '../models/Todo'

import { useState } from 'react'
import { Check, Trash2 } from 'lucide-react'

const TodoItem = ({
  todo,
  toggle,
  remove,
}: {
  todo: Todo
  toggle: (id: string) => void
  remove: (id: string) => void
}) => {
  const [timeoutId, setTimeoutId] = useState<number | null>()

  const handleToggle = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    toggle(todo.id!)
    
    const id = window.setTimeout(() => {
      if (todo.isCompleted) return

      remove(todo.id!) // Remove the todo after 3 seconds
      setTimeoutId(null)
    }, 3000)

    setTimeoutId(id)
  }

  return (
    <div
      key={todo.id}
      className={`
        flex items-center mb-4 bg-violet-100 rounded-lg dark:bg-violet-700 lin ${
          todo.isCompleted ? 'opacity-50 line-through' : ''
        }`}
    >
      <label htmlFor={todo.id} className="flex items-center  p-3">
        <input
          type="checkbox"
          id={todo.id}
          className="mr-3 hidden"
          onChange={handleToggle}
          checked={todo.isCompleted}
        />
        <div className="flex items-center">
          <div className="text-violet-700 hover:text-violet-300 rounded-full border-2 border-violet-700 hover:border-violet-300 dark:text-violet-300 dark:border-violet-300 dark:hover:text-violet-700 dark:hover:border-violet-700 flex items-center justify-center mr-3">
            <Check
              size={24}
              className={todo.isCompleted ? 'opacity-100' : 'opacity-0'}
            />
            <span className="sr-only">Mark as completed</span>
          </div>
          <div>
            <p className="font-bold text-lg">{todo.task}</p>
            <p className="text-base text-violet-950">{todo.category}</p>
          </div>
        </div>
      </label>

      <button
        className="ml-auto text-violet-700 hover:text-violet-300 dark:text-violet-300 dark:hover:text-violet-700  p-3"
        onClick={() => remove(todo.id!)}
      >
        <Trash2 />
        <span className="sr-only">Delete todo</span>
      </button>
    </div>
  )
}

export default TodoItem

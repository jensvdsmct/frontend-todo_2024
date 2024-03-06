import { Todo } from '../models/Todo'

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
  return (
    <div
      key={todo.id}
      className={`
              flex items-center mb-4 p-3 bg-violet-100 rounded-lg dark:bg-violet-700 $ ${
                todo.isCompleted ? 'opacity-50' : ''
              }`}
    >
      <label htmlFor={todo.id} className="flex items-center">
        <input
          type="checkbox"
          id={todo.id}
          className="mr-3 hidden"
          onChange={() => toggle(todo.id!)}
          checked={todo.isCompleted}
        />
        <div className="flex items-center">
          <div className="text-violet-700 hover:text-violet-300 rounded-full border-2 border-violet-700 hover:border-violet-300 dark:text-violet-300 dark:border-violet-300 dark:hover:text-violet-700 dark:hover:border-violet-700 flex items-center justify-center mr-3 w-6 h-6">
            {todo.isCompleted && <Check size={24} />}
            <span className="sr-only">Mark as completed</span>
          </div>
          <div>
            <p className="font-bold text-lg">{todo.task}</p>
            <p className="text-base text-violet-950">{todo.category}</p>
          </div>
        </div>
      </label>

      <button
        className="ml-auto text-violet-700 hover:text-violet-300 dark:text-violet-300 dark:hover:text-violet-700"
        onClick={() => remove(todo.id!)}
      >
        <Trash2 />
        <span className="sr-only">Delete todo</span>
      </button>
    </div>
  )
}

export default TodoItem

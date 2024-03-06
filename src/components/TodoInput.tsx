import { useState } from 'react'
import { uid } from 'uid'
import { Plus } from 'lucide-react'

import { Todo } from '../models/Todo'

const TodoInput = ({
  addToParentState,
}: {
  addToParentState: (todo: Todo) => void
}) => {
  const emptyTodo: Todo = {
    task: '',
    category: 'choose',
    isCompleted: false,
  }

  const [isValid, setIsValid] = useState({
    task: {
      dirty: false, // Has the user interacted with the input field?
      valid: false,
    },
    category: {
      dirty: false,
      valid: false,
    },
  })
  const [newTodo, setNewTodo] = useState<Todo>(emptyTodo)

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Stop posting naar zelfde pagina

    if (newTodo.task === '' || newTodo.category === 'choose') return

    setNewTodo(() => {
      const currentNewTodo = { ...newTodo, id: uid() }
      addToParentState(currentNewTodo) // Combineer de huidige todos met de nieuwe todo
      // This might confuse some developers.
      return emptyTodo
    }) // Maak een unieke id aan voor het opslaan van deze nieuwe todo
  }

  return (
    <form className="my-4" onSubmit={addNewTodo}>
      <div className="grid grid-cols-6 gap-3">
        <div className="flex items-center justify-center h-full">
          <button
            className="text-violet-700 hover:text-violet-300 rounded-full border-2 border-violet-700 hover:border-violet-300 dark:text-violet-300 dark:border-violet-300 dark:hover:text-violet-700 dark:hover:border-violet-700 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
            disabled={!isValid.task.valid || !isValid.category.valid}
          >
            <Plus size={40} />
            <span className="sr-only">Add todo</span>
          </button>
        </div>
        <div className="w-full grid grid-rows-2 gap-3 col-span-5">
          <div className="w-full">
            <input
              type="text"
              name="new-todo"
              id="new-todo"
              placeholder="Add a new todo"
              value={newTodo.task}
              onInput={(event: React.FormEvent<HTMLInputElement>) => {
                setIsValid({
                  ...isValid,
                  task: {
                    dirty: true,
                    valid: event.currentTarget.value.length > 0,
                  },
                })
                setNewTodo({ ...newTodo, task: event.currentTarget.value })
              }}
              className={`w-full bg-violet-100 rounded-lg p-2 dark:bg-violet-700 border-2 border-transparent dark:border-violet-300 focus:outline-none focus-visible:border-violet-500 hover:border-violet-400 dark:hover:border-violet-300 ${
                !isValid.task.valid && isValid.task.dirty
                  ? 'border-red-500 placeholder:text-red-500 focus:ring-red-700'
                  : ''
              }`}
            ></input>
          </div>
          <div>
            <select
              name="category"
              id="category"
              className={`w-full bg-violet-100 rounded-lg p-2 dark:bg-violet-700 border-2 border-transparent dark:border-violet-300 focus:outline-none focus-visible:border-violet-500 hover:border-violet-400 dark:hover:border-violet-300 ${
                !isValid.category.valid && isValid.category.dirty
                  ? 'border-red-500 placeholder:text-red-500 focus:ring-red-700'
                  : ''
              }`}
              value={newTodo.category}
              onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                setIsValid({
                  ...isValid,
                  category: {
                    dirty: true,
                    valid: event.currentTarget.value !== 'choose',
                  },
                })
                setNewTodo({
                  ...newTodo,
                  category: event.currentTarget.value,
                })
              }}
            >
              <option disabled value={'choose'}>
                Choose a category.
              </option>
              <option value="work">Work</option>
              <option value="home">Home</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  )
}

export default TodoInput

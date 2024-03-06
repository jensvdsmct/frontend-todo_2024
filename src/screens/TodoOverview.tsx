import { Plus, Check, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { uid } from 'uid'

import { Todo } from '../models/Todo'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'
import { Link } from 'react-router-dom'

// TODO 1: als er niets ingevuld is, mag de todo niet toegevoegd worden
// TODO 2: een geldige todo krijgt een unieke id (met de npm uid package)

export const TodoOverview = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState<Todo>({
    task: '',
    category: 'choose',
    isCompleted: false,
  })

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (newTodo.task === '' || newTodo.category === 'choose') return // TODO: show error message

    setNewTodo(() => {
      const currentNewTodo = { ...newTodo, id: uid() }
      setTodos([...todos, currentNewTodo]) // Combineer de huidige todos met de nieuwe todo
      return currentNewTodo
    }) // Maak een unique id aan voor het opslaan van deze nieuwe todo
  }

  useEffect(() => {
    console.log('newTodo', newTodo)
  }, [newTodo])

  const title = (): JSX.Element => {
    return (
      <>
        Hello,{' '}
        <span className=" text-violet-700 dark:text-violet-300">Jens</span>
      </>
    )
  }

  return (
    <div className=" container mx-auto rounded-lg p-10 bg-violet-50 shadow-lg dark:bg-violet-800">
      <Link
        to="/settings"
        className="p-1 text-violet-700 hover:text-violet-300 dark:text-violet-300 dark:hover:text-violet-700"
      >
        <Settings />
      </Link>
      <div className="flex justify-between p-1">
        <AppHeader title={title()} todoCount={todos.length} />
      </div>
      <div className="flex-1">
        <form className="my-4" onSubmit={addNewTodo}>
          <div className="grid grid-cols-6 gap-3">
            <div className="flex items-center justify-center h-full">
              <button className="text-violet-700 hover:text-violet-300 rounded-full border-2 border-violet-700 hover:border-violet-300 dark:text-violet-300 dark:border-violet-300 dark:hover:text-violet-700 dark:hover:border-violet-700 flex items-center justify-center">
                <Plus size={30} />
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
                  onInput={(event: React.FormEvent<HTMLInputElement>) =>
                    setNewTodo({ ...newTodo, task: event.currentTarget.value })
                  }
                  className="w-full bg-violet-100 rounded-lg p-2 dark:bg-violet-700 border-2 border-transparent dark:border-violet-300 focus:outline-none focus-visible:border-violet-500 hover:border-violet-400 dark:hover:border-violet-300"
                />
              </div>
              <div>
                <select
                  name="category"
                  id="category"
                  className="w-full bg-violet-100 rounded-lg p-2 dark:bg-violet-700 border-2 border-transparent dark:border-violet-300 focus:outline-none focus-visible:border-violet-500 hover:border-violet-400 dark:hover:border-violet-300"
                  value={newTodo.category}
                  onChange={(event: React.FormEvent<HTMLSelectElement>) =>
                    setNewTodo({
                      ...newTodo,
                      category: event.currentTarget.value,
                    })
                  }
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

        <hr className="my-4" />

        <div className="">
          {todos.map((todo: Todo) => (
            <div
              key={todo.id}
              className="flex items-center mb-4 p-3 bg-violet-100 rounded-lg dark:bg-violet-700"
            >
              <input type="checkbox" id={todo.id} className="mr-3 hidden" />
              <label htmlFor={todo.id} className="flex items-center">
                <div className="w-8 h-8 rounded-full border-2 border-violet-500 dark:border-violet-300 mr-5 p-1 text-violet-700 dark:text-violet-300">
                  <Check
                    size={20}
                    className="mr-2 text-violet-500 dark:text-violet-300"
                  />
                </div>
                <div>
                  <p className="font-bold text-lg">{todo.task}</p>
                  <p className="text-base text-violet-950">{todo.category}</p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/*Footer: about the app (c) Jens - 2024 */}
      <AppFooter />
    </div>
  )
}

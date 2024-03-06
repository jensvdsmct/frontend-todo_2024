import { Plus, Check, Settings, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { uid } from 'uid'

import { Todo } from '../models/Todo'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'
import { Link } from 'react-router-dom'

export const TodoOverview = () => {
  // TODO: fade todo when checked
  // TODO: option to delete a todo
  // TODO: show error message when input fields are empty
  // TODO: make the input fields required (input validation - visible)
  //
  // TODO: Release better version (v1.1.0)

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

  const [todos, setTodos] = useState<Todo[]>(
    localStorage.todos ? JSON.parse(localStorage.todos) : [],
  )
  const [newTodo, setNewTodo] = useState<Todo>({
    task: '',
    category: 'choose',
    isCompleted: false,
  })

  useEffect(() => {
    localStorage.todos = JSON.stringify(todos)
  }, [todos])

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (newTodo.task === '' || newTodo.category === 'choose') return // TODO: show error message

    setNewTodo(() => {
      const currentNewTodo = { ...newTodo, id: uid() }
      setTodos([...todos, currentNewTodo]) // Combineer de huidige todos met de nieuwe todo
      return currentNewTodo
    }) // Maak een unique id aan voor het opslaan van deze nieuwe todo

    setNewTodo({
      task: '',
      category: 'choose',
      isCompleted: false,
    }) // Reset de input velden
  }

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
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

  const completedTodos = todos.filter(todo => !todo.isCompleted).length

  return (
    <div className=" container mx-auto rounded-lg p-10 bg-violet-50 shadow-lg dark:bg-violet-800">
      <div className="flex justify-between p-1">
        <AppHeader title={title()} todoCount={completedTodos} />
        <div className="flex justify-end">
          <Link
            to="/settings"
            className="pl-5 text-violet-700 hover:text-violet-300 dark:text-violet-300 dark:hover:text-violet-700"
          >
            <Settings />
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <form className="my-4" onSubmit={addNewTodo}>
          <div className="grid grid-cols-6 gap-3">
            <div className="flex items-center justify-center h-full">
              <button className="text-violet-700 hover:text-violet-300 rounded-full border-2 border-violet-700 hover:border-violet-300 dark:text-violet-300 dark:border-violet-300 dark:hover:text-violet-700 dark:hover:border-violet-700 flex items-center justify-center">
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
                  onChange={() => toggleTodo(todo.id!)}
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
                onClick={() => deleteTodo(todo.id!)}
              >
                <Trash2 />
                <span className="sr-only">Delete todo</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/*Footer: about the app (c) Jens - 2024 */}
      <AppFooter />
    </div>
  )
}

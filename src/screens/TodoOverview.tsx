import { Settings } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Todo } from '../models/Todo'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'
import { Link } from 'react-router-dom'
import TodoItem from '../components/TodoItem'
import TodoInput from '../components/TodoInput'

export const TodoOverview = () => {
  // TODO: show error message when input fields are empty
  //
  // TODO: Release better version (v1.1.0)

  const [todos, setTodos] = useState<Todo[]>(
    localStorage.todos ? JSON.parse(localStorage.todos) : [],
  )

  useEffect(() => {
    localStorage.todos = JSON.stringify(todos)
  }, [todos])

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
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
    <div
      className="container mx-auto rounded-lg p-10 bg-violet-50 shadow-lg dark:bg-violet-800"
      style={{ width: '80dvw', maxWidth: '100%' }}
    >
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
      {/* TOCO: Move to TodoInput.tsx */}
      <div className="flex-1">
        <TodoInput
          addToParentState={(newTodo: Todo) => setTodos([...todos, newTodo])}
        />

        <hr className="my-4" />

        <div>
          {todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggle={toggleTodo}
              remove={deleteTodo}
            />
          ))}
        </div>
      </div>

      {/*Footer: about the app (c) Jens - 2024 */}
      <AppFooter />
    </div>
  )
}

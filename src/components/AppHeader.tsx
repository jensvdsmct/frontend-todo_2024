//Hello, {user}!
export const AppHeader = ({
  title,
  todoCount,
}: {
  title: JSX.Element
  todoCount?: number
}) => {
  const welcomeMessage = () => {
    if (todoCount === undefined || todoCount === null) return null
    switch (todoCount) {
      case 0:
        return (
          <p className=" text-3xl font-bold">
            <span className=" text-violet-700 dark:text-violet-300">
              Nothing
            </span>{' '}
            left to do!
          </p>
        )
      case 1:
        return (
          <p className=" text-3xl font-bold">
            Just{' '}
            <span className=" text-violet-700 dark:text-violet-300">
              one more
            </span>{' '}
            thing to do!
          </p>
        )
      default:
        return (
          <p className=" text-3xl font-bold">
            You have{' '}
            <span className=" text-violet-700 dark:text-violet-300">
              {todoCount}
            </span>{' '}
            things to do!
          </p>
        )
    }
  }

  return (
    <header className=" grid place-content-center">
      <h1 className=" text-6xl font-bold mb-2">{title}</h1>
      {welcomeMessage()}
    </header>
  )
}

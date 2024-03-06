import { createBrowserRouter } from 'react-router-dom'

import { TodoOverview } from '../screens/TodoOverview'
import { TodoSettings } from '../screens/TodoSettings'

// TODO: add the react router to the app

// Create a route for the home page
// Create a route for settings
const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoOverview />,
  },
  {
    path: '/settings',
    element: <TodoSettings />,
  },
  // TODO: add a route for the 404 page
  {
    path: '*',
    element: <div>404</div>,
  },
])

// Export the router to be used in the app
export default router

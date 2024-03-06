import { ChevronLeftIcon } from 'lucide-react'

import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'
import { Link } from 'react-router-dom'

export const TodoSettings = () => {
  return (
    <div className=" container mx-auto rounded-lg p-10 bg-violet-50 shadow-lg dark:bg-violet-800">
      <div className="flex justify-between p-1">
        <AppHeader title={<span>Settings</span>} />
        <div className="flex justify-end">
          <Link
            to="/"
            className="pl-5 text-violet-700 hover:text-violet-300 dark:text-violet-300 dark:hover:text-violet-700"
          >
            <ChevronLeftIcon />
          </Link>
        </div>
      </div>

      <div className="flex-1"></div>

      <AppFooter />
    </div>
  )
}

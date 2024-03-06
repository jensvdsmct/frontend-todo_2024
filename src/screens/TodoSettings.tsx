import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'

export const TodoSettings = () => {
  return (
    <div className=" container mx-auto rounded-lg p-10 bg-violet-50 shadow-lg dark:bg-violet-800">
      <AppHeader title={<h1>Settings</h1>} />

      <div className="flex-1"></div>

      <AppFooter />
    </div>
  )
}

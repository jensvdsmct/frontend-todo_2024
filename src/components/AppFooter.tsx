import { version } from '../../package.json'

// Made by Jens &copy; - 2024
export const AppFooter = () => {
  return (
    <footer className=" text-center text-gray-400 text-sm dark:text-gray-300 mt-6">
      <p>
        Made with love by{' '}
        <a className="hover:underline" href="#">
          Jens
        </a>{' '}
        - {new Date().getFullYear()} &copy;
      </p>
      <p className="font-mono text-xs">v{version}</p>
    </footer>
  )
}

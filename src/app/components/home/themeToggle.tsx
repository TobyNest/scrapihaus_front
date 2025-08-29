import { useTheme } from '@/app/contexts/ThemeContext'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="bg-bg border-bg-light flex h-[40px] w-[40px] items-center justify-center rounded-full border p-2 text-text-muted transition-colors"
    >
      {theme === 'light' ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <FontAwesomeIcon icon={faSun} />
      )}
    </button>
  )
}

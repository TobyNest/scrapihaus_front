import { useNavigate } from 'react-router-dom'
import ThemeToggle from './themeToggle'
import ScrapihausLogo from '../logo/scrapihauslogo'

export default function NavBar() {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-50 flex h-[56px] w-full flex-row items-center justify-between bg-transparent">
      <ScrapihausLogo />
      <div className="flex h-full w-[400px] flex-row items-center justify-around font-light text-text">
        <h1>PESQUISAR</h1>
        <h1>SOBRE</h1>
        <h1>F.A.Q.</h1>
        <h1>CONTATO</h1>
      </div>
      <div className="flex h-full w-min flex-row items-center justify-center gap-4">
        <ThemeToggle />
        <button
          onClick={() => navigate('/login')}
          className="flex h-[40px] w-[160px] items-center justify-center rounded-[4px] bg-highlight p-2 text-white transition-colors"
        >
          LOGIN
        </button>
      </div>
    </div>
  )
}

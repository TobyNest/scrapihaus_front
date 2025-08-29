import { useNavigate } from 'react-router-dom'
import ThemeToggle from './themeToggle'

export default function NavBar() {
  const navigate = useNavigate()

  return (
    <div className="sticky z-50 top-0 flex h-[56px] w-full flex-row items-center justify-between bg-transparent">
      <div className="h-full w-[200px]">
        <h1 className="m-0 flex h-full w-full items-center justify-start font-bold text-text">
          SCRAPIHAUS
        </h1>
      </div>
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

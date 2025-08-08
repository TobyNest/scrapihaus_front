import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white font-fredoka">
      <div
        onClick={() => navigate('/search')}
        className="h-20 w-60 cursor-pointer bg-cinzaEscuro text-3xl text-white"
      >
        Fazer pesquisa!
      </div>
    </div>
  )
}

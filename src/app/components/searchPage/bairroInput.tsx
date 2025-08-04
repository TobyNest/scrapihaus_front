'use client'
import { useState, useEffect } from 'react'
import { bairrosSP } from '@/utils/listaBairros/listaBairrosSp'

export default function BairroInput() {
  const [input, setInput] = useState('')
  const [sugestoes, setSugestoes] = useState<string[]>([])
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)
  const [selecionado, setSelecionado] = useState(0)

  useEffect(() => {
    const filtrados = bairrosSP.filter((bairro) =>
      bairro.toLowerCase().includes(input.toLowerCase())
    )
    setSugestoes(filtrados.slice(0, 6))
    setSelecionado(0)
  }, [input])

  const handleEscolha = (bairro: string) => {
    setInput(bairro)
    setMostrarSugestoes(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelecionado((prev) => (prev + 1) % sugestoes.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelecionado((prev) => (prev === 0 ? sugestoes.length - 1 : prev - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (sugestoes.length > 0) handleEscolha(sugestoes[selecionado])
    }
  }

  return (
    <div className="relative w-full min-w-[300px] border-cinzaBordas">
      <label htmlFor="bairro">
        <h1 className="text-md text-gray-500">BAIRRO:</h1>
      </label>
      <input
        id="bairro"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setMostrarSugestoes(true)
        }}
        onFocus={() => setMostrarSugestoes(true)}
        onBlur={() => setTimeout(() => setMostrarSugestoes(false), 150)}
        onKeyDown={handleKeyDown}
        className="duration-50 mt-3 w-full py-2 outline-none transition-all ease-in-out placeholder:text-gray-300"
        type="text"
        placeholder="Bairro"
        autoComplete="off"
      />

      {mostrarSugestoes && sugestoes.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-2/3 overflow-auto rounded-sm bg-white shadow-md">
          {sugestoes.map((bairro, index) => (
            <li
              key={bairro}
              onMouseDown={() => handleEscolha(bairro)}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                index === selecionado ? 'bg-gray-200' : ''
              }`}
            >
              {bairro}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

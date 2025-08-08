import { useEffect, useState } from 'react'

export default function BackGroundAnimatedGrid({
  squareSize
}: {
  squareSize: number
}) {
  const [columns, setColumns] = useState(0)
  const [rows, setRows] = useState(0)
  const [visibleSquares, setVisibleSquares] = useState(new Set())

  const updateGridSize = () => {
    const newColumns = Math.floor(window.innerWidth / squareSize) + 1
    const newRows = Math.floor(window.innerHeight / squareSize) + 1
    setColumns(newColumns)
    setRows(newRows)
  }

  useEffect(() => {
    updateGridSize()
    window.addEventListener('resize', updateGridSize)
    return () => window.removeEventListener('resize', updateGridSize)
  }, [])

  useEffect(() => {
    const total = columns * rows

    const showInterval = setInterval(() => {
      setVisibleSquares((prev) => {
        const newSet = new Set(prev)
        const randomIndex = Math.floor(Math.random() * total)
        newSet.add(randomIndex)
        return newSet
      })
    }, 80) // quadrados aparecendo
    const hideInterval = setInterval(() => {
      setVisibleSquares((prev) => {
        const newSet = new Set(prev)
        const randomIndex = Math.floor(Math.random() * total)
        newSet.delete(randomIndex)
        return newSet
      })
    }, 240) // quadrados sumindo

    return () => {
      clearInterval(showInterval)
      clearInterval(hideInterval)
    }
  }, [columns, rows])

  return (
    <div
      className="z-1 absolute left-0 top-0 grid blur-sm transition-all"
      style={{
        gridTemplateColumns: `repeat(${columns}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${squareSize}px)`
      }}
    >
      {Array.from({ length: columns * rows }).map((_, i) => (
        <div
          key={i}
          className={`border border-white transition-all duration-1000 ease-in-out ${
            visibleSquares.has(i) ? 'bg-gray-300' : 'bg-white'
          }`}
          style={{ width: squareSize, height: squareSize }}
        />
      ))}
    </div>
  )
}

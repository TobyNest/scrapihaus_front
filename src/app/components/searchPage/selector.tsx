export default function SelectorNumbers({
  setSelectedNumber,
  selectedNumber,
  title
}: {
  setSelectedNumber: (number: number) => void
  selectedNumber: number
  title: string
}) {
  const titleUpper = title.toUpperCase()

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-md text-gray-500">{titleUpper}:</h1>
      <div className="flex w-full flex-row gap-2">
        <NumbersButton
          number={1}
          setSelectedNumber={setSelectedNumber}
          selectedNumber={selectedNumber}
        />
        <NumbersButton
          number={2}
          setSelectedNumber={setSelectedNumber}
          selectedNumber={selectedNumber}
        />
        <NumbersButton
          number={3}
          setSelectedNumber={setSelectedNumber}
          selectedNumber={selectedNumber}
        />
        <NumbersButton
          number={4}
          setSelectedNumber={setSelectedNumber}
          selectedNumber={selectedNumber}
        />
      </div>
    </div>
  )
}

export function NumbersButton({
  number,
  setSelectedNumber,
  selectedNumber
}: {
  number: number
  setSelectedNumber: (number: number) => void
  selectedNumber: number
}) {
  return (
    <div
      onClick={
        selectedNumber == number
          ? () => setSelectedNumber(0)
          : () => setSelectedNumber(number)
      }
      className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border text-sm transition-all duration-200 ${selectedNumber === number ? 'border-cinzaEscuro bg-cinzaEscuro text-white' : 'border-cinzaBordas bg-cinzaClaro text-cinzaEscuro ease-in-out hover:border-cinzaEscuro hover:bg-cinzaEscuro hover:text-cinzaClaro'}`}
    >
      {number}
    </div>
  )
}

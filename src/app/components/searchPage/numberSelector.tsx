export default function NumberSelector({
  title,
  setNumber,
  selectedNumber
}: {
  title: string
  setNumber: (number: number) => void
  selectedNumber: number
}) {
  return (
    <div>
      <div className="h-8 w-full text-xl font-bold text-cinzaEscuro">
        {title}
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-1">
        <NumberButtons
          number={1}
          onClick={setNumber}
          selectedNumber={selectedNumber}
        />
        <NumberButtons
          number={2}
          onClick={setNumber}
          selectedNumber={selectedNumber}
        />
        <NumberButtons
          number={3}
          onClick={setNumber}
          selectedNumber={selectedNumber}
        />
        <NumberButtons
          number={4}
          onClick={setNumber}
          selectedNumber={selectedNumber}
        />
        <NumberButtons
          number={5}
          onClick={setNumber}
          selectedNumber={selectedNumber}
        />
      </div>
    </div>
  )
}

export function NumberButtons({
  number,
  onClick,
  selectedNumber
}: {
  number: number
  onClick: (number: number) => void
  selectedNumber: number
}) {
  return (
    <div
      onClick={() => onClick(number)}
      className={` ${selectedNumber !== number ? 'flex h-12 w-12 cursor-pointer select-none items-center justify-center rounded-md border border-cinzaBordas bg-cinzaClaro text-xl text-cinzaEscuro transition-all duration-150 ease-in-out hover:bg-cinzaEscuro hover:text-white' : 'flex h-12 w-12 select-none items-center justify-center rounded-md bg-cinzaEscuro text-xl text-white transition-all duration-150 ease-in-out'}`}
    >
      {number}
    </div>
  )
}

export default function TypeSelector({
  selectedOption,
  setSelectedOption
}: {
  selectedOption: number
  setSelectedOption: (value: number) => void
}) {
  return (
    <div className="relative flex h-8 text-md w-full flex-row rounded-sm border border-cinzaBordas bg-white">
      <div
        onClick={() => setSelectedOption(0)}
        className={`z-10 flex h-full w-1/3 items-center justify-center bg-transparent  ${selectedOption == 0 ? 'text-white' : 'text-cinzaEscuro'} cursor-pointer select-none rounded-l-full transition-all duration-150 ease-in-out`}
      >
        Casa
      </div>
      <div
        onClick={() => setSelectedOption(1)}
        className={`z-10 flex h-full w-1/3 items-center justify-center bg-transparent  ${selectedOption == 1 ? 'text-white' : 'text-cinzaEscuro'} cursor-pointer select-none transition-all duration-150 ease-in-out`}
      >
        Apartamento
      </div>
      <div
        onClick={() => setSelectedOption(2)}
        className={`z-10 flex h-full w-1/3 items-center justify-center bg-transparent  ${selectedOption == 2 ? 'text-white' : 'text-cinzaEscuro'} cursor-pointer select-none rounded-r-full transition-all duration-150 ease-in-out`}
      >
        Terreno/Lote
      </div>
      <div
        className={`pointer-events: none absolute h-full w-1/3 rounded-sm bg-cinzaEscuro ${selectedOption == 0 ? 'left-0' : selectedOption == 1 ? 'left-1/3' : 'left-2/3'} transition-all duration-150 ease-in-out`}
      ></div>
    </div>
  )
}

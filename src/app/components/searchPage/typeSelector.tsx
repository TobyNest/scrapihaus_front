export default function TypeSelector({
  selectedOption,
  setSelectedOption
}: {
  selectedOption: number
  setSelectedOption: (value: number) => void
}) {
  return (
    <div className="relative flex h-14 w-1/3 flex-row rounded-full bg-cinzaClaro">
      <div
        onClick={() => setSelectedOption(0)}
        className={`z-10 flex h-full w-1/3 items-center justify-center bg-transparent text-xl ${selectedOption == 0 ? 'text-white' : 'text-cinzaEscuro'} cursor-pointer select-none rounded-l-full transition-all duration-150 ease-in-out`}
      >
        Casa
      </div>
      <div
        onClick={() => setSelectedOption(1)}
        className={`z-10 flex h-full w-1/3 items-center justify-center bg-transparent text-xl ${selectedOption == 1 ? 'text-white' : 'text-cinzaEscuro'} cursor-pointer select-none transition-all duration-150 ease-in-out`}
      >
        Apartamento
      </div>
      <div
        onClick={() => setSelectedOption(2)}
        className={`z-10 flex h-full w-1/3 items-center justify-center bg-transparent text-xl ${selectedOption == 2 ? 'text-white' : 'text-cinzaEscuro'} cursor-pointer select-none rounded-r-full transition-all duration-150 ease-in-out`}
      >
        Terreno/Lote
      </div>
      <div
        className={`pointer-events: none absolute h-full w-1/3 rounded-full bg-cinzaEscuro ${selectedOption == 0 ? 'left-0' : selectedOption == 1 ? 'left-1/3' : 'left-2/3'} transition-all duration-150 ease-in-out`}
      ></div>
    </div>
  )
}

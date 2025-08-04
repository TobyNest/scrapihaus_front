export default function newSearchPage() {
  return (
    <div className="font-fredoka flex h-screen w-screen items-center justify-center bg-white">
      <div className="flex flex-col gap-4">
        <div className="fit flex h-fit min-h-20 min-w-[700px] flex-row rounded-sm bg-white px-8 py-6 shadow-[0_0_30px_0_rgba(0,0,0,0.2)]">
          <div className="w-full min-w-[300px] border-cinzaBordas">
            <label htmlFor="bairro">
              <h1 className="text-md font-fredoka text-gray-500">BAIRRO:</h1>
            </label>
            <input
              id="bairro"
              className="duration-50 mt-3 w-full rounded-md border-cinzaBordas outline-none transition-all ease-in-out placeholder:text-gray-300"
              type="text"
              placeholder="Bairro"
            ></input>
          </div>
          <div className="flex min-w-[200px] flex-col border-l-2 pl-8">
            <label htmlFor="area-minima">
              <h1 className="text-md text-gray-500">ÁREA MÍNIMA:</h1>
            </label>
            <div className="flex flex-row justify-between">
              <input
                id="area-minima"
                className="duration-50 mt-3 w-20 rounded-md border-cinzaBordas outline-none transition-all ease-in-out placeholder:text-gray-300"
                type="number"
                placeholder="Área"
              ></input>

              <div className="flex h-full w-10 items-end">m²</div>
            </div>
          </div>
          <div className="flex min-w-[200px] flex-col border-l-2 pl-8">
            <label htmlFor="area-maxima">
              <h1 className="text-md text-gray-500">ÁREA MÁXIMA:</h1>
            </label>
            <div className="flex flex-row justify-between">
              <input
                id="area-maxima"
                className="duration-50 mt-3 w-20 rounded-md border-cinzaBordas outline-none transition-all ease-in-out placeholder:text-gray-300"
                type="number"
                placeholder="Área"
              ></input>

              <div className="flex h-full w-10 items-end">m²</div>
            </div>
          </div>
        </div>
        <div className="flex min-h-20 min-w-[700px] flex-row rounded-sm bg-white px-8 py-6 shadow-[0_0_30px_0_rgba(0,0,0,0.2)]">
          <div className="flex flex-col gap-2">
            <h1 className="text-md text-gray-500">QUARTOS:</h1>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cinzaEscuro pr-[2px] text-cinzaClaro">
              1
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

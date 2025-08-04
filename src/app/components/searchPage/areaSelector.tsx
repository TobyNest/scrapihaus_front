interface AreaSelectorProps {
  valores: {
    tamanhoMin: string
    tamanhoMax: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function areaSelector({
  valores,
  handleChange
}: AreaSelectorProps) {
  return (
    <>
      <div className="mt-4 h-8 w-full text-xl font-bold text-cinzaEscuro">
        Área
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex w-2/5 flex-row rounded-md border border-cinzaBordas bg-cinzaClaro">
          <div className="flex h-10 w-14 items-center justify-center rounded-md bg-cinzaEscuro text-xl text-white">
            Mín
          </div>
          <div>
            <label htmlFor="tamanhoMin" className="sr-only">
              Área
            </label>
            <input
              placeholder="Área mínima"
              id="tamanhoMin"
              name="tamanhoMin"
              className="h-10 w-full bg-transparent px-4 outline-none"
              type="text"
              onChange={handleChange}
              value={valores.tamanhoMin}
            ></input>
          </div>
          <div className="flex w-10 items-center justify-center text-xl text-cinzaEscuro">
            m²
          </div>
        </div>
        <div className="flex w-2/5 flex-row rounded-md border border-cinzaBordas bg-cinzaClaro">
          <div className="flex h-10 w-14 items-center justify-center rounded-md bg-cinzaEscuro text-xl text-white">
            Máx
          </div>
          <input
            placeholder="Área máxima"
            name="tamanhoMax"
            className="h-10 w-full bg-transparent px-4 outline-none"
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={handleChange}
            value={valores.tamanhoMax}
          ></input>
          <div className="flex w-10 items-center justify-center px-8 text-xl text-cinzaEscuro">
            m²
          </div>
        </div>
      </div>
    </>
  )
}

export default function BairroSelector() {
  return (
    <>
      <div>
        <label
          htmlFor="bairro"
          className="h-8 w-full text-xl font-bold text-cinzaEscuro"
        >
          Bairro
        </label>
        <input
          id="bairro"
          className="duration-50 my-3 h-10 w-full rounded-md border-2 border-cinzaBordas bg-cinzaClaro p-1 outline-none transition-all ease-in-out focus:border-cinzaEscuro"
        ></input>
      </div>
    </>
  )
}

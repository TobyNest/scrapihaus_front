import { useState } from 'react'
import TypeSelector from '../components/searchPage/typeSelector'
import BairroSelector from '../components/searchPage/bairroSelector'
import AreaSelector from '../components/searchPage/areaSelector'
import NumberSelector from '../components/searchPage/numberSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export function SearchPage() {
  const [selectedOption, setSelectedOption] = useState(0)
  const [roomNumber, setRoomNumber] = useState(1)
  const [bathroomNumber, setBathroomNumber] = useState(1)
  const [parkingSlotsNumber, setParkingSlotsNumber] = useState(1)

  const navigate = useNavigate()

  const [valores, setValores] = useState({
    tamanhoMin: '',
    tamanhoMax: ''
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target

    // Remove tudo que não for dígito
    const somenteNumeros = value.replace(/\D/g, '')
    setValores((prev) => ({
      ...prev,
      [name]: somenteNumeros
    }))
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center  bg-white">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8">
        <TypeSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        {/* box-shadow: offset-x offset-y blur spread color */}
        <div className="h-4/5 w-[45%] rounded-md p-8 shadow-[0_0_30px_0_rgba(0,0,0,0.2)]">
          <BairroSelector />

          <AreaSelector valores={valores} handleChange={handleChange} />
          <div className="mt-8" />
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex w-[45%] flex-col gap-4">
              <NumberSelector
                title={'Quartos'}
                setNumber={setRoomNumber}
                selectedNumber={roomNumber}
              />

              <NumberSelector
                title={'Banheiros'}
                setNumber={setBathroomNumber}
                selectedNumber={bathroomNumber}
              />

              <NumberSelector
                title={'Vagas de Garagem'}
                setNumber={setParkingSlotsNumber}
                selectedNumber={parkingSlotsNumber}
              />
            </div>
            <div className="h-max w-[45%] bg-black">ads</div>
          </div>
          <div className="w-600 flex items-center justify-center">
            <div
              onClick={() => navigate('/result')}
              className="group mt-8 flex h-14 w-60 cursor-pointer items-center justify-center rounded-2xl bg-black text-xl font-bold text-white transition-all duration-150 ease-in-out"
            >
              <div>Pesquisar</div>
              <div className="ml-2 h-6 w-0 translate-x-[20px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

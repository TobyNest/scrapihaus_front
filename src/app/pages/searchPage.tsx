import { useEffect, useRef } from 'react'
import { useAuth } from '../contexts/authContext'
import SearchSection from '../components/home/search'
import ThemeToggle from '../components/home/themeToggle'
import gsap from 'gsap'
import { useSearch } from '../contexts/searchContext'
import HousingTable from '../components/resultsPage/housingTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import SearchHistory from '../components/searchPage/searchHistory'
import { historyMock } from '@/mocks/historyMock'

export default function SearchPage() {
  const { isResultPage, setIsResultPage, housings, searches } = useSearch()
  const { user } = useAuth()
  const navigate = useNavigate()

  const searchContentRef = useRef(null)
  const resultsContentRef = useRef(null)

  useEffect(() => {
    if (isResultPage) {
      gsap.to(searchContentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        onComplete: () => {
          gsap.set(searchContentRef.current, { display: 'none' })
          gsap.set(resultsContentRef.current, { display: 'flex' })
          gsap.fromTo(
            resultsContentRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.2 }
          )
        }
      })
    } else {
      gsap.to(resultsContentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        onComplete: () => {
          gsap.set(resultsContentRef.current, { display: 'none' })
          gsap.set(searchContentRef.current, { display: 'flex' })
          gsap.fromTo(
            searchContentRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.2 }
          )
        }
      })
    }
  }, [isResultPage])

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-start bg-bg-dark text-text transition-colors duration-500">
      <div className="flex h-[90px] min-h-[88px] w-full flex-shrink-0 flex-row">
        <div className="flex h-full w-[20%] items-center justify-center font-roboto">
          <div className="flex h-[32px] w-full flex-row gap-[8px] pl-[16px]">
            <div
              onClick={() => {
                !user ? navigate('/login') : navigate('/profile')
              }}
              className="h-[40px] w-[48px] cursor-pointer rounded-full bg-bg-light transition-colors duration-300 ease-in-out hover:bg-highlight"
            ></div>
            <div className="flex h-[32px] w-full flex-col">
              <h1 className="text-[16px] font-bold text-text">
                {user?.full_name || 'Nome usuario'}
              </h1>
              <h1 className="text-[12px] font-extralight text-text-muted">
                {user?.email || 'email@email.com'}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-row items-center justify-between pr-[16px] text-[24px] font-semibold">
          <div className="flex flex-row gap-[16px]">
            <h1
              onClick={() => {
                if (isResultPage) setIsResultPage(false)
              }}
              className={`${isResultPage ? 'cursor-pointer underline' : ''} `}
            >
              Pesquisa
            </h1>
            <h1
              className={`${isResultPage ? '' : 'hidden'} bg flex flex-row items-center justify-center gap-[16px] transition-all duration-150 ease-in-out`}
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                className="mt-1 text-[16px] text-border"
              />
              <h1>Resultados</h1>
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex h-[94%] w-full flex-row pb-[16px] pl-[16px] overflow-hidden">
        <div
          className={`${
            isResultPage ? 'w-0' : 'w-[20%]'
          } h-full overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <SearchHistory searches={historyMock} user={user} />
        </div>

        <div className="relative mb-[16px] mr-[16px] flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[8px] bg-bg transition-colors duration-500">
          {/* Conteúdo da pesquisa */}
          <div
            ref={searchContentRef}
            className="flex flex-col items-center justify-center gap-[64px]"
          >
            <div className="inline-flex w-min flex-col whitespace-nowrap">
              <h1 className="font-roboto text-[48px] font-bold">
                Olá{' '}
                <span
                  onClick={() => setIsResultPage(true)}
                  className="cursor-pointer text-border transition-all duration-150 ease-in-out hover:underline"
                >
                  {user?.full_name.split(' ')[0] || 'Usuario'}
                </span>
                !
              </h1>
              <h1 className="font-roboto text-[48px] font-regular text-text-muted">
                O que está procurando hoje?
              </h1>
            </div>
            <SearchSection variant="search" />
          </div>

          {/* Conteúdo de resultados */}
          <div
            ref={resultsContentRef}
            className="hidden h-full w-full flex-col items-center justify-center overflow-hidden"
          >
            <div className="flex h-full w-full flex-col items-center justify-start gap-[16px] p-[16px] pt-[32px] overflow-hidden">
              <HousingTable housings={housings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

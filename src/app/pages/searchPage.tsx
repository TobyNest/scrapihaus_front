import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import SearchSection from '../components/home/search'
import ThemeToggle from '../components/home/themeToggle'
import gsap from 'gsap'
import { useSearch } from '../contexts/searchContext'
import HousingTable from '../components/searchPage/housingTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SearchHistory from '../components/searchPage/searchHistory'
import HelloSection from '../components/searchPage/helloSection'
import UserDetails from '../components/searchPage/userDetails'

export default function SearchPage() {
  const { isResultPage, setIsResultPage, housings, searches, fetchMySearches } =
    useSearch()
  const { user, logout } = useAuth()
  const [showPage, setShowPage] = useState(false)

  const searchContentRef = useRef(null)
  const resultsContentRef = useRef(null)

  useEffect(() => {
    if (!user) return // só chama se tiver usuário

    let timeout: NodeJS.Timeout

    const fetchAndShow = async () => {
      const start = Date.now()

      await fetchMySearches(user.access_token) // pega o histórico
      const elapsed = Date.now() - start

      const minTime = 1000 // tempo mínimo de loading
      const remaining = minTime - elapsed

      if (remaining > 0) {
        await new Promise<void>((res) => {
          timeout = setTimeout(res, remaining)
        })
      }

      setShowPage(true) // só seta depois do fetch e do delay
    }

    fetchAndShow()

    return () => clearTimeout(timeout) // cleanup
  }, [user])

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
        <div className="flex h-full w-[20%] items-center justify-start pl-[16px] font-roboto">
          <UserDetails user={user} logout={logout} />
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

      <div className="flex h-[94%] w-full flex-row overflow-hidden pb-[16px] pl-[16px]">
        <div
          className={`${
            isResultPage || !user ? 'w-0' : 'w-[20%]'
          } h-full overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <SearchHistory loading={!showPage} searches={searches} user={user} />
        </div>

        <div className="relative mb-[16px] mr-[16px] flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[8px] bg-bg transition-colors duration-500">
          {/* Conteúdo da pesquisa */}
          <div
            ref={searchContentRef}
            className="flex w-full flex-col items-center justify-center gap-[64px]"
          >
            <HelloSection
              user={user}
              setIsResultPage={setIsResultPage}
              loading={showPage}
            />
            <SearchSection variant="search" showPage={showPage} />
          </div>

          {/* Conteúdo de resultados */}
          <div
            ref={resultsContentRef}
            className="hidden h-full w-full flex-col items-center justify-center overflow-hidden"
          >
            <div className="flex h-full w-full flex-col items-center justify-start gap-[16px] overflow-hidden p-[16px] pt-[32px]">
              <HousingTable
                housings={housings}
                setIsResultPage={setIsResultPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
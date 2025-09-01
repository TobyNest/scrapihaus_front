import { useEffect, useRef } from 'react'
import { useAuth } from '../contexts/authContext'
import SearchSection from '../components/home/search'
import ThemeToggle from '../components/home/themeToggle'
import gsap from 'gsap'
import { useSearch } from '../contexts/searchContext'

export default function SearchPage() {
  const { isResultPage, setIsResultPage } = useSearch()
  const { user } = useAuth()

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
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-bg-dark text-text transition-colors duration-500">
      <div className="flex h-[8%] w-full flex-row">
        <div className="h-full w-[20%] flex items-center justify-center font-roboto">
          <div className='h-[32px] w-full flex flex-row gap-[8px]'>
            <div className='w-[48px] h-[40px] bg-bg-light rounded-full'></div>
            <div className='w-full h-[32px] flex flex-col'>
              <h1 className='text-[16px] font-bold text-text'>{user?.full_name || "Breno Amorim Roman"}</h1>
              <h1 className='text-[12px] font-extralight text-text-muted'>{user?.email || "teste99@gmail.com"}</h1>
            </div>
            
          </div>
          
        </div>
        <div className="flex h-full w-full flex-row items-center justify-between pr-[16px] text-[24px] font-semibold">
          <div className="flex flex-row gap-[32px]">
            <h1>Pesquisa</h1>
            <h1
              className={`${isResultPage ? '' : 'hidden'} transition-all duration-150 ease-in-out`}
            >
              Resultados
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex h-full w-full flex-row pb-[16px] pl-[16px]">
        <div
          className={`${
            isResultPage ? 'w-0' : 'w-[20%]'
          } h-full overflow-hidden transition-all duration-300 ease-in-out`}
        ></div>

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
                  {user?.full_name.split(' ')[0] || 'Breno'}
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
            className="hidden h-full w-full flex-col items-center justify-center"
          >
            <button
              type="button"
              onClick={() => {
                setIsResultPage(false)
              }}
              className="mt-4 rounded bg-border px-4 py-2 text-white"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

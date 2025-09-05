import NavBar from '../components/home/navbar'
import SearchSection from '../components/home/search'

export default function HomePage() {
  return (
    <div className="hide-scrollbar hide-scrollbar flex h-[400vh] w-full flex-col items-center justify-start overflow-x-hidden bg-bg-dark transition-colors duration-500">
      <div className="relative h-full w-full">
        <div className="absolute left-0 top-[180px] h-[400px] w-[400px] rounded-full bg-highlight blur-[160px]"></div>
        <div className="absolute right-0 top-[500px] h-[400px] w-[400px] rounded-full bg-highlight blur-[160px]"></div>
      </div>
      <div className="z-99 absolute left-0 top-0 flex h-[400vh] w-full flex-col items-center justify- gap-[40px] px-[32px] py-[24px]">
        <NavBar />
        <div className="flex h-[640px] w-full flex-col items-center justify-center">
          <div className="flex h-1/2 w-[676px] flex-col items-center justify-center text-[64px] font-bold text-text">
            <h1 className="text-center">
              Pesquise. Analise. <span className="text-border">Decida</span>.
            </h1>
            <h1 className="text-base font-regular">
              Milhares de imóveis e terrenos em um só lugar.
            </h1>
          </div>
          <div className="0 flex h-1/2 w-full items-center justify-center">
            <SearchSection variant='home' showPage={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

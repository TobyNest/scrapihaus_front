import Logo from '@/assets/ScrapihausLogo1.png'

export default function ScrapihausLogo() {
  return (
    <div className="h-full w-[250px]">
      <img src={Logo} alt="Descrição" className="h-full w-full object-cover" />
    </div>
  )
}

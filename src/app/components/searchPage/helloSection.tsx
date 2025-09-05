import { User } from '@/app/types/user'

export default function HelloSection({
  user,
  setIsResultPage,
  loading: showPage
}: {
  user: User | null
  setIsResultPage: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
}) {
  if (!showPage && user) {
    return <SkeletonCard />
  }

  return (
    <div className="inline-flex w-min flex-col whitespace-nowrap">
      <h1 className="font-roboto text-[48px] font-bold">
        {user ? 'Olá' : 'É ótimo ter você aqui!'}{' '}
        <span
          onClick={() => setIsResultPage(true)}
          className="cursor-pointer text-border transition-all duration-150 ease-in-out hover:underline"
        >
          {user?.full_name.split(' ')[0]}
        </span>
        {user && '!'}
      </h1>
      <h1 className="font-roboto text-[48px] font-regular text-text-muted">
        O que está procurando hoje?
      </h1>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="mr-[32px] flex h-[160px] w-[40%] animate-pulse flex-col justify-between p-4">
      <div className="h-[64px] w-1/2 rounded bg-bg-dark" />
      <div className="mt-2 h-[32px] w-full rounded bg-bg-dark" />
    </div>
  )
}

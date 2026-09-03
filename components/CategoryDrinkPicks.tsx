'use client'

import { useHttp } from "@/hooks/useHttp"
import { DrinkDataApi, normalizeDrinkApi } from "@/types/drinks"
import Link from "next/link"

const CategoryPicks = ({ category }: { category: string }) => {
  const { data } = useHttp<{ drinks: DrinkDataApi[] | null }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/filter.php?c=${category}`)

  const drinks = data?.drinks?.slice(0, 4).map(normalizeDrinkApi) ?? [];

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-2'>
      {drinks && drinks.map(d => (
        <Link key={d.id} href={'/'} className='max-w-xs mx-auto rounded-xl overflow-hidden bg-text-primary/80 border border-neutral-800 shadow-lg shadow-black/40 flex flex-col'>
          <img src={d.image ?? '/placeholder.png'} alt={d.name} className='object-cover w-full h-full'/>
          <h3 className='text-xl font-semibold text-accent-three py-2'>{d.name}</h3>
        </Link>
      ))}
    </div >
  )
}

export default CategoryPicks;
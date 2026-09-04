'use client'

import { useHttp } from '@/hooks/useHttp';
import { DrinkDetailsDataApi, normalizeDrinkDetail } from '@/types/drinkDetail';
import Image from 'next/image';
import { use } from 'react';

const DrinkDetail=({params}:{params:Promise<{id:string}>})=>{
  const {id} = use(params);
  const {data ,isLoading , error} = useHttp<{drinks:DrinkDetailsDataApi[] | null}>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}lookup.php?i=${id}`)

  if(isLoading) return <p className='p-4'>Loading...</p>
  if(error) return <p className='p-4 text-accent-two'>Could not load this drink</p>

  const rawDrink = data?.drinks?.[0]
  if(!rawDrink) return <p className='p-4'>Drink not found.</p>

  const drink = normalizeDrinkDetail(rawDrink)

  return(
    <div className='max-w-xl p-4 mx-auto'>
      <div className='relative aspect-square overflow-hidden rounded-xl mb-6'>
        <Image src={drink.image ?? 'placeholder.png'} alt={drink.name} fill className='object-cover'/>
      </div>
      <h1 className='text-lg md:text-2xl text-center font-bold'>{drink.name}</h1>
      <div className='flex flex-wrap gap-2 my-3'>
        <span className='px-2.5 py-1 rounded-full text-base font-medium bg-accent-three/15 text-accent-three border border-accent-three/20'>
          {drink.category}
        </span>
        <span className='px-2.5 py-1 rounded-full text-base font-medium bg-text-primary/10 border border-text-primary/20'>
          {drink.type}
        </span>
        <span className='px-2.5 py-1 rounded-full text-base font-medium bg-accent-one/15 text-accent-one border border-accent-one/20'>
          {drink.glass}
        </span>
      </div>

      <h2 className='font-semibold text-lg md:text-xl my-4'>Ingredients:</h2>
      <ul className='list-disc list-inside space-y-1'>
        {drink.ingredients.map(ing => (
          <li key={ing.name}>
            {ing.name}{ing.measure ? ` — ${ing.measure}` : ''}
          </li>
        ))}
      </ul>
        <h2 className='font-semibold text-lg md:text-xl my-4'>Instructions:</h2>
        <p className='text-text-primary/90 leading-relaxed'>{drink.instructions}</p>
    </div>
  )
}

export default DrinkDetail;
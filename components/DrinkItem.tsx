import { Drink } from '@/types/drinks'
import Image from 'next/image'

const DrinkItem = ({ drink }: { drink: Drink }) => {
  return (
    <div className='max-w-xs mx-auto rounded-xl overflow-hidden bg-text-primary/80 border border-neutral-800 shadow-lg shadow-black/40'>
      <div className='relative aspect-square'>
      <Image src={drink.image ?? '/placeholder.png'} fill alt={drink.name} className='object-cover' />
      </div>
      <div className='p-5'>
        <h2 className='text-xl font-semibold text-accent-three text-center'>{drink.name}</h2>
        <div className='mt-3 flex items-center gap-2 flex-wrap justify-evenly'>
          <div className='px-2.5 py-1 rounded-full text-base font-medium bg-background/55 text-accent-one border border-text-primary/20'>
            {drink.category}
          </div>
          <div className='px-2.5 py-1 rounded-full text-base font-medium bg-text-primary/90 text-background border border-text-primary'>
            {drink.type}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrinkItem
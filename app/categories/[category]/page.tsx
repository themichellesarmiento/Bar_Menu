'use client'

import { useAuthContext } from "@/contexts/AuthContext";
import { useHttp } from "@/hooks/useHttp";
import { DrinkDataApi, normalizeDrinkApi } from "@/types/drinks";
import { AuthContextType } from "@/types/user";
import { fromSlugToQueryValue } from "@/utils/categoryQuery";

import Link from "next/link";
import { use } from "react";

const CategoryDetail = ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = use(params);
  const { user, setFavoriteCategory } = useAuthContext() as AuthContextType;

  const categoryName = fromSlugToQueryValue(category);

  const { data, isLoading, error } = useHttp<{ drinks: DrinkDataApi[] | null }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/filter.php?c=${categoryName}`)

  if (isLoading) return <p className='p-4'>Loading {categoryName}</p>
  if (error) return <p className='p-4 text-accent-two'>Could not load this category</p>

  const categoryDrinks = data?.drinks?.map(normalizeDrinkApi) ?? [];
  const isFavorite = user?.favoriteCategory === categoryName;

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between gap-3 mb-6 flex-wrap'>
        <h1 className='text-xl md:text-2xl uppercase font-bold'>{decodeURIComponent(categoryName)}</h1>
        {user && (
          <button onClick={()=>setFavoriteCategory(categoryName)}
          disabled={isFavorite}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isFavorite
                ? 'bg-accent-three text-background cursor-default'
                : 'border border-accent-three text-accent-three hover:bg-accent-three/10'
            }`}>
            {isFavorite ? 'Favorite category' : 'Set as favorite'}
          </button>
        )}
      </div>

      {categoryDrinks.length === 0 ? (
        <p>No drinks found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categoryDrinks.map((drink) => (
            <Link
              key={drink.id}
              href={`/drink/${drink.id}`}
              className="rounded-lg overflow-hidden border border-text-primary/10 bg-background/40">
              <div className="aspect-square bg-text-primary/5">
                <img
                  src={drink.image ?? '/placeholder.png'}
                  alt={drink.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="p-2 text-sm text-text-primary">{drink.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>

  )
}

export default CategoryDetail;
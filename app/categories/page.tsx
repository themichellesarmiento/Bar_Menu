'use client'
import { useHttp } from "@/hooks/useHttp"
import { CategoryDataApi } from "@/types/categories"
import Link from "next/link"
import { toCategorySlug } from "@/utils/categoryQuery"

const Categories = () => {
  const { data, isLoading, error } = useHttp<{ drinks: CategoryDataApi[] | null }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}list.php?c=list`);

  if (isLoading) return <p className='p-4'>Loading categories..</p>
  if (error) return <p className='p-4 text-accent-two'>Could not load categories</p>

  const categories = data?.drinks ?? []

  return (
    <div className='p-6'>
      <h1 className='mb-4 text-xl md:text-2xl uppercase font-bold'>Categories</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {categories && categories.map(({ strCategory }) => (
          <Link key={strCategory} href={`/categories/${toCategorySlug(strCategory)}`}
            className='rounded-lg border border-text-primary/10 bg-background/40 p-5 text-center hover:bg-accent-three/15 hover:border-accent-three/40 transition-colors'>
            <span className='font-medium'>{strCategory}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories;
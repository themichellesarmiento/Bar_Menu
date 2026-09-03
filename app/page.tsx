'use client'
import CategoryPicks from "@/components/CategoryDrinkPicks";
import { useAuthContext } from "@/contexts/AuthContext";
import { AuthContextType } from "@/types/user";
import Link from "next/link";

const Home = () => {
  const { user } = useAuthContext() as AuthContextType;

  return (
    <div className='px-4 py-2 text-right'>
      <>
        {user &&
          <h1>Welcome back, {user.username}</h1>
        }
        <div className='text-center mt-2'>
          {user && user.favoriteCategory ? (
            <>
              <h2>You may also like these {user.favoriteCategory} drinks</h2>
              <CategoryPicks category={user.favoriteCategory} />
            </>
          ) :
            (
              <Link href={'/categories'} className='hover:underline'>Browse Categories</Link>
            )
          }
        </div>
      </>
    </div>
  )
}

export default Home;
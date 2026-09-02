'use client'
import DrinkItem from "@/components/DrinkItem";
import Form from "@/components/UI/Form";
import { useAuthContext } from "@/contexts/AuthContext";
import { useHttp } from "@/hooks/useHttp";
import { DrinkDataApi, normalizeDrinkApi } from "@/types/drinks";
import { AuthContextType } from "@/types/user";
import { useState } from "react";

const Home = () => {
  const { user } = useAuthContext() as AuthContextType;
  const [showLogin, setShowLogIn] = useState(false);
  const { data } = useHttp<{ drinks: DrinkDataApi[] | null }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/random.php`)
  const randomDrink = data?.drinks?.[0] ? normalizeDrinkApi(data.drinks[0]) : undefined

  return (
    <div className='px-4 py-2 text-right'>
      {!user ?
        <>
          <button className='hover:underline' onClick={() => setShowLogIn(true)}>Log in to see your saved order</button>
          {showLogin && <Form open={showLogin} handleClose={setShowLogIn} />}
          <h2 className='font-semibold uppercase text-lg md:text-2xl my-2 text-center'>Shots of the Day!</h2>
          {randomDrink && <DrinkItem drink={randomDrink} />}
        </>
        :
        <>
          <h1>Welcome back, {user.username}</h1>
          <div className='text-center mt-2'>
          <h2>You may like if there is category</h2>
          <h2>Best sellers bla bla  cocktails by category if no category</h2>
          </div>
        </>
      }
    </div>
  )
}

export default Home;
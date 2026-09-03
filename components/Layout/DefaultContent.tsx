'use client'

import { useState } from "react";
import { useHttp } from "@/hooks/useHttp";
import { DrinkDataApi, normalizeDrinkApi } from "@/types/drinks";
import Form from "../UI/Form";
import DrinkItem from "../DrinkItem";

const DefaultContent = () => {
  const [showLogin, setShowLogIn] = useState(false);
  const { data } = useHttp<{ drinks: DrinkDataApi[] | null }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/random.php`)
  const randomDrink = data?.drinks?.[0] ? normalizeDrinkApi(data.drinks[0]) : undefined

  return (
    <div className='px-4 py-2 text-right'>
      <button className='hover:underline' onClick={() => setShowLogIn(true)}>Log in to see your saved order</button>
      {showLogin && <Form open={showLogin} handleClose={setShowLogIn} />}
      <h1 className='font-semibold uppercase text-lg md:text-2xl my-2 text-center'>Shots of the Day!</h1>
      {randomDrink && <DrinkItem drink={randomDrink} />}
    </div>
  )
}

export default DefaultContent;
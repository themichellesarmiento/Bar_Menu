'use client'

import { useAuthContext } from "@/contexts/AuthContext";
import { AuthContextType } from "@/types/user";
import Navigation from "../Layout/Navigation";
import { ReactNode } from "react";
import DefaultContent from "../Layout/DefaultContent";
import { useCartContext } from "@/contexts/CartContext";
import { CartContextType } from "@/types/cart";

const LogInWrapper = ({ children }: { children: ReactNode }) => {
  const { user, logOut } = useAuthContext() as AuthContextType
  const { clearCart } = useCartContext() as CartContextType

  const handleLogout = () => {
    logOut();
    clearCart();
  }

  return (
    <>
      {user ?
        <>
          <Navigation />
          <div className='text-right p-4'>
            <button onClick={handleLogout} className='hover:underline'>Log Out</button>
          </div>
          {children}
        </> :
        <>
          <DefaultContent />
        </>
      }
    </>
  )
}

export default LogInWrapper;
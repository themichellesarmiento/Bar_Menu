'use client'

import { useAuthContext } from "@/contexts/AuthContext";
import { AuthContextType } from "@/types/user";
import Navigation from "../Layout/Navigation";
import { ReactNode } from "react";
import DefaultContent from "../Layout/DefaultContent";
import { useRouter } from "next/navigation";

const LogInWrapper = ({ children }: { children: ReactNode }) => {
  const { user, logOut } = useAuthContext() as AuthContextType
  const router = useRouter();

  const handleLogOut = () => {
    logOut();
    router.push('/')
  }

  return (
    <>
      {user ?
        <>
          <Navigation />
          <div className='text-right p-4'>
            <button onClick={handleLogOut} className='hover:underline'>Log Out</button>
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
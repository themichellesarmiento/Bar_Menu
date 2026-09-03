'use client'

import { useAuthContext } from "@/contexts/AuthContext";
import { AuthContextType } from "@/types/user";
import Navigation from "../Layout/Navigation";
import { ReactNode } from "react";
import DefaultContent from "../Layout/DefaultContent";

const LogInWrapper = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext() as AuthContextType

  return (
    <>
      {user ?
        <>
          <Navigation />
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
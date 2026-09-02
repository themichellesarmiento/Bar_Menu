'use client'

import { useAuthContext } from "@/contexts/AuthContext";
import { AuthContextType } from "@/types/user";
import Navigation from "../Layout/Navigation";

const LogInWrapper = () => {
  const { user } = useAuthContext() as AuthContextType
  return (
    <>
      {user &&
        <>
          <Navigation/>
        </>}
    </>
  )
}

export default LogInWrapper;
'use client'

import { AuthContextType, UserModel } from "@/types/user"
import { createContext, useContext, useState, ReactNode } from "react"

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserModel | null>(null);

  return (
    <AuthContext.Provider value={{
      user,
      setUser
    }}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
}
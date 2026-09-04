'use client'

import { AuthContextType, UserModel } from "@/types/user"
import { createContext, useContext, useState, ReactNode } from "react"

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserModel | null>(null);

  const setFavoriteCategory = (category: string) => {
    setUser((prev) => prev ? { ...prev, favoriteCategory: category } : prev)
  }

  const logIn = (loggedInUser: UserModel) => setUser(loggedInUser);
  const logOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{
      user,
      setFavoriteCategory,
      logIn,
      logOut
    }}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
}
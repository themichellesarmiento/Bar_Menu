'use client'
import { CartContextType, CartItem } from "@/types/cart";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { AuthContextType } from "@/types/user";

const CartContext = createContext<CartContextType | null>(null)
const key = 'user-cartItems'

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItemsByUser, setCartItemsByUser] = useState<Record<string, CartItem[]>>({})
  const [hasLoaded, setHasLoaded] = useState(false);
  const { user } = useAuthContext() as AuthContextType

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        setCartItemsByUser(JSON.parse(stored))
      }
    } catch {

    } finally {
      setHasLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!hasLoaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(cartItemsByUser))
    } catch {

    }

  }, [cartItemsByUser, hasLoaded])

  const cartItems = user ? (cartItemsByUser[user.username] ?? []) : []; //nullish coalescing op

  const addToCart = (item: CartItem) => {
    if (!user) return;
    setCartItemsByUser(prev => {
      const existing = prev[user.username] ?? [];
      if (existing.some(i => i.id === item.id)) return prev;
      return { ...prev, [user.username]: [...existing, item] }
    });
  }

  const removeFromCart = (id: string) => {
    if (!user) return;
    setCartItemsByUser(prev => ({
      ...prev,
      [user.username]: (prev[user.username] ?? [])
        .filter((i) => i.id !== id)
    }))
  }

  const isInCart = (id: string) => {
    return cartItems.some(c => c.id === id)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      isInCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)

  return context;
}
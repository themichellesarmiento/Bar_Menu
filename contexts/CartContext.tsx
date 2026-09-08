'use client'
import { CartContextType, CartItem } from "@/types/cart";
import { createContext, ReactNode, useContext, useState } from "react";

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (cartItem: CartItem) => {
    setCartItems((prev) => {
      if (prev.some(i => i.id === cartItem.id)) return prev;
      return [...prev, cartItem]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev => prev.filter(p => p.id !== id)))
  }

  const isInCart = (id: string) => {
    return cartItems.some((c) => c.id === id)
  }

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      isInCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)

  return context;
}
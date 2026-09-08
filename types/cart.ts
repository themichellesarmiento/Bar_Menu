export interface CartItem {
  id: string,
  name: string,
  image: string | null
  category: string | null
}

export interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  isInCart: (id: string) => boolean
  clearCart: () => void
}
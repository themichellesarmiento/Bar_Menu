'use client'
import { useCartContext } from "@/contexts/CartContext";
import { CartContextType } from "@/types/cart";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const { cartItems, removeFromCart } = useCartContext() as CartContextType

  if (cartItems.length === 0) {
    return (
      <div className='p-4 text-center'>
        <p className='font-medium text-lg md:text-xl'>Your cart is empty</p>
        <Link href={'/categories'} className='text-accent-one hover:underline'>Browse drinks</Link>
      </div>
    )
  }
  return (
    <div className='p-4'>
      <h1 className='font-bold text-lg md:text-xl mb-4'>Your order ({cartItems.length})</h1>
      <div className='max-w-xl mx-auto'>
        {cartItems.map(c => (
          <div key={c.id} className='flex items-center gap-4 rounded border border-text-primary/20 p-3'>
            <Link href={`/drink/${c.id}`} className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
              <Image src={c.image ?? '/placeholder.png'} alt={c.name} fill className="object-cover" />
            </Link>
            <Link href={`drink/${c.id}`} className='flex-1'>
              <p className='font-light text-lg'>{c.name}</p>
              <p className='font-light text-base'>{c.category}</p>
            </Link>
            <button onClick={() => removeFromCart(c.id)} className='text-accent-two text-base hover:underline'>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart;
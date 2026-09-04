'use client'

import { useCartContext } from '@/contexts/CartContext';
import { CartContextType } from '@/types/cart';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/cart', label: 'Cart' },
];

const Navigation = () => {
  const pathname = usePathname();
  const { cartItems } = useCartContext() as CartContextType

  return (
    <nav className='text-base md:text-lg p-4'>
      <div className='flex justify-evenly mx-auto'>
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} className={`px-4 py-2 rounded-md transition-colors 
              ${isActive
                ? 'bg-accent-three text-white'
                : 'hover:bg-accent-three/20'
              }`}>
              {label === 'Cart' ? `Cart (${cartItems.length})` : label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
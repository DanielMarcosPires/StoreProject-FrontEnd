import React, { ComponentProps } from 'react'
import Header from '../Header/Header'
import ProductsList from '../ProductsList/ProductsList'
import Cart from '../Cart/Cart'

export default function Body({ className }: ComponentProps<"main">) {
  return (
    <main className={className}>
      <Header className='p-4' />
      <section className='flex'>
        <ProductsList />
        <Cart />
      </section>
    </main>
  )
}

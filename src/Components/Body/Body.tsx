import React, { ComponentProps } from 'react'
import Header from '../Header/Header'
import { ProductCard } from '../ProductCard'
import { FastAPI } from '@/API/Python'
import ProductsList from '../ProductsList/ProductsList'

export default function Body({ className }: ComponentProps<"main">) {

  return (
    <main className={className}>
      <Header className='p-4' />

      <section className='flex'>
        <ProductsList />
        <div></div>
      </section>



    </main>
  )
}

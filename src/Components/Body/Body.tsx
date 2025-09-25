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
        <div className='bg-white w-2/4 full h-[300px] p-4'>
          <h2 className='text-2xl font-bold text-orange-500'>Your cart</h2>
        </div>
      </section>



    </main>
  )
}

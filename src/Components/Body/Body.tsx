import React, { ComponentProps } from 'react'
import Header from '../Header/Header'
import { ProductCard } from '../ProductCard'

export default function Body({className}:ComponentProps<"main">) {
  return (
    <main className={className}>
      <Header className='border'/>
      <ProductCard.index className="flex flex-col items-center border w-[300px]">
       <ProductCard.Background src="/images/image-brownie-desktop.jpg" alt=''/>
       <ProductCard.Description>
         <span>Waffle</span>
       </ProductCard.Description>
      </ProductCard.index>
    </main>
  )
}

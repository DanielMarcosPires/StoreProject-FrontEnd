import React, { ComponentProps } from 'react'
import AddToCard from '../AddToCard/AddToCard'


interface BackgroundProps extends ComponentProps<"img"> {
  QuantityMax: number,
  InfoProduct: number
}
export default function Background({ QuantityMax, InfoProduct, ...props }: BackgroundProps) {
  return <div className='flex flex-col items-center relative'>
    <img className='rounded-2xl' {...props} />
    <AddToCard Quantity={QuantityMax} InfoProduct={InfoProduct}>Add To Card</AddToCard>
  </div>
}

import React, { ComponentProps } from 'react'
import AddToCard from '../AddToCard/AddToCard'


interface BackgroundProps extends ComponentProps<"img">{
  QuantityMax: number
}
export default function Background({ QuantityMax, ...props}: BackgroundProps) {
  return <div className='flex flex-col items-center relative'>
    <img className='rounded-2xl' {...props} />
    <AddToCard Quantity={QuantityMax}>Add To Card</AddToCard>
  </div>
}

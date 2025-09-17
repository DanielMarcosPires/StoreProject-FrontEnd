import React, { ComponentProps } from 'react'
import AddToCard from '../AddToCard/AddToCard'

export default function Description({children}:ComponentProps<"div">) {
  return (
    <div className='flex justify-center'>
        <AddToCard>Add to Card</AddToCard>
        <>{children}</>
    </div>
  )
}

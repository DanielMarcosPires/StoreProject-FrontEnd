import React, { ComponentProps } from 'react'
import {AddToCard} from '../AddToCard/Index'


export default function Description({children, className}:ComponentProps<"div">) {
  return (
    <div className={className}>
        {children}
    </div>
  )
}

import React, { ComponentProps } from 'react'

export default function Header({className}:ComponentProps<"main">) {
  return (
    <header className={className}>
      <h1 className='text-2xl font-bold'>Desserts</h1>
    </header>
  )
}

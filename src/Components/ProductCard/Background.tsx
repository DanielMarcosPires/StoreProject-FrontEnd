import React, { ComponentProps } from 'react'

export default function Background({...props}:ComponentProps<"img">) {
  return <img {...props}/>
}

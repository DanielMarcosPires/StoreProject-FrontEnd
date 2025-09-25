"use client"
import { FastAPI } from '@/API/Python';
import { CircleMinus, CirclePlus } from 'lucide-react';
import React, { ComponentProps, useEffect, useState } from 'react'

interface AddToCard extends ComponentProps<"div"> {
    Quantity: number,
    InfoProduct:number
}

export default function AddToCard({ children,InfoProduct: IDproduct, Quantity }: AddToCard) {
    const [quantity, setQuantity] = useState(0);
    
    function ButtonIcon({ children, ...props }: ComponentProps<"button">) {
        return (<button className='cursor-pointer' {...props}>{children}</button>)
    }
      
    function increment(max: number) {
        if (quantity < max) {
            new FastAPI().postCart(IDproduct,1)
            return setQuantity(quantity + 1)
        }
        return null
    }
    function decrement() {
        if (quantity > 0) {
            new FastAPI().deleteCart(IDproduct,1)
            return setQuantity(quantity - 1)
        }
        return null
    }
    return (
        <div className={"flex items-center w-[140px] p-2 rounded-2xl shadow-sm absolute -bottom-4 " + (quantity != 0 ? "bg-orange-700 text-white justify-between" : "bg-white justify-center")}>
            {
                quantity != 0 ?
                    <>
                        <ButtonIcon onClick={() => decrement()}><CircleMinus /></ButtonIcon>
                        <strong>{quantity} de {Quantity}</strong>
                        <ButtonIcon onClick={() => increment(Quantity)}><CirclePlus /></ButtonIcon>
                    </> :
                    <button className='text-center cursor-pointer' onClick={() => increment(Quantity)}>{children}</button>
            }
        </div>
    )
}

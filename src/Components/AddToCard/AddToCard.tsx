"use client"
import { CircleMinus, CirclePlus } from 'lucide-react';
import React, { ComponentProps, useState } from 'react'

export default function AddToCard({children}:ComponentProps<"div">) {
    const [quantity, setQuantity] = useState(0);
    function ButtonIcon({children, ...props}:ComponentProps<"button">) {
        return (<button {...props}>{children}</button>)
    }
    return (
        <div className={"flex items-center w-2/4 p-2 rounded-2xl relative bottom-5 " + (quantity != 0 ? "bg-orange-700 text-white justify-between" : "bg-white justify-center")}>
            {
                quantity != 0 ?
                    <>
                        <ButtonIcon onClick={() => setQuantity(quantity - 1)}><CircleMinus/></ButtonIcon>
                        <strong>{quantity}</strong>
                        <ButtonIcon onClick={() => setQuantity(quantity + 1)}><CirclePlus/></ButtonIcon>
                    </> :
                    <button className='text-center' onClick={() => setQuantity(quantity + 1)}>{children}</button>
            }
        </div>
    )
}

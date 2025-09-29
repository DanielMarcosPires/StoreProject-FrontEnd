"use client"

import { useProduct } from "@/Context/Product"
import { useState, useEffect } from "react"
interface itemCardSchema {
    Produto_id: number
    categoria: string
    id: number
    name: string
    price: number
    quantity: number
    cartQuantity:number
}


function ItemCart() {
    const {cart, removeFromCart} = useProduct()

    return (
        <ul>

             {cart.map((item: any) => (
                <li key={item.id} className='flex justify-between border-b py-2'>
                    <div>
                        <header>
                            <h2 className='font-bold'>
                                {item.name} 
                                <strong className='font-bold text-orange-500'> x{item.cartQuantity}</strong>
                            </h2>
                        </header>
                        <footer className='flex gap-2'>
                            <span className='opacity-75'>Price: ${item.price.toFixed(2)}</span>
                            <span className='font-semibold'>
                                Total: ${(item.price * item.cartQuantity).toFixed(2)}
                            </span>
                        </footer>
                    </div>
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className='relative cursor-pointer right-5 text-red-500 hover:text-red-700'
                    >
                        X
                    </button>
                </li>
            ))}


            {/* Antes */}
            {/* {cart.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.name === value.name // <- critério de unicidade
                ))
            ).map((value: itemCardSchema, index) => (
                <li key={index} className='flex justify-between border-b'>
                    <div>
                        <header>
                            <h2 className='font-bold'>{value.name} <strong className='font-bold text-orange-500'>x{value.cartQuantity}</strong></h2>
                        </header>
                        <footer className='flex gap-2'>
                            <span className='opacity-75'>Price: ${value.price.toFixed(2)}</span>
                        </footer>
                    </div>
                    <button className='relative cursor-pointer right-5'>X</button>
                </li>
            ))
            } */}
        </ul>
    );
}
export default function Cart() {
    const { cart } = useProduct()

    const total = cart.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);

    return (

         <div className='bg-white w-2/4 full h-[670px] p-8 shadow inset-shadow-2xs'>
            <h2 className='text-2xl font-bold text-orange-500'>Your cart</h2>
            <div className="overflow-y-scroll h-[70%]">
                <ItemCart />
            </div>
            {cart.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-orange-500">${total.toFixed(2)}</span>
                    </div>
                </div>
            )}
        </div>

        // ======= Antes
        // <div className='bg-white w-2/4 full h-[670px] p-8 shadow inset-shadow-2xs'>
        //     <h2 className='text-2xl font-bold text-orange-500'>Your cart</h2>
        //     <ul className="overflow-y-scroll h-[80%]">
        //         <ItemCart />
        //     </ul>
        // </div>
    )
}

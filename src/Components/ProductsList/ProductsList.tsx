import React from 'react'
import { ProductCard } from '../ProductCard'
import { FastAPI } from '@/API/Python'

interface productSchema {
    id: number,
    quantity: number,
    name: string,
    category: string,
    image: string,
    price: number
}

async function Products() {
    let response = new FastAPI()
    let responseData: [] = await response.getProducts({ searchID: "" })
    return (
        <ul className='grid grid-cols-3 gap-4 flex-wrap'>
            {
                responseData.map((value: productSchema) => (
                    <li key={value.name}>
                        <ProductCard.index className="flex gap-5 flex-col items-center rounded-2xl shadow-lg p-4 w-[250px] h-[320px] ">
                            <ProductCard.Background
                                InfoProduct={value.id}
                                QuantityMax={value.quantity}
                                src={`/images/${value.image ? `${value.image}.jpg` : "default.svg"}`}
                                alt={value.name}
                            />
                            <ProductCard.Description className='flex justify-end flex-col w-full h-full' >
                                <span className='opacity-75'>{value.category}</span>
                                <h2 className='font-bold'>{value.name}</h2>
                                <p className='text-orange-600 font-bold'>${value.price.toFixed(2)}</p>
                            </ProductCard.Description>
                        </ProductCard.index>
                    </li>
                ))
            }
        </ul>
    )
}

export default function ProductsList() {
    return (
        <div className='flex p-4 w-full'>
            <Products />
        </div>
    )
}

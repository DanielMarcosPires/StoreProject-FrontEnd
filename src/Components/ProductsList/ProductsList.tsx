import React from 'react'
import { ProductCard } from '../ProductCard'
import { FastAPI } from '@/API/Python'


async function Products() {
    let response = new FastAPI()

    response.getProducts().then(res => console.log(res.data))

    return <ul className='grid grid-cols-3 gap-4 flex-wrap'>
        {await response.getProducts().then(res => res.data.map((value: any, index: number) => <li key={index}>
            <ProductCard.index className="flex gap-5 flex-col items-center w-[230px] h-[250px] ">
                <ProductCard.Background QuantityMax={value.quantity} src={`/images/${value.image ? `${value.image}.jpg`:"default.svg"}`} alt={value.Name} />
                <ProductCard.Description className='flex justify-end flex-col w-full h-full' >
                    <span className='opacity-75'>{value.category}</span>
                    <h2 className='font-bold'>{value.name}</h2>
                    <p className='text-orange-600 font-bold'>${value.price}</p>
                </ProductCard.Description>
            </ProductCard.index>
        </li>
        ))}
    </ul>
}

export default function ProductsList() {
    return (
        <div className='flex p-4 w-full'>
            <Products />
        </div>
    )
}

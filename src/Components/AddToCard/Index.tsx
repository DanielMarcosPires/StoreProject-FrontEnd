"use client"
import { FastAPI } from '@/API/Python';
import { CircleMinus, CirclePlus } from 'lucide-react';
import React, { ComponentProps, useEffect, useState } from 'react'
import { productSchema } from '../ProductsList/ProductsList';
import { useProduct } from '@/Context/Product';

interface AddToCard extends ComponentProps<"div"> {
    Quantity: number,
    InfoProduct: productSchema
}

export function AddToCard({ children, InfoProduct: IDproduct, Quantity }: AddToCard) {
    const { updateProduct, addToCart, cart, products} = useProduct();

    function getCartQuantity(){
        const cartItem = cart.find(item => item.id === IDproduct.id);
        return cartItem ? cartItem.cartQuantity : 0;
    }

    function getCurrentStock(){
        const currentProduct = products.find(p => p.id === IDproduct.id);
        return currentProduct ? currentProduct.quantity : IDproduct.quantity;
    }

    async function increment() {
        const currentCartQuantity = getCartQuantity();
        const currentStock = getCurrentStock();

        console.log("----------------------------");
        console.log("Estoque atual do produto:", currentStock);
        console.log("Quantidade atual no carrinho:", currentCartQuantity);
        console.log("Estoque original:", IDproduct.quantity);
        console.log("Pode adicionar mais?", currentStock > 0);
        console.log("----------------------------");


        if(currentStock > 0){

            addToCart(IDproduct);

            try {
                const api = new FastAPI();
                console.log({
                    info: IDproduct,
                    quantity: currentCartQuantity + 1
                });
            } catch (error) {
                console.error("[increment] Erro ao sincronizar", error);
            }
        } else {
            console.log("❌ Produto fora de estoque!");
        }
    }
    
    return (
        <div onClick={() => increment()} className={"flex items-center justify-center w-[140px] p-2 rounded-2xl shadow-sm absolute -bottom-4 bg-white transition active:bg-orange-700 active:text-white "}>
            <button className='text-center cursor-pointer'>{children}</button>
        </div>
    )
}
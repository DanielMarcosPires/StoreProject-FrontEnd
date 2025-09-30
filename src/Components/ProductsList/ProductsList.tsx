"use client"
import React, { useEffect, useState } from 'react'
import { ProductCard } from '../ProductCard'
import { io } from 'socket.io-client'
import { FastAPI } from '@/API/Python'
import { useProduct } from '@/Context/Product'

export interface productSchema {
    id: number,
    quantity: number,
    name: string,
    category: string,
    image: string,
    price: number
}

interface ProductsListProps {
    productList?: productSchema[],
}


export default function ProductsList({ productList }: ProductsListProps) {
    const {products, setProducts} = useProduct()


   async function fetchProducts () {
        try {
            const response = new FastAPI()
            const responseData: productSchema[] = await response.getProducts({ searchID: "" })
            setProducts(responseData)
        } catch (error) {
            console.error("Erro ao buscar produtos:", error)
        }
    }

    function setupWebSocket() {
        const socket = new WebSocket("ws://127.0.0.1:8000/api/ws");
        
        socket.onopen = () => {
            console.log("Conectado ao servidor WebSocket");
        };

        socket.onmessage = (event) => {
            console.log("Mensagem recebida:", event.data);
            handleWebSocketMessage(event.data);
        };

        socket.onclose = () => {
            console.log("Desconectado do servidor WebSocket");
        };

        socket.onerror = (error) => {
            console.error("Erro no WebSocket:", error);
        };

        return socket;
    }

    function handleWebSocketMessage(data: string) {
        try {
            const updatedProduct = JSON.parse(data);
            updateProductInList(updatedProduct);
        } catch (error) {
            console.error("Erro ao processar mensagem do WebSocket:", error);
        }
    }

    function updateProductInList(updatedProduct: productSchema) {
             setProducts((prevProducts) => {
            const index = prevProducts.findIndex(p => p.id === updatedProduct.id);
            if (index > -1) {
                const newProducts = [...prevProducts];
                newProducts[index] = updatedProduct;
                return newProducts;
            } else {
                return [...prevProducts, updatedProduct];
            }
        });
    }


     useEffect(() => {
        fetchProducts();
        const socket = setupWebSocket();
        
        return () => {
            socket.close();
        };
    }, [setProducts]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         let response = new FastAPI()
    //         let responseData: productSchema[] = await response.getProducts({ searchID: "" })
    //         setProducts(responseData)
    //     }
    //     fetchProducts()
    //     const socket = new WebSocket("ws://127.0.0.1:8000/api/ws");

    //     socket.onopen = () => {
    //         console.log("Conectado ao servidor WebSocket");
    //     };

    //     socket.onmessage = (event) => {
    //         console.log("Mensagem recebida:", event.data);

    //         // Se seu backend enviar JSON, faça parse aqui
    //         const updatedProduct = JSON.parse(event.data);
    //         setProducts((prevProducts) => {
    //             const index = prevProducts.findIndex(p => p.id === updatedProduct.id);
    //             if (index > -1) {
    //                 const newProducts = [...prevProducts];
    //                 newProducts[index] = updatedProduct;
    //                 return newProducts;
    //             } else {
    //                 return [...prevProducts, updatedProduct];
    //             }
    //         });
    //     };

    //     socket.onclose = () => {
    //         console.log("Desconectado do servidor WebSocket");
    //     };

    //     return () => {
    //         socket.close();
    //     };
    // }, []);


    return (
        <div className='flex p-4 w-full'>
            <ul className='grid grid-cols-3 gap-4 flex-wrap'>
                {
                    products.map((value: productSchema) => (
                        <li key={value.id}>
                            <ProductCard.index className="flex gap-5 flex-col items-center rounded-2xl shadow-lg p-4 w-[250px] h-[320px] ">
                                <ProductCard.Background
                                    InfoProduct={value}
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
        </div>
    )
}

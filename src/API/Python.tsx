import axios from "axios"

interface FastAPI_ConnectExistents {
    gemini_API: string,
    porducts_API: string,
    cart_API: string
}

interface postCard {
    product_id: number,
    quantidade: number
}

interface getProducts {
    searchID: string
}
interface products {
    id:number,
    name:string,
    category:string,
    value:number
}
type payloadProducts = Omit<products,'id'>

export class FastAPI {
    private instance = axios.create({
        baseURL: "http://127.0.0.1:8000",
        timeout: 1000,
        headers: { 'X-Custom-Header': 'foobar' }
    })
    async getRoot() {
        try {
            return this.instance.get("/api/gemini").then(res => res)
        } catch (error) {
            console.error(error)
        }
    }
    async getProducts({ searchID }: getProducts) {
        try {
            const { data } = await this.instance.get("/api/products", {
                params: { searchID:"" }
            })
            return data
        } catch (error) {
            console.error(error)
        }
    }
    async viewCart() {
        try {
            const { data } = await this.instance.get("/api/cart")
            return data
        } catch (error) {
            console.error(error)
        }
    }
    async postCart(id: number, quantidade: number) {
        try {
            const { data } = await this.instance.post("/api/cart", {
                product_id: id,
                quantidade: quantidade
            } as postCard)

            return data
        } catch (error) {
            console.error(error)
        }
    }
    async deleteCart(id: number, quantidade: number) {
        try {
            const { data } = await this.instance.delete("/api/cart", {
                data: {
                    product_id: id,
                    quantidade: quantidade
                } as postCard
            })
            return data
        } catch (error) {
            console.error(error)
        }
        return
    }
}


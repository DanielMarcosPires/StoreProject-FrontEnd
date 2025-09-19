import axios from "axios"

interface FastAPI_ConnectExistents {
    Root: string,
    ChatBot: string,
    RegisterProducts: string,
    getProducts: string,
    deleteProducts: string
}

export class FastAPI {
    private URL_Connection = "http://127.0.0.1:8000"
    private Connections: FastAPI_ConnectExistents = {
        Root: "/api/gemini",
        ChatBot: "/api/gemini",
        RegisterProducts: "/api/products",
        getProducts: "/api/products",
        deleteProducts: "/api/products"
    }


    async getRoot() {
        let data
        try {
            return axios.get(this.URL_Connection + this.Connections.Root).then(res => res.data.message)
        } catch (error) {
            console.error(error)
        }
    }
    async getProducts(){

        return axios.get(this.URL_Connection + this.Connections.getProducts).then(res=>res)
    }
}




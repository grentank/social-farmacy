 import { axiosInstance } from "../shared/axiosInstance";

 const { VITE_TARGET } = import.meta.env;

 export class SaleApi{

    static async getAll() {
        const  {data}  = await axiosInstance.get("/sale");
        console.log("🚀 ~ SaleA111111111pi ~ getAll ~ data:", data)
        return data.data
    }

    static async getOne(id) {
        const { data } = await axiosInstance.get(`/sale/${id}`)
        return data
     }

     static async createSale(id) {
        const { data } = await axiosInstance.put(`/sale/${id}`)
        return data
     }

     static async deleteSale(id) {
        const { data } =  await axiosInstance.delete(`/sale/${id}`) 
        return data
     }

 }
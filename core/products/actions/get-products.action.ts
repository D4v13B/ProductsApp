import { API_URL, productApi } from "@/core/api/productsApi"
import { type ProductResponse } from "../interfaces/product.interface";

export const getProducts = async(limit = 20, offset = 0 ) : Promise<ProductResponse[]> => {

   try {

      const {data} = await productApi<ProductResponse[]>("/products", {
         params: {
            limit,
            offset
         }
      })

      return data.map(product => ({
         ...product,
         images: product.images.map(
            image => `${API_URL}/files/product/${image}` 
         )
      }))
      
   } catch (error) {
      console.log(error)
      throw new Error("Unable to load products")
   }
}


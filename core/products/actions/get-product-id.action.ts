import { API_URL, productApi } from "@/core/api/productsApi"
import { type ProductResponse } from "../interfaces/product.interface"

export const getProductById = async (id: string): Promise<ProductResponse> => {
   try {
      const { data } = await productApi.get<ProductResponse>(`/products/${id}`)

      return {
         ...data,
         images: data.images.map(
            (image) => `${API_URL}/files/product/${image}`
         ),
      }
   } catch (error) {
      throw new Error("No encontrado")
   }
}

import { API_URL, productApi } from "@/core/api/productsApi"
import { Gender, type ProductResponse } from "../interfaces/product.interface"

const emprtyProduct: ProductResponse = {
   id: '',
   title: "Nuevo Producto",
   description: "",
   price: 0,
   images: [],
   slug: "",
   gender: Gender.Men,
   sizes: [],
   stock: 0,
   tags: []
}

export const getProductById = async (id: string): Promise<ProductResponse> => {

   if(id === 'new') return emprtyProduct

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

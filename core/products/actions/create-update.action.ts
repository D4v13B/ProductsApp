import { productApi } from "@/core/api/productsApi";
import { ProductResponse } from "../interfaces/product.interface";


export const updateCreateProduct = (product:Partial<ProductResponse>) => { //Partial, lo hace parcial ?

   product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock)
   product.price = isNaN(Number(product.price)) ? 0 : Number(product.price)

   if(product.id && product.id !== "new"){
      return updateProduct(product)
   }

   return createProduct(product)
}

const updateProduct = async (product: Partial<ProductResponse>) => {

   const {id, images = [], user, ...rest} = product
   
   try {
      const {data} = await productApi.patch<ProductResponse>(`/products/${id}`, {
         // TODO: images
         ...rest
      })

      return data

   } catch (error) {
      console.log(error)
      throw new Error("Error al actualizar el producto")
   }
}

const createProduct = async (product: Partial<ProductResponse>) => {
   const {id, images = [], user, ...rest} = product
   
   try {
      const {data} = await productApi.post<ProductResponse>(`/products`, {
         // TODO: images
         ...rest
      })

      return data

   } catch (error) {
      console.log(error)
      throw new Error("Error al actualizar el producto")
   }
}


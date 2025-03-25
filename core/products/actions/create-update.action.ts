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

const prepareImages = async (images:string[]):Promise<string[]> => {

   const fileImages = images.filter( image => image.startsWith('file'))
   const currentImages = images.filter( image => !image.startsWith('file'))

   if(fileImages.length > 0){

      const uploadPromises = fileImages.map( e => uploadImage(e))
      const uploadedImages = await Promise.all(uploadPromises)

      currentImages.push(...uploadedImages)
   }

   return currentImages.map(img => img.split("/").pop()!)
}

const uploadImage = async(image: string):Promise<string> => {

   // const FormData = global.FormData

   const formData = new FormData() as any

   formData.append('file', {
      uri: image,
      type: 'image/jpeg',
      name: image.split("/").pop()
   })

   const {data} = await productApi.post<{image:string}>(
      "/files/product",
      formData,
      {
         headers: {
            "Content-Type": "multipart/form-data"
         }
      }
   )

   return data.image
}

const updateProduct = async (product: Partial<ProductResponse>) => {

   const {id, images = [], user, ...rest} = product
   
   try {

      const checkedImages = await prepareImages(images)

      const {data} = await productApi.patch<ProductResponse>(`/products/${id}`, {
         // TODO: images
         ...rest,
         images: checkedImages
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

      const checkedImages = await prepareImages(images)

      const {data} = await productApi.post<ProductResponse>(`/products`, {
         // TODO: images
         ...rest,
         images: checkedImages
      })

      return data

   } catch (error) {
      console.log(error)
      throw new Error("Error al actualizar el producto")
   }
}


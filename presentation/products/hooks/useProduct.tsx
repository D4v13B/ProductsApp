// import { updateCreateProduct } from "@/core/products/actions/create-update.action"
import { updateCreateProduct } from "@/core/products/actions/create-update.action"
import { getProductById } from "@/core/products/actions/get-product-id.action"
import { ProductResponse } from "@/core/products/interfaces/product.interface"
import { useCameraStore } from "@/presentation/store/useCameraStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { Alert } from "react-native"

const useProduct = (productId: string) => {

   const {clearImages} = useCameraStore()

   const queryClient = useQueryClient()
   const productIdRef = useRef(productId)
   
   const productQuery = useQuery({
      queryKey: ["products", productId],
      queryFn: () => getProductById(productId),
      staleTime: 1000 * 60 * 60,
   })

   // Mutacion
   const productMutation = useMutation({
      mutationFn: async (data: ProductResponse) => {

         return updateCreateProduct({
            ...data,
            id: productIdRef.current
         })
      },

      onSuccess: (data: ProductResponse) => {

         productIdRef.current = data.id

         clearImages()

         queryClient.invalidateQueries({
            queryKey: ['products', 'infinite']
         })

         queryClient.invalidateQueries({
            queryKey: ['products', data.id]
         })

         Alert.alert(
            "Producto guardado",
            `${data.title}se guardo correctamente`
         )
      },
   })

   // Mantener el id del producto en caso de ser uno uno

   return {
      productQuery,
      productMutation,
   }
}
export default useProduct

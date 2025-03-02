import { getProductById } from "@/core/products/actions/get-product-id.action"
import { useQuery } from "@tanstack/react-query"

const useProduct = (productId: string) => {

   const productQuery = useQuery({
      queryKey: ["products", productId],
      queryFn: () => getProductById(productId),
      staleTime: 1000*60*60
   })

   // Mutacion

   // Mantener el id del producto en caso de ser uno uno

   
   return {
      productQuery
   }
}
export default useProduct
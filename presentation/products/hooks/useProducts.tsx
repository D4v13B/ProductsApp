import { getProducts } from "@/core/products/actions/get-products.action"
import { useInfiniteQuery } from "@tanstack/react-query"


const useProduct = () => {

   const productsQuery = useInfiniteQuery({
      queryKey: ['products','infinite'],
      queryFn: ({pageParam}) => getProducts(20, pageParam * 20),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPage) => allPage.length,
      
      staleTime: 1000 * 60 * 60, //1 hora,

   })

   return {
      productsQuery,

      // Methods
      loadNextPage: productsQuery.fetchNextPage
   }
}
export default useProduct

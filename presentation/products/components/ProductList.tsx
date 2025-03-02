import { useState } from "react"
import { FlatList, RefreshControl } from "react-native"

import { ProductResponse } from "@/core/products/interfaces/product.interface"
import { ProductCard } from "./ProdutCard"
import { useQueryClient } from "@tanstack/react-query"
import { STAGE } from "@/core/api/productsApi"

interface Props {
   products?: ProductResponse[]
   loadNextPage: () => void
}

const ProductList = ({ products, loadNextPage }: Props) => {
   const [isRefreshing, setIsRefreshing] = useState(false)
   const queryClient = useQueryClient()

   const onPullToRefresh = async () => {
      setIsRefreshing(true)
      
      if(STAGE == 'dev'){
         await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      queryClient.invalidateQueries({
         queryKey: ['products', 'infinite']
      })

      setIsRefreshing(false)
   }

   return (
      <FlatList
         numColumns={2}
         data={products}
         keyExtractor={(item) => item.id}
         renderItem={({ item }) => <ProductCard product={item} />}
         // Disparar procedimiento
         onEndReached={loadNextPage}
         onEndReachedThreshold={0.8}
         // Mostrar barra
         showsVerticalScrollIndicator={false}

         refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh}/>
         }
      />
   )
}
export default ProductList

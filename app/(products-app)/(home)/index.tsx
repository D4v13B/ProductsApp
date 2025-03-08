import { ActivityIndicator, View } from "react-native"
import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import useProduct from "@/presentation/products/hooks/useProducts"
import ProductList from "@/presentation/products/components/ProductList"
import { FAB } from "@/presentation/theme/components/FAB"
import { router } from "expo-router"

const HomeScreen = () => {
   const { productsQuery, loadNextPage } = useProduct()
   const primary = useThemeColor({}, "primary")

   if (productsQuery.isLoading) {
      return (
         <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
         >
            <ActivityIndicator />
         </View>
      )
   }

   return (
      <View style={{ paddingTop: 10 }}>
         <ProductList
            products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
            loadNextPage={loadNextPage}
         />

         <FAB
            iconName="add-outline"
            onPress={() => router.push("/(products-app)/(home)/product/new")}
         />
      </View>
   )
}
export default HomeScreen

import ProductImages from "@/presentation/products/components/ProductImages"
import useProduct from "@/presentation/products/hooks/useProduct"
import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput"
import { ThemedView } from "@/presentation/theme/components/ThemedView"
import { Ionicons } from "@expo/vector-icons"
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router"
import { useEffect } from "react"
import { View, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
const ProducScreen = () => {

   const {id} = useLocalSearchParams()
   const navigation = useNavigation()

   const {productQuery} = useProduct(`${id}`)

   const primary = useThemeColor({}, "primary")

   useEffect(() => {
      // TODO: Colocar el nombre del producto

      navigation.setOptions({
         headerRight: () => (
            <Ionicons name="camera-outline" size={30} color={primary} />
         ),
      })
   }, [])

   useEffect(() => {
     if(productQuery.data){
      navigation.setOptions({
         title:  productQuery.data.title
      })
     }
   }, [productQuery.data])
   

   if(productQuery.isLoading){
      return (
         <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator/>
         </View>
      )
   }

   if(!productQuery.data){
      return <Redirect href={"/"}/>
   }

  const product = productQuery.data!

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS == "ios" ? "padding" : undefined}
      >
         <ScrollView>
            {/* TODO: Product images */}
            <ProductImages images={product.images}/>


            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
               <ThemedTextInput
                  placeholder="Titulo"
                  style={{ marginVertical: 5 }}
               />

               <ThemedTextInput
                  placeholder="Slug"
                  style={{ marginVertical: 5 }}
               />

               <ThemedTextInput
                  placeholder="Description"
                  multiline
                  numberOfLines={5}
                  style={{ marginVertical: 5 }}
               />
            </ThemedView>

            <ThemedView style={{
               marginHorizontal: 10,
               marginVertical: 5,
               flexDirection: "row",
               gap: 10
            }}>

               <ThemedTextInput placeholder="Preio" style={{flex: 1}}/>
               <ThemedTextInput placeholder="Inventario" style={{flex: 1}}/>
               
            </ThemedView>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}
export default ProducScreen

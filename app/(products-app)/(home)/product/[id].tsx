import { useEffect, useState } from "react"
import {
   View,
   Text,
   KeyboardAvoidingView,
   Platform,
   ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import {
   Redirect,
   router,
   useLocalSearchParams,
   useNavigation,
} from "expo-router"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"

import { Formik } from "formik"

import { Size } from "@/core/products/interfaces/product.interface"
import ProductImages from "@/presentation/products/components/ProductImages"
import useProduct from "@/presentation/products/hooks/useProduct"
import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import ThemeButton from "@/presentation/theme/components/ThemeButton"
import ThemedButtonGroup from "@/presentation/theme/components/ThemeButtonGroup"
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput"
import { ThemedView } from "@/presentation/theme/components/ThemedView"
import MenuIconButton from "@/presentation/theme/components/MenuIconButton"
import { useCameraStore } from "@/presentation/store/useCameraStore"

const ProducScreen = () => {

   const {selectedImages, clearImages} = useCameraStore()

   useEffect(() => {
      return () => {
         clearImages()
      }
   }, [])

   const { id } = useLocalSearchParams()
   const navigation = useNavigation()
   const [refreshing, setRefreshing] = useState(false)

   const { productQuery, productMutation } = useProduct(`${id}`)

   const primary = useThemeColor({}, "primary")

   useEffect(() => {
      // TODO: Colocar el nombre del producto

      navigation.setOptions({
         headerRight: () => (
            <MenuIconButton
               onPress={() => router.push("/camera")}
               icon="camera-outline"
            />
         ),
      })
   }, [])

   useEffect(() => {
      if (productQuery.data) {
         navigation.setOptions({
            title: productQuery.data.title,
         })
      }
   }, [productQuery.data])

   if (productQuery.isLoading) {
      return (
         <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
         >
            <ActivityIndicator />
         </View>
      )
   }

   if (!productQuery.data) {
      return <Redirect href={"/"} />
   }

   const onRefresh = async () => {
      setRefreshing(true)
      await productQuery.refetch()
      setRefreshing(false)
   }

   const product = productQuery.data!

   return (
      <Formik
         initialValues={product}
         onSubmit={(productLike) => productMutation.mutate({
            ...productLike,
            images: [...productLike.images, ...selectedImages]
         })}
      >
         {({ values, handleSubmit, handleChange, setFieldValue }) => (
            <KeyboardAvoidingView
               behavior={Platform.OS == "ios" ? "padding" : undefined}
            >
               <ScrollView
                  refreshControl={
                     <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                     />
                  }
               >
                  {/* TODO: Product images */}
                  <ProductImages images={[...product.images, ...selectedImages]} />

                  <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
                     <ThemedTextInput
                        placeholder="Titulo"
                        style={{ marginVertical: 5 }}
                        value={values.title}
                        onChangeText={handleChange("title")}
                     />

                     <ThemedTextInput
                        placeholder="Slug"
                        style={{ marginVertical: 5 }}
                        value={values.slug}
                        onChangeText={handleChange("slug")}
                     />

                     <ThemedTextInput
                        placeholder="Description"
                        multiline
                        numberOfLines={5}
                        style={{ marginVertical: 5 }}
                        value={values.description}
                        onChangeText={handleChange("description")}
                     />
                  </ThemedView>

                  <ThemedView
                     style={{
                        marginHorizontal: 10,
                        marginVertical: 5,
                        flexDirection: "row",
                        gap: 10,
                     }}
                  >
                     <ThemedTextInput
                        placeholder="Precio"
                        style={{ flex: 1 }}
                        keyboardType="decimal-pad"
                        value={values.price.toString()}
                        onChangeText={handleChange("price")}
                     />
                     <ThemedTextInput
                        placeholder="Inventario"
                        style={{ flex: 1 }}
                        keyboardType="phone-pad"
                        value={values.stock.toString()}
                        onChangeText={handleChange("stock")}
                     />
                  </ThemedView>

                  <ThemedView
                     style={{
                        marginHorizontal: 10,
                     }}
                  >
                     <ThemedButtonGroup
                        options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                        selectedOptions={values.sizes}
                        onSelect={(selectedSize) => {
                           const newSizesValues = values.sizes.includes(
                              selectedSize as Size
                           )
                              ? values.sizes.filter((s) => s !== selectedSize)
                              : [...values.sizes, selectedSize]

                           setFieldValue("sizes", newSizesValues)
                        }}
                     />

                     <ThemedButtonGroup
                        options={["kid", "men", "women", "unisex"]}
                        selectedOptions={[values.gender]}
                        onSelect={(selectedOption) =>
                           setFieldValue("gender", selectedOption)
                        }
                     />

                     {/* Button para guardar */}
                     <View
                        style={{
                           marginHorizontal: 10,
                           marginBottom: 50,
                           marginTop: 20,
                        }}
                     >
                        <ThemeButton
                           icon="save-outline"
                           onPress={() => handleSubmit()}
                        >
                           Guardar
                        </ThemeButton>
                     </View>
                  </ThemedView>
               </ScrollView>
            </KeyboardAvoidingView>
         )}
      </Formik>
   )
}
export default ProducScreen

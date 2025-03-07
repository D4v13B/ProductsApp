import { Size } from "@/core/products/interfaces/product.interface"
import ProductImages from "@/presentation/products/components/ProductImages"
import useProduct from "@/presentation/products/hooks/useProduct"
import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import ThemeButton from "@/presentation/theme/components/ThemeButton"
import ThemedButtonGroup from "@/presentation/theme/components/ThemeButtonGroup"
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput"
import { ThemedView } from "@/presentation/theme/components/ThemedView"
import { Ionicons } from "@expo/vector-icons"
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router"
import { Formik } from "formik"
import { useEffect } from "react"
import {
   View,
   Text,
   KeyboardAvoidingView,
   Platform,
   ActivityIndicator,
} from "react-native"
import { ScrollView } from "react-native-gesture-handler"
const ProducScreen = () => {
   const { id } = useLocalSearchParams()
   const navigation = useNavigation()

   const { productQuery } = useProduct(`${id}`)

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

   const product = productQuery.data!

   return (
      <Formik
         initialValues={product}
         onSubmit={(productLike) => console.log(productLike)}
      >
         {({ values, handleSubmit, handleChange, setFieldValue }) => (
            <KeyboardAvoidingView
               behavior={Platform.OS == "ios" ? "padding" : undefined}
            >
               <ScrollView>
                  {/* TODO: Product images */}
                  <ProductImages images={values.images} />

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

                           const newSizesValues = values.sizes.includes(selectedSize as Size) ? values.sizes.filter(s => s !== selectedSize) : [...values.sizes, selectedSize]

                           setFieldValue('sizes', newSizesValues)
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

import { View, Image } from "react-native"
import { FlatList } from "react-native-gesture-handler"

interface Props {
   images: string[]
}

const ProductImages = ({ images }: Props) => {
   if (images.length == 0) {
      return (
         <View
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center"
            }}
         >
            <Image
               source={require("../../../assets/images/no-product-image.png")}
               style={{width: 300, height: 300}}
            />
         </View>
      )
   }

   return (
      <FlatList
         data={images}
         horizontal
         keyExtractor={(item) => item}
         showsHorizontalScrollIndicator={false}
         renderItem={({ item }) => (
            <Image
               source={{ uri: item }}
               style={{
                  width: 300,
                  height: 300,
                  marginHorizontal: 7,
                  borderRadius: 5,
               }}
            />
         )}
      />
   )
}
export default ProductImages

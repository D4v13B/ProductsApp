import { View, Image } from "react-native"
import { FlatList } from "react-native-gesture-handler"

interface Props {
   images: string[]
}

const ProductImages = ({ images }: Props) => {
   if (images.length == 0) {
      return (
         <View>
            <Image
               source={require("../../../assets/images/no-product-image.png")}
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

import { View} from "react-native"
import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import { ThemedText } from "@/presentation/theme/components/ThemedText"

const HomeScreen = () => {

   const primary = useThemeColor({}, "primary")

   return (
      <View style={{paddingTop:100, paddingHorizontal:20}}>
         <ThemedText style={{fontFamily: "KanitBold", color: primary}}>HomeScreen</ThemedText>
         <ThemedText style={{fontFamily: "KanitRegular", color: primary}}>HomeScreen</ThemedText>
         <ThemedText style={{fontFamily: "KanitThin", color: primary}}>HomeScreen</ThemedText>
      </View>
   )
}
export default HomeScreen

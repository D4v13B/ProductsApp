import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import { useAuthStore } from "../store/useAuthStore"
const LogoutIconButton = () => {

   const primary = useThemeColor({}, "primary")
   const {logout} = useAuthStore()

   function handleLogout() {
      logout()
      console.log("Hola")
   }

   return (
      <TouchableOpacity style={{marginRight: 8}}
         onPress={handleLogout}
      >
         <Ionicons name="log-out-outline" size={24} color={primary}/>
      </TouchableOpacity>
   )
}
export default LogoutIconButton

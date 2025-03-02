import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import { useAuthStore } from "../store/useAuthStore"
const LogoutIconButton = () => {

   const primary = useThemeColor({}, "primary")
   const {logout} = useAuthStore()

   function handleLogout() {
      logout()
   }

   return (
      <TouchableOpacity style={{marginRight: 8}}
         onPressIn={handleLogout}
      >
         <Ionicons name="log-out-outline" size={24} color={primary}/>
      </TouchableOpacity>
   )
}
export default LogoutIconButton

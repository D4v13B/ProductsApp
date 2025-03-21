import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import { useThemeColor } from "./hooks/useThemeColor"

interface Props {
   onPress: () => void
   icon: keyof typeof Ionicons.glyphMap
}

const MenuIconButton = ({ onPress, icon }: Props) => {
   const primary = useThemeColor({}, "primary")

   return (
      <TouchableOpacity onPressIn={onPress}>
         <Ionicons name={icon} size={24} color={primary} />
      </TouchableOpacity>
   )
}
export default MenuIconButton

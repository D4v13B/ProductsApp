import { PressableProps, Pressable, StyleSheet } from "react-native"
import { useThemeColor } from "./hooks/useThemeColor"
import { Ionicons } from "@expo/vector-icons"
import { ThemedText } from "./ThemedText"

interface Props extends PressableProps {
   children?: string
   icon?: keyof typeof Ionicons.glyphMap
}

const ThemeButton = ({ children, icon, ...rest}: Props) => {
   const primary = useThemeColor({}, "primary")

   const styles = StyleSheet.create({
      button: {
         padding: 15,
         borderRadius: 10,
         flex: 1,
         flexDirection: "row",
         justifyContent: "center",
         alignItems: "center",
      },
   })

   return (
      <>
         <Pressable
            {...rest}
            style={({ pressed }) => [
               styles.button,
               {
                  backgroundColor: pressed ? primary + "50" : primary,
               },
            ]}
         >
            <ThemedText style={{color: "white"}}>{children}</ThemedText>
            {icon && (
               <Ionicons
                  name={icon}
                  size={24}
                  color={"white"}
                  style={{ marginRight: 10 }}
               />
            )}
         </Pressable>
      </>
   )
}
export default ThemeButton

import { useRef, useState } from "react"
import { View, TextInputProps, StyleSheet, TextInput, Button } from "react-native"

import { Ionicons } from "@expo/vector-icons"

import { useThemeColor } from "./hooks/useThemeColor"

interface Props extends TextInputProps {
   icon?: keyof typeof Ionicons.glyphMap
}

const ThemedTextInput = ({ icon, ...rest }: Props) => {
   const primary = useThemeColor({}, "primary")
   const textColor = useThemeColor({}, "text")

   const [isActive, setIsActive] = useState<boolean>()
   const inputRef = useRef<TextInput>(null)

   return (
      <View
         style={{
            ...style.border,
            borderColor: isActive ? primary : "#ccc",
         }}
         onTouchStart={() => inputRef.current?.focus()}
      >
         {icon && (
            <Ionicons
               name={icon}
               size={24}
               color={textColor}
               style={{ marginRight: 10 }}
            />
         )}
         <TextInput
            ref={inputRef}
            placeholderTextColor="#5c5c5c"
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            style={{
               color: textColor,
               marginRight: 10,
               flex: 1,
            }}
            {...rest}
         />

         
      </View>
   )
}
export default ThemedTextInput

const style = StyleSheet.create({
   border: {
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: 5,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
   },
})

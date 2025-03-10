import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useThemeColor } from "./hooks/useThemeColor"
import { ThemedText } from "./ThemedText"

interface Props {
   options: string[]
   selectedOptions: string[]

   onSelect: (options: string) => void
}

const ThemedButtonGroup = ({ options, selectedOptions, onSelect }: Props) => {
   const primaryColor = useThemeColor({}, "primary")

   return (
      <View style={styles.container}>
         {options.map((option) => (
            <TouchableOpacity
               onPress={() => onSelect(option)}
               key={option}
               style={[
                  styles.button,
                  selectedOptions.includes(option) && {
                     backgroundColor: primaryColor,
                  },
               ]}
            >
               <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={[
                     styles.buttonText,
                     selectedOptions.includes(option) &&
                        styles.selectedButtonText,
                  ]}
               >
                  {option[0].toUpperCase() + option.slice(1)}
               </Text>
            </TouchableOpacity>
         ))}
      </View>
   )
}
export default ThemedButtonGroup

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
   },
   button: {
      padding: 10,
      margin: 5,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
   },
   buttonText: {
      fontSize: 16,
   },
   selectedButtonText: {
      color: "#fff",
   },
})

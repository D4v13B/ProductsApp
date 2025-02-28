import { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"

import { ThemedText } from "@/presentation/theme/components/ThemedText"

import { useAuthStore } from "@/presentation/auth/store/useAuthStore"
import { Redirect, Stack } from "expo-router"
import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"

const CheckAuthLayout = () => {
   const { status, checkStatus } = useAuthStore()
   const backgroundColor = useThemeColor({}, "background")

   useEffect(() => {
      // console.log(status);
      checkStatus()
   }, [])

   if (status == "checking") {
      return (
         <View
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               marginBottom: 5,
            }}
         >
            <ActivityIndicator />
         </View>
      )
   }

   if (status == "unauthenticated") {
      // TODO: Guardar la ruta del usuario
      return <Redirect href={"/auth/login"} />
   }

   return (
      <Stack
         screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
               backgroundColor: backgroundColor,
            },
         }}
      >
         <Stack.Screen
            name="(home)/index"
            options={{
               title: "Productos",
            }}
         />
      </Stack>
   )
}
export default CheckAuthLayout

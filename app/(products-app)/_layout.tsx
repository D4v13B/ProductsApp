import { useEffect } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { Redirect, Stack } from "expo-router"

import { useAuthStore } from "@/presentation/auth/store/useAuthStore"
import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import LogoutIconButton from "@/presentation/auth/components/LogoutIconButton"
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter"

const CheckAuthLayout = () => {
   const { status, checkStatus } = useAuthStore()
   const backgroundColor = useThemeColor({}, "background")

   useEffect(() => {
      checkStatus()
   }, [status])

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
      <>
         <Stack
            screenOptions={{
               headerShadowVisible: false,
               contentStyle: {
                  backgroundColor: backgroundColor
               },
               headerStyle: {
                  backgroundColor: backgroundColor,
               },
            }}
         >
            <Stack.Screen
               name="(home)/index"
               options={{
                  title: "Productos",
                  headerTitleAlign: "center",
                  headerRight: () => <LogoutIconButton />,
               }}
            />

            <Stack.Screen
               name="(home)/product/[id]"
               options={{
                  headerTitleAlign: "center"
               }}
            />
         </Stack>
      </>
   )
}
export default CheckAuthLayout

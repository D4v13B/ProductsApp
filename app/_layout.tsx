import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import {
   DarkTheme,
   DefaultTheme,
   ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { useColorScheme } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import "react-native-reanimated"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
   const colorScheme = useColorScheme()
   const backgroundColor = useThemeColor({}, "background")

   const [loaded] = useFonts({
      KanitRegular: require("../assets/fonts/Kanit-Regular.ttf"),
      KanitBold: require("../assets/fonts/Kanit-Bold.ttf"),
      KanitThin: require("../assets/fonts/Kanit-Thin.ttf"),
   })

   useEffect(() => {
      if (loaded) {
         SplashScreen.hideAsync()
      }
   }, [loaded])

   if (!loaded) {
      return null
   }

   return (
      <GestureHandlerRootView
         style={{ backgroundColor: backgroundColor, flex: 1 }}
      >
         <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
         >
            <Stack
               screenOptions={{
                  headerShown: false,
                  animation: "ios_from_left",
               }}
            >
               <Stack.Screen name="auth/login/index" />
               <Stack.Screen name="auth/register/index" />
            </Stack>
            <StatusBar style="auto" />
         </ThemeProvider>
      </GestureHandlerRootView>
   )
}
import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import ThemeButton from "@/presentation/theme/components/ThemeButton"
import { ThemedText } from "@/presentation/theme/components/ThemedText"
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput"
import ThemeLink from "@/presentation/theme/components/ThemeLink"
import {
   KeyboardAvoidingView,
   ScrollView,
   useWindowDimensions,
   View,
} from "react-native"

const RegisterScreen = () => {
   const { height } = useWindowDimensions()
   const background = useThemeColor({}, "background")

   return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
         <ScrollView
            style={{
               paddingHorizontal: 40,
               backgroundColor: background,
            }}
         >
            <View
               style={{
                  paddingTop: height * 0.35,
               }}
            >
               <ThemedText type="title">RegisterScreen</ThemedText>
               <ThemedText style={{ color: "grey" }}>
                  Por favor, llena la información para continuar
               </ThemedText>
            </View>

            {/* Otro view para nuestro email y password */}

            <View
               style={{
                  marginTop: 20,
               }}
            >
               <ThemedTextInput
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  // ICON
                  icon="mail-outline"
               />

               <ThemedTextInput
                  placeholder="Nombre completo"
                  autoCapitalize="words"
                  // ICON
                  icon="person-outline"
               />

               <ThemedTextInput
                  placeholder="Contraseña"
                  autoCapitalize="none"
                  secureTextEntry
                  // ICON
                  icon="lock-closed-outline"
               />

               <View style={{ marginTop: 10 }} />

               {/* Personal button */}
               <ThemeButton icon="arrow-forward-circle">
                  Registrarse
               </ThemeButton>

               <View style={{ marginTop: 30 }} />

               {/* Enlace de registro */}
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <ThemedText>Tienes cuenta? </ThemedText>
                  <ThemeLink href="/auth/login" style={{ marginHorizontal: 5 }}>
                     Iniciar sesión
                  </ThemeLink>
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}
export default RegisterScreen

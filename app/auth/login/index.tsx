import { useEffect, useState } from "react"
import {
   Alert,
   KeyboardAvoidingView,
   ScrollView,
   useWindowDimensions,
   View,
} from "react-native"

import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import ThemeButton from "@/presentation/theme/components/ThemeButton"
import { ThemedText } from "@/presentation/theme/components/ThemedText"
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput"
import ThemeLink from "@/presentation/theme/components/ThemeLink"
import { useAuthStore } from "@/presentation/auth/store/useAuthStore"
import { router } from "expo-router"

const LoginScreen = () => {

   const {status, login} = useAuthStore()

   useEffect(() => {
      if(status == 'authenticated'){
         router.replace("/(products-app)/(home)")
      }
   }, [])
   
   const { height } = useWindowDimensions()
   const background = useThemeColor({}, "background")
   
   const [isPosting, setIsPosting] = useState(false)
   const [form, setForm] = useState({
      email: "",
      password: "",
   })
   
   const onLogin = async () => {
      const {email, password } = form
      
      
      if(form.email.length == 0 || form.password.length == 0) {
         Alert.alert('Error', 'Llenar los campos de email o contraseña')
         setIsPosting(false)
         return
      }
      setIsPosting(true)
      
      const wasSuccesful = await login(email, password)
      
      if(wasSuccesful) {
         // Alert.alert('Success', 'Todo esta correcto')
         router.replace('/(products-app)/(home)')
         return
      }
      
      Alert.alert('Error', 'Usuario o contraseña no son correctos')
      setIsPosting(false)

   }

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
               <ThemedText type="title">LoginScreen</ThemedText>
               <ThemedText style={{ color: "grey" }}>
                  Por favor ingrese para continuar
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

                  value={form.email}
                  onChangeText={(value)=> setForm({...form, email: value})}
               />

               <ThemedTextInput
                  placeholder="Contraseña"
                  autoCapitalize="none"
                  secureTextEntry
                  // ICON
                  icon="lock-closed-outline"

                  value={form.password}
                  onChangeText={(value)=> setForm({...form, password: value})}
               />

               <View style={{ marginTop: 10 }} />

               {/* Personal button */}
               <ThemeButton onPress={onLogin} disabled={isPosting} icon="arrow-forward-circle">Ingresar</ThemeButton>

               <View style={{ marginTop: 30 }} />

               {/* Enlace de registro */}
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <ThemedText>No tienes cuenta?</ThemedText>
                  <ThemeLink
                     href="/auth/register"
                     style={{ marginHorizontal: 5 }}
                  >
                     Crear cuenta
                  </ThemeLink>
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}
export default LoginScreen

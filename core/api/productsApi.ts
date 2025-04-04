import { Platform } from "react-native"
import axios from "axios"
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter"
// TODO: conectar mediante envs vars, Android e IOS

export const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev"

export const API_URL =
   STAGE == "prod"
      ? process.env.EXPO_PUBLIC_API_URL
      : Platform.OS == "ios"
      ? process.env.EXPO_PUBLIC_API_URL_IOS
      : process.env.EXPO_PUBLIC_API_URL_ANDROID

console.log(`STAGE ${STAGE}: ${Platform.OS}: ${API_URL}`)

const productApi = axios.create({
   baseURL: API_URL,
})

// TODO: interceptors

productApi.interceptors.request.use( async (config) => {

   // Verificar si tenemos el token
   const token = await SecureStorageAdapter.getItem("token")

   if(token){
      config.headers.Authorization = `Bearer ${token}`
   }

   return config
})

export { productApi }

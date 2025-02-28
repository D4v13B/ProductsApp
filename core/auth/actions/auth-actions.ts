import { productApi } from "../api/productsApi"
import { User } from "../interfaces/user"

export interface AuthResponse {
   id: string
   email: string
   fullName: string
   isActive: boolean
   roles: string[]

   token: string
}

const returnUserToken = (
   data: AuthResponse
): {
   user: User
   token: string
} => {
   // const { id, email, fullName, isActive, roles, token } = data

   const { token, ...user } = data

   // const user: User = {
   //    id,
   //    email,
   //    fullName,
   //    isActive,
   //    roles,
   // }

   return {
      user,
      token,
   }
}

export const authLogin = async (email: string, password: string) => {
   email.toLowerCase()

   try {
      const { data } = await productApi.post<AuthResponse>("/auth/login", {
         email,
         password,
      })

      return returnUserToken(data)
   } catch (error) {
      console.log(error)
      // throw new Error('User and/or password not valid')
      return null
   }
}

export const authCheckStatus = async (token: string | undefined) => {
   try {
      const { data } = await productApi.get<AuthResponse>("/auth/check-status", {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })

      return returnUserToken(data)
   } catch (error) {
      return null
   }
}

// TODO: Hacer el register

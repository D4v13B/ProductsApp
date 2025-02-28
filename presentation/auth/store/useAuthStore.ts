import { create } from "zustand"

import { User } from "@/core/auth/interfaces/user"
import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions"

export type AuthStatus = "authenticated" | "unauthenticated" | "checking"

export interface AuthState {
   status: AuthStatus
   token?: string
   user?: User

   login: (email: string, password: string) => Promise<boolean>
   checkStatus: () => Promise<void>
   changeStatus: (token?: string, user?: User) => boolean
   logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
   // Props
   status: "checking",
   token: undefined,
   user: undefined,

   // Actions
   login: async (email: string, password: string) => {
      try {
         const resp = await authLogin(email, password)
         
         return get().changeStatus(resp?.token, resp?.user)
      } catch (error) {
         console.log(error)
         return false
      }
   },
   
   changeStatus: (token?: string, user?: User) => {
      if (!token || !user) {
         set({ status: "unauthenticated", token: undefined, user: undefined })
         // TODO: llamar logout
         return false
      }

      set({
         status: "authenticated",
         token: token,
         user: user,
      })

      return true
   },

   checkStatus: async () => {
      if(!get().token){
         return
      }

      const resp = await authCheckStatus(get().token)
      

      get().changeStatus(resp?.token, resp?.user)
   },

   logout: async () => {
      // TODO: clear token del secure storage
      set({ status: "unauthenticated", token: undefined, user: undefined })
   },
}))

import { User } from "@/core/auth/interfaces/user";

export interface ProductResponse {
   id:          string;
   title:       string;
   price:       number;
   description: string;
   slug:        string;
   stock:       number;
   sizes:       string[];
   gender:      Gender;
   tags:        string[];
   images:      string[];
   user:        User;
}

export enum Size {
   L= 'L',
   M = 'M',
   S = 'S',
   Xl = 'XL',
   Xs = 'XS',
   Xxl = 'XXL',
   XxxL = 'XXXL'
}

export enum Gender {
   Kid = "kid",
   Men = "men",
   Women = "women",
}
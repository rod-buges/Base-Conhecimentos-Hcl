export interface Procedure {
  id: string;
  name: string;
  category: string;
  file: string; // base64 string
  dateAdded: string;
  fileName: string;
}

export interface User {
  username: string;
  password: string;
}

export type Category = 
  | "Acessos" 
  | "Tasy" 
  | "Senior" 
  | "Rede" 
  | "Hardware" 
  | "Outros";

export const CATEGORIES: Category[] = [
  "Acessos",
  "Tasy",
  "Senior",
  "Rede",
  "Hardware",
  "Outros"
];
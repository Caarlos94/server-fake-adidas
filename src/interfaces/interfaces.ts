export interface Product {
  name: string;
  keys: string[];
  image: string[];
  price: string;
  size: string[];
  category: string;
}

export interface User {
  email: string;
  password: string;
}

export interface ProdPay {
  id: string;
  cantidad: string;
}

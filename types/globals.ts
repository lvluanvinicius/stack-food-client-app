export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type MenuCategory = string;

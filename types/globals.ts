export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  category: string;
  featured?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  complements?: MenuItem[];
}

export type MenuCategory = string;

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "burguers" | "especiais" | "acompanhados" | "porcoes";
  featured?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type MenuCategory =
  | "burguers"
  | "especiais"
  | "acompanhados"
  | "porcoes";

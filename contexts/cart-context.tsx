import { getCookie, setCookie, deleteCookie } from "cookies-next";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { MenuItem, CartItem } from "../types/globals";

const COOKIE_NAME = "appcart";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Função para carregar dados do cookie
  const loadCartFromCookie = (): CartItem[] => {
    try {
      const cookieValue = getCookie(COOKIE_NAME);
      if (cookieValue && typeof cookieValue === "string") {
        return JSON.parse(cookieValue);
      }
      return [];
    } catch (error) {
      console.error("Erro ao carregar carrinho do cookie:", error);
      return [];
    }
  };

  // Função para salvar dados no cookie
  const saveCartToCookie = (items: CartItem[]) => {
    try {
      setCookie(COOKIE_NAME, JSON.stringify(items), {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
        sameSite: "lax", // Adiciona configuração de segurança
      });
    } catch (error) {
      console.error("Erro ao salvar carrinho no cookie:", error);
    }
  };

  // Estado inicial carregado do cookie
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carrega dados do cookie na inicialização
  useEffect(() => {
    const savedCart = loadCartFromCookie();
    setCartItems(savedCart);
    setIsInitialized(true);
  }, []);

  // Calcula totais sempre que cartItems muda
  useEffect(() => {
    const items = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const price = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    setTotalItems(items);
    setTotalPrice(price);
  }, [cartItems]);

  // Salva no cookie sempre que cartItems muda (após inicialização)
  useEffect(() => {
    if (isInitialized) {
      saveCartToCookie(cartItems);
    }
  }, [cartItems, isInitialized]);

  const addToCart = (item: MenuItem) => {
    setCartItems((prevItems) => {
      // Verifica se o item já existe no carrinho
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        // Atualiza quantidade se o item já existe
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        // Adiciona novo item com quantidade 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        // Diminui quantidade se for maior que 1
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      } else {
        // Remove item completamente se quantidade for 1
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      deleteCookie(COOKIE_NAME, { path: "/" });
    } catch (error) {
      console.error("Erro ao limpar cookie do carrinho:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

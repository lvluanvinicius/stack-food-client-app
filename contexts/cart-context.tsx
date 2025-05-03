import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { MenuItem, CartItem } from "../types/globals";

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total items and price whenever cartItems changes
    const items = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const price = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    setTotalItems(items);
    setTotalPrice(price);
  }, [cartItems]);

  const addToCart = (item: MenuItem) => {
    setCartItems((prevItems) => {
      // Check if item is already in cart
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity if more than 1
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      } else {
        // Remove item completely if quantity is 1
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
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

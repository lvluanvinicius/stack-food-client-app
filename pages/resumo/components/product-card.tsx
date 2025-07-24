import { useCart } from "@/contexts/cart-context";
import { CartItem } from "@/types/globals";
import { Minus, Plus, Trash2 } from "lucide-react";

interface ProductCardProps {
  cartItem: CartItem;
}

export function ProductCard({ cartItem }: ProductCardProps) {
  const { addToCart, removeFromCart } = useCart();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex gap-4">
        <img
          src={cartItem.photo}
          alt={cartItem.name}
          className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
            {cartItem.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-gray-600">
            {"Descrição do produto"}
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="font-bold text-green-600">
              R$ {(cartItem.price * cartItem.quantity).toFixed(2)}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => removeFromCart(cartItem.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {cartItem.quantity}
              </span>
              <button
                type="button"
                onClick={() => addToCart(cartItem)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
              <button
                type="button"
                onClick={() => {
                  for (let i = 0; i < cartItem.quantity; i++) {
                    removeFromCart(cartItem.id);
                  }
                }}
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-50 transition-colors hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

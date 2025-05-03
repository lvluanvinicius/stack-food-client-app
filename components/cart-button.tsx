import React, { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";

const CartButton: React.FC = () => {
  const {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const formattedTotalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalPrice);

  return (
    <>
      {/* Floating cart button */}
      <button
        onClick={toggleCart}
        className="bg-primary-500 hover:bg-primary-600 fixed right-6 bottom-6 z-40 flex cursor-pointer items-center justify-center rounded-full p-4 text-white shadow-lg transition-all duration-300"
        aria-label={`Abrir carrinho com ${totalItems} ${totalItems === 1 ? "item" : "itens"}`}
        aria-expanded={isCartOpen}
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="bg-secondary-500 absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart modal */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={toggleCart}
            aria-hidden="true"
          ></div>

          {/* Cart panel */}
          <div className="fixed top-0 right-0 z-50 h-full w-full overflow-auto bg-white p-6 shadow-xl sm:w-96">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-wood-dark font-montserrat text-xl font-bold">
                Seu Pedido
              </h2>
              <button
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Fechar carrinho"
              >
                <X size={24} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex h-60 flex-col items-center justify-center">
                <ShoppingCart size={48} className="mb-4 text-gray-300" />
                <p className="text-lg text-gray-500">Seu carrinho está vazio</p>
                <button
                  onClick={toggleCart}
                  className="text-primary-500 hover:text-primary-600 mt-4 font-medium"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex border-b border-gray-100 pb-4"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="mr-3 h-20 w-20 rounded-md object-cover"
                        unoptimized
                        width={200}
                        height={200}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-wood-dark font-medium">
                            {item.name}
                          </h3>
                          <span className="text-wood-dark font-medium">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(item.price * item.quantity)}
                          </span>
                        </div>
                        <p className="mb-2 line-clamp-1 text-sm text-gray-500">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-md border">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="hover:text-secondary-500 px-2 py-1 text-gray-600"
                              aria-label="Remover um item"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="hover:text-primary-500 px-2 py-1 text-gray-600"
                              aria-label="Adicionar um item"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              for (let i = 0; i < item.quantity; i++) {
                                removeFromCart(item.id);
                              }
                            }}
                            className="hover:text-secondary-500 text-gray-400"
                            aria-label="Remover todos os itens"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formattedTotalPrice}</span>
                  </div>
                  <div className="mb-6 flex justify-between">
                    <span className="text-gray-600">Taxa de entrega</span>
                    <span className="font-medium">A calcular</span>
                  </div>
                  <div className="mb-6 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formattedTotalPrice}</span>
                  </div>

                  <div className="space-y-3">
                    <button className="bg-primary-500 hover:bg-primary-600 w-full rounded-md py-3 font-medium text-white transition-colors duration-200">
                      Finalizar Pedido
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full rounded-md border border-gray-300 py-2 font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50"
                    >
                      Limpar Carrinho
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CartButton;

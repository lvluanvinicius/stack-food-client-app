import CartButton from "@/components/cart-button";
import { Footer } from "@/components/footer";
import { useCart } from "@/contexts/cart-context";
import { ProductCard } from "./components/product-card";

export function Page() {
  const { cartItems } = useCart();

  return (
    <div className="bg-cream min-h-screen">
      <div className="min-h-[100vh] w-full pb-10">
        <div className="container mx-auto flex flex-col px-4">
          <div className="mt-5">
            <div className="mx-auto mt-4 max-w-7xl">
              {/* Heading... */}
              <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Finalizar Pedido
                </h1>
                <p className="text-gray-600">
                  Revise seu pedido e complete o pagamento
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                  {/* Lista de Produtos */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-lg font-semibold text-gray-900">
                      Seus Itens
                    </h2>
                    <div className="space-y-4">
                      {/* Card Product */}
                      {cartItems.map(function (cart) {
                        return <ProductCard cartItem={cart} />;
                      })}

                      {/*  */}
                    </div>
                  </div>
                </div>
              </div>

              {/*  */}
            </div>
          </div>
        </div>
      </div>

      {/* Floating cart button */}
      <CartButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}

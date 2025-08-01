import Link from "next/link";
import CartButton from "@/components/cart-button";
import { useCart } from "@/contexts/cart-context";
import { ProductCard } from "./components/product-card";
import { Smile } from "lucide-react";
import { AddressCard } from "./components/address-card";
import { useSession } from "next-auth/react";
import { useAuth } from "@/contexts/auth-provider";
import { useEffect } from "react";

export function Page() {
  const { status } = useSession();
  const { onOpenFormChange, formOpen } = useAuth();
  const { cartItems } = useCart();

  useEffect(
    function () {
      if (status === "unauthenticated") {
        onOpenFormChange(!formOpen);
      }
    },
    [status],
  );

  if (cartItems.length <= 0) {
    return <ResumeClean />;
  }

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
                  <ProductCard />
                  <AddressCard />
                </div>
              </div>

              {/*  */}
            </div>
          </div>
        </div>
      </div>

      {/* Floating cart button */}
      <CartButton />
    </div>
  );
}

export function ResumeClean() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="min-h-[100vh] w-full pb-10">
        <div className="container mx-auto flex flex-col px-4">
          <div className="mt-5">
            {/*  */}
            <div className="mx-auto max-w-2xl px-4">
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Smile className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                  Nenhum produto foi selecionado!
                </h1>
                <p className="mb-6 text-gray-600">
                  volte ao cardápio e escolha alguns produtos antes de
                  prosseguir para o pagamento.
                </p>

                <div className="w-full">
                  <Link href={"/"}>
                    <button className="bg-primary-400 cursor-pointer rounded-md px-6 py-1 text-white">
                      Ir para cardápio...
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating cart button */}
      <CartButton />
    </div>
  );
}

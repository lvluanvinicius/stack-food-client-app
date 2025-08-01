import CartButton from "@/components/cart-button";
import { Footer } from "@/components/footer";
import { MercadoPago } from "./components/mercadopago";

export function Page() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="min-h-[100vh] w-full">
        <MercadoPago />
      </div>

      {/* Floating cart button */}
      <CartButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}

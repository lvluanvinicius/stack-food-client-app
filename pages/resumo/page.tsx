import CartButton from "@/components/cart-button";
import { MercadoPago } from "../pagamento/components/mercadopago";
import { Footer } from "@/components/footer";

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

import { useState } from "react";
import NavBar from "@/components/nav-bar";
import FeaturedItems from "@/components/featured-items";
import CartButton from "@/components/cart-button";
import { CartProvider } from "@/contexts/cart-context";
import { MenuCategory } from "@/types/globals";
import { useApplication } from "@/contexts/application";
import { useQuery } from "@tanstack/react-query";
import menuItems from "@/data/menuItems";

export function Page() {
  const { establishment } = useApplication();

  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["menu-query-items"],
    queryFn: async function () {
      return menuItems.filter((i) => i.featured == true);
    },
  });

  return (
    <CartProvider>
      <div className="bg-cream-light min-h-screen">
        <NavBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Only show featured items when not searching */}
        {data && searchQuery === "" && <FeaturedItems items={data} />}

        {/* Floating cart button */}
        <CartButton />

        {/* Footer */}
        <footer className="bg-wood-dark text-cream-light mt-12 py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs">
              © {new Date().getFullYear()}{" "}
              {establishment.establishment.company_name}. Todos os direitos
              reservados.
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

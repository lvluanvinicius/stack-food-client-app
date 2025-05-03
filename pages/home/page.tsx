import { useState, useMemo } from "react";
import menuItems from "@/data/menuItems";
import NavBar from "@/components/nav-bar";
import MenuSection from "@/components/menu-section";
import FeaturedItems from "@/components/featured-items";
import CartButton from "@/components/cart-button";
import { CartProvider } from "@/contexts/cart-context";
import { MenuCategory } from "@/types/globals";

export function Page() {
  const [activeCategory, setActiveCategory] =
    useState<MenuCategory>("burguers");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on search query and active category
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === null || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Get featured items
  const featuredItems = useMemo(() => {
    return menuItems.filter((item) => item.featured);
  }, []);

  // Group items by category
  const burguerItems = filteredItems.filter(
    (item) => item.category === "burguers",
  );
  const especialItems = filteredItems.filter(
    (item) => item.category === "especiais",
  );
  const acompanhadosItems = filteredItems.filter(
    (item) => item.category === "acompanhados",
  );
  const porcoesItems = filteredItems.filter(
    (item) => item.category === "porcoes",
  );

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
        {searchQuery === "" && <FeaturedItems items={featuredItems} />}

        {/* Show appropriate sections based on active category */}
        {(!activeCategory ||
          activeCategory === "burguers" ||
          searchQuery !== "") && (
          <MenuSection title="Burguers" items={burguerItems} />
        )}

        {(!activeCategory ||
          activeCategory === "especiais" ||
          searchQuery !== "") && (
          <MenuSection title="Especiais" items={especialItems} />
        )}

        {(!activeCategory ||
          activeCategory === "acompanhados" ||
          searchQuery !== "") && (
          <MenuSection title="Acompanhados" items={acompanhadosItems} />
        )}

        {(!activeCategory ||
          activeCategory === "porcoes" ||
          searchQuery !== "") && (
          <MenuSection title="Porções" items={porcoesItems} />
        )}

        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-500">
              Nenhum item encontrado. Tente outra busca.
            </p>
          </div>
        )}

        {/* Floating cart button */}
        <CartButton />

        {/* Footer */}
        <footer className="bg-wood-dark text-cream-light mt-12 py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              © 2025 Restaurante Tereza e Augusto. Todos os direitos
              reservados.
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

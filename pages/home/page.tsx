import { useState } from "react";
import NavBar from "@/components/nav-bar";
import CartButton from "@/components/cart-button";
import { CartProvider } from "@/contexts/cart-context";
import { MenuCategory } from "@/types/globals";
import { useApplication } from "@/contexts/application";
import { useQuery } from "@tanstack/react-query";
import { nextApi } from "@/services/next-api";
import { MenuSectionInterface } from "@/types/menu";
import MenuSection from "@/components/menu-section";

export function Page() {
  const { establishment } = useApplication();

  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["menu-query-items", searchQuery],
    queryFn: async function () {
      const response = await nextApi.get<
        ActionsResponse<ApiResponse<MenuSectionInterface[]>>
      >("menu", {
        params: {
          search: searchQuery,
        },
      });

      if (response.data && response.status === 200) {
        if (response.data.status) {
          return response.data.data;
        }
      }
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
        {/* {data && searchQuery === "" && <FeaturedItems items={data.data} />} */}

        {data &&
          data.data.map(function (item) {
            return (
              <MenuSection
                key={item.id}
                title={item.name}
                items={item.menu_items}
              />
            );
          })}

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

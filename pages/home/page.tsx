import { useState } from "react";
import NavBar from "@/components/nav-bar";
import CartButton from "@/components/cart-button";
import { CartProvider } from "@/contexts/cart-context";
import { MenuCategory } from "@/types/globals";
import { useQuery } from "@tanstack/react-query";
import { nextApi } from "@/services/next-api";
import { MenuSectionInterface } from "@/types/menu";
import MenuSection, { MenuSectionSkeleton } from "@/components/menu-section";
import { Footer } from "@/components/footer";

export function Page() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["menu-query-items", searchQuery, activeCategory],
    queryFn: async function () {
      const response = await nextApi.get<
        ActionsResponse<MenuSectionInterface[]>
      >("menu", {
        params: {
          search: searchQuery,
          category: activeCategory == "all" ? null : activeCategory,
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
      <div className="bg-cream min-h-screen">
        <NavBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Only show featured items when not searching */}
        {/* {data && searchQuery === "" && <FeaturedItems items={data.data} />} */}

        <div className="min-h-[100vh] w-full">
          {data ? (
            data.map(function (item) {
              return (
                <MenuSection
                  key={item.id}
                  title={item.name}
                  items={item.menu_items}
                />
              );
            })
          ) : (
            <MenuSectionSkeleton />
          )}
        </div>

        {/* Floating cart button */}
        <CartButton />

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}

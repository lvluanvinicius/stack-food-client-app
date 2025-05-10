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
import Image from "next/image";

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
      <div className="bg-cream min-h-screen">
        <NavBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Only show featured items when not searching */}
        {/* {data && searchQuery === "" && <FeaturedItems items={data.data} />} */}

        <div className="min-h-[85vh] w-full">
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
        </div>

        {/* Floating cart button */}
        <CartButton />

        {/* Footer */}
        <footer className="bg-wood-dark text-cream-light py-6">
          <div className="container mx-auto mt-4 grid px-4 text-center md:grid-cols-5">
            <div className="col-span-1 flex flex-col items-center gap-4">
              <div className="h-28 w-28 rounded-full bg-black">
                <Image
                  src={"/uploads/Logo-Exemplo.png"}
                  alt={`Logo Exemplo`}
                  width={300}
                  height={300}
                  className="h-full w-full rounded-[inherit] object-cover"
                />
              </div>

              <div className="">
                <p className="mb-1 text-sm">
                  <strong>Contato: </strong>
                  <br />
                  <span className="text-xs">
                    {establishment.establishment.phone}
                  </span>
                </p>
                <p className="text-sm">
                  <strong>Endereço: </strong>
                  <br />
                  <span className="text-xs">
                    {establishment.establishment.address} -{" "}
                    {establishment.establishment.postal_code}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-4 px-4 text-center">
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

import React from "react";
import { MenuItem as MenuItemType } from "../types";
import { PlusCircle } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();
  const { name, description, price, image } = item;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return (
    <div className="shadow-card overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          unoptimized
          width={200}
          height={200}
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-wood-dark font-montserrat text-xl font-semibold">
            {name}
          </h3>
          <span className="text-secondary-500 font-montserrat font-semibold">
            {formattedPrice}
          </span>
        </div>
        <p className="font-poppins mb-4 line-clamp-3 text-sm text-gray-600">
          {description}
        </p>
        <button
          onClick={() => addToCart(item)}
          className="bg-primary-500 hover:bg-primary-600 flex w-full items-center justify-center rounded-md py-2 font-medium text-white transition-colors duration-200"
          aria-label={`Adicionar ${name} ao carrinho`}
        >
          <PlusCircle size={18} className="mr-2" />
          <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
};

export default MenuItem;

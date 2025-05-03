import React from "react";
import { MenuItem as MenuItemType } from "../types";
import MenuItem from "./menu-item";

interface MenuSectionProps {
  title: string;
  items: MenuItemType[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-wood-dark font-montserrat after:bg-primary-500 relative mb-6 inline-block pb-2 text-2xl font-bold after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:rounded-full after:content-[''] md:text-3xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;

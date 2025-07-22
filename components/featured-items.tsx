import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { MenuItem } from "@/types/globals";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";

interface FeaturedItemsProps {
  items: MenuItem[];
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

  // Auto-rotate featured items every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  if (items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currentItem.price);

  return (
    <section className="bg-wood-light py-6 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-6 flex items-center">
          <Star
            className="text-primary-400 mr-2"
            size={24}
            fill="currentColor"
          />
          <h2 className="font-montserrat text-2xl font-bold md:text-3xl">
            Destaques
          </h2>
        </div>

        <div className="relative">
          <div className="bg-wood-dark overflow-hidden rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="h-60 w-full md:h-80 md:w-1/2">
                <Image
                  src={currentItem.photo}
                  alt={currentItem.name}
                  className="h-full w-full object-cover"
                  unoptimized
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex w-full flex-col justify-center p-6 md:w-1/2">
                <div className="mb-2">
                  <span className="bg-primary-500 mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold">
                    Destaque
                  </span>
                  <h3 className="font-montserrat text-2xl font-bold">
                    {currentItem.name}
                  </h3>
                </div>
                <p className="text-cream-light font-poppins mb-4">
                  {currentItem.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-500 text-xl font-bold">
                    {formattedPrice}
                  </span>
                  <button
                    onClick={() => addToCart(currentItem)}
                    className="bg-primary-500 hover:bg-primary-600 rounded-md px-4 py-2 font-medium transition-colors duration-200"
                    aria-label={`Adicionar ${currentItem.name} ao carrinho`}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors duration-200 hover:bg-black/70"
            aria-label="Item anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors duration-200 hover:bg-black/70"
            aria-label="Próximo item"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="mt-4 flex justify-center">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`mx-1 h-2 w-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-primary-500 w-4"
                    : "bg-cream-light/50"
                }`}
                aria-label={`Ir para item ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;

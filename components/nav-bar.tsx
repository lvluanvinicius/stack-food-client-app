import React, { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import { MenuCategory } from "@/types/globals";

interface NavBarProps {
  activeCategory: MenuCategory | null;
  setActiveCategory: (category: MenuCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category: MenuCategory) => {
    setActiveCategory(category);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-cream-dark sticky top-0 z-30 shadow-md">
      <div className="container mx-auto px-4 py-3 md:px-8">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="relative mr-4 w-full md:w-1/3">
            <input
              type="text"
              placeholder="Buscar item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-primary-300 focus:ring-primary-500 font-poppins bg-primary-50 w-full rounded-full border px-4 py-2 pr-10 text-sm focus:ring-2 focus:outline-none"
              aria-label="Buscar no cardápio"
            />
            <span className="text-primary-500 absolute top-2 right-3">🔍</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden space-x-4 md:flex">
            <button
              onClick={() => handleCategoryClick("burguers")}
              className={`font-poppins rounded-full px-4 py-2 font-medium transition-colors duration-200 ${
                activeCategory === "burguers"
                  ? "bg-primary-500 text-white"
                  : "bg-cream-light text-wood-dark hover:bg-primary-100"
              }`}
              aria-pressed={activeCategory === "burguers"}
            >
              Burguers
            </button>
            <button
              onClick={() => handleCategoryClick("especiais")}
              className={`font-poppins rounded-full px-4 py-2 font-medium transition-colors duration-200 ${
                activeCategory === "especiais"
                  ? "bg-primary-500 text-white"
                  : "bg-cream-light text-wood-dark hover:bg-primary-100"
              }`}
              aria-pressed={activeCategory === "especiais"}
            >
              Especiais
            </button>
            <button
              onClick={() => handleCategoryClick("acompanhados")}
              className={`font-poppins rounded-full px-4 py-2 font-medium transition-colors duration-200 ${
                activeCategory === "acompanhados"
                  ? "bg-primary-500 text-white"
                  : "bg-cream-light text-wood-dark hover:bg-primary-100"
              }`}
              aria-pressed={activeCategory === "acompanhados"}
            >
              Acompanhados
            </button>
            <button
              onClick={() => handleCategoryClick("porcoes")}
              className={`font-poppins rounded-full px-4 py-2 font-medium transition-colors duration-200 ${
                activeCategory === "porcoes"
                  ? "bg-primary-500 text-white"
                  : "bg-cream-light text-wood-dark hover:bg-primary-100"
              }`}
              aria-pressed={activeCategory === "porcoes"}
            >
              Porções
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="bg-primary-500 hover:bg-primary-600 rounded-md p-2 text-white transition-colors duration-200 md:hidden"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="bg-cream-light absolute right-0 left-0 z-40 mx-4 mt-4 rounded-lg p-4 shadow-lg md:hidden">
            <button
              onClick={() => handleCategoryClick("burguers")}
              className={`mb-2 block w-full rounded-md px-4 py-3 text-left font-medium ${
                activeCategory === "burguers"
                  ? "bg-primary-500 text-white"
                  : "text-wood-dark hover:bg-primary-100"
              }`}
            >
              Burguers
            </button>
            <button
              onClick={() => handleCategoryClick("especiais")}
              className={`mb-2 block w-full rounded-md px-4 py-3 text-left font-medium ${
                activeCategory === "especiais"
                  ? "bg-primary-500 text-white"
                  : "text-wood-dark hover:bg-primary-100"
              }`}
            >
              Especiais
            </button>
            <button
              onClick={() => handleCategoryClick("acompanhados")}
              className={`mb-2 block w-full rounded-md px-4 py-3 text-left font-medium ${
                activeCategory === "acompanhados"
                  ? "bg-primary-500 text-white"
                  : "text-wood-dark hover:bg-primary-100"
              }`}
            >
              Acompanhados
            </button>
            <button
              onClick={() => handleCategoryClick("porcoes")}
              className={`mb-2 block w-full rounded-md px-4 py-3 text-left font-medium ${
                activeCategory === "porcoes"
                  ? "bg-primary-500 text-white"
                  : "text-wood-dark hover:bg-primary-100"
              }`}
            >
              Porções
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

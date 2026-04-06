import { ChevronDown, X } from "lucide-react";
import type { Category } from "./AllProducts";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleResetCategory: () => void;
  onCategorySelect?: () => void;
  isMobile?: boolean;
}

function CategoryFilter({
  categories,
  activeCategory,
  handleCategoryChange,
  handleResetCategory,
  onCategorySelect,
  isMobile = false
}:CategoryFilterProps) {
  const handleMobileCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleCategoryChange(e);
    if (onCategorySelect) onCategorySelect();
  };

  const handleMobileResetCategory = () => {
    handleResetCategory();
    if (onCategorySelect) onCategorySelect();
  };

  return (
    <section className="space-y-2" aria-labelledby={`${isMobile ? 'mobile-' : ''}categories-heading`}>
      <h3
        id={`${isMobile ? 'mobile-' : ''}categories-heading`}
        className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold mb-${isMobile ? '3' : '5'} text-gray-700 ${!isMobile ? 'tracking-wide' : ''}`}
      >
        Categories
      </h3>

      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-2 border border-gray-200">
        <div className="relative">
          <label htmlFor={`${isMobile ? 'mobile-' : ''}category-select`} className="sr-only">
            Select product category
          </label>

          <select
            id={`${isMobile ? 'mobile-' : ''}category-select`}
            value={activeCategory}
            onChange={isMobile ? handleMobileCategoryChange : handleCategoryChange}
            className={`cursor-pointer w-full p-3 rounded-xl border text-gray-700 appearance-none ${
              activeCategory === 'all' ? 'bg-white/50' : 'bg-white/50 pr-10'
            }`}
            aria-describedby={`${isMobile ? 'mobile-' : ''}category-help`}
          >
            <option value="all">All Categories</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id} className="capitalize">
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>

          <span id={`${isMobile ? 'mobile-' : ''}category-help`} className="sr-only">
            Filter products by category
          </span>

          {/* Conditional Icons */}
          {activeCategory === 'all' ? (
            <span className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600">
              <ChevronDown />
            </span>
          ) : (
            <button
              onClick={isMobile ? handleMobileResetCategory : handleResetCategory}
              className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              aria-label="Reset category filter"
              title="Reset to all categories"
            >
              <X />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default CategoryFilter;
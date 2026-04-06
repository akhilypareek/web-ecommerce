import type { Category } from "./AllProducts";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

interface ProductFiltersProps {
  categories: Category[];
  activeCategory: string;
  minPrice: string;
  maxPrice: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePriceChange: (min?: string, max?: string) => void;
  handleResetCategory: () => void;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  onCategorySelect?: () => void;
  onPriceApply?: () => void;
  isMobile?: boolean;
}

function ProductFilters({
  categories,
  activeCategory,
  minPrice,
  maxPrice,
  handleCategoryChange,
  handlePriceChange,
  handleResetCategory,
  setMinPrice,
  setMaxPrice,
  onCategorySelect,
  onPriceApply,
  isMobile = false
}: ProductFiltersProps) {



  return (
    <>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        handleCategoryChange={handleCategoryChange}
        handleResetCategory={handleResetCategory}
        onCategorySelect={onCategorySelect}
        isMobile={isMobile}
      />

      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        handlePriceChange={handlePriceChange}
        onPriceApply={onPriceApply}
        isMobile={isMobile}
      />
    </>
  );
}

export default ProductFilters;
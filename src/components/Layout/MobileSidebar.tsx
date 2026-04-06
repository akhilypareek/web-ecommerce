import type { Category } from "../Products/AllProducts";
import ProductFilters from "../Products/ProductFilters";

export interface MobileSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  activeCategory: string;
  minPrice: string;
  maxPrice: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePriceChange: (min?: string, max?: string) => void;
  handleResetCategory: () => void;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
}

export default function MobileSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  categories,
  activeCategory,
  minPrice,
  maxPrice,
  handleCategoryChange,
  handlePriceChange,
  handleResetCategory,
  setMinPrice,
  setMaxPrice
}:MobileSidebarProps) {
  return (
    <>
      {/* overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* sidebar content */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-labelledby="mobile-sidebar-heading"
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 id="mobile-sidebar-heading" className="text-xl font-bold text-gray-700">Filters</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <span className="text-xl" aria-hidden="true">✖</span>
            </button>
          </div>
 
          <ProductFilters
            categories={categories}
            activeCategory={activeCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            handleCategoryChange={handleCategoryChange}
            handlePriceChange={handlePriceChange}
            handleResetCategory={handleResetCategory}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            onCategorySelect={() => setIsSidebarOpen(false)}
            onPriceApply={() => setIsSidebarOpen(false)}
            isMobile={true}
          />
        </div>
      </aside>
    </>
  );
}

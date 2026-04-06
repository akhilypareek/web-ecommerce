import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import hooks
import MobileSidebar from "../Layout/MobileSidebar";
import { APIRoutes } from "../../constants/ApiRoutes";
import ProductFilters from "./ProductFilters";
import ProductCard from "./ProductCard";

export interface Category {
  id: number;
  name: string;
  slug?: string;
  image?: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  categoryId?: number;
  category?: Category;
  image?: string;
  images?: string[];
  thumbnail?: string;
  rating?: {
    rate: number;
    count: number;
  };
}



interface AllProductsProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AllProducts({ isSidebarOpen, setIsSidebarOpen }: AllProductsProps) {

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 
  const [categories, setCategories] = useState<Category[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>(""); 
  const [maxPrice, setMaxPrice] = useState<string>(""); 

  const navigate = useNavigate(); 
  const location = useLocation(); 

  // fetch categories
  useEffect(() => {
    fetch(APIRoutes.categories)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data || []); 
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // read filters from url

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryIdFromUrl = params.get("categoryId") || "all";
    const priceMinFromUrl = params.get("price_min") || "";
    const priceMaxFromUrl = params.get("price_max") || "";

    setActiveCategory(categoryIdFromUrl);
    setMinPrice(priceMinFromUrl);
    setMaxPrice(priceMaxFromUrl);
    fetchFilteredProducts(categoryIdFromUrl, priceMinFromUrl, priceMaxFromUrl);
  }, [location.search]);

  // fetch filters products 
  const fetchFilteredProducts = (categoryId = "all", min = "", max = "") => {
    setLoading(true); 
    let url = categoryId === "all"
      ? APIRoutes.products 
      : `${APIRoutes.products}?categoryId=${categoryId}`; 

    if (categoryId === "all") {
      url = APIRoutes.products;
    }

    if (min) {
      url += categoryId === "all" ? `?price_min=${min}` : `&price_min=${min}`;
    }
    if (max) {
      url += (categoryId === "all" && !min) ? `?price_max=${max}` : `&price_max=${max}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFilteredProducts(data.products || data); 
        setLoading(false); 
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  // category filter
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setActiveCategory(categoryId); // Set active category

    const searchParams = new URLSearchParams(location.search);
    if (categoryId === "all") {
      searchParams.delete("categoryId");
    } else {
      searchParams.set("categoryId", categoryId);
    }

    if (minPrice) searchParams.set("price_min", minPrice);
    else searchParams.delete("price_min");
    if (maxPrice) searchParams.set("price_max", maxPrice);
    else searchParams.delete("price_max");

    const queryString = searchParams.toString();
    navigate(queryString ? `?${queryString}` : location.pathname);
  };

  // price filter
  const handlePriceChange = (min = minPrice, max = maxPrice) => {
    const searchParams = new URLSearchParams(location.search);

    if (min) {
      searchParams.set("price_min", min);
    } else {
      searchParams.delete("price_min");
    }

    if (max) {
      searchParams.set("price_max", max);
    } else {
      searchParams.delete("price_max");
    }

    if (activeCategory && activeCategory !== "all") {
      searchParams.set("categoryId", activeCategory);
    } else {
      searchParams.delete("categoryId");
    }

    const queryString = searchParams.toString();
    navigate(queryString ? `?${queryString}` : location.pathname);
  };

// category reset funcrtion
  const handleResetCategory = () => {
    setActiveCategory("all");

    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("categoryId");

    if (minPrice) searchParams.set("price_min", minPrice);
    if (maxPrice) searchParams.set("price_max", maxPrice);

    const queryString = searchParams.toString();
    navigate(queryString ? `?${queryString}` : location.pathname);
  };


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen  lg:p-8" aria-labelledby="products-heading">
      <MobileSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        categories={categories}
        activeCategory={activeCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        handleCategoryChange={handleCategoryChange}
        handlePriceChange={handlePriceChange}
        handleResetCategory={handleResetCategory}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />

      <div className="flex flex-col md:flex-row gap-8 ">

        <aside className="hidden lg:block lg:w-[18%] md:sticky top-20  h-fit space-y-6" aria-labelledby="categories-heading">
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
            isMobile={false}
          />
        </aside>


        <section className="flex-1 space-y-2 py-4 lg:py-0" aria-labelledby="products-section-heading">
          <header>
            <h2 id="products-section-heading" className="text-2xl font-bold text-gray-700">
              Products
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''})
              </span>
            </h2>
          </header>

          {loading ? (
            <div className="py-12 flex justify-center items-center">
              <div className="text-xl text-gray-500">Loading products...</div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
              role="grid"
              aria-label="Product grid"
            >
              {filteredProducts.map((product: Product) => (
                <article key={product?.id} role="gridcell">
                  <ProductCard product={product} />
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12" role="status" aria-live="polite">
              <p className="text-gray-500 text-lg">
                No products found matching your filters.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your category or price filters.
              </p>
            </div>
          )}
        </section>

      </div>
    </section>
  );
}



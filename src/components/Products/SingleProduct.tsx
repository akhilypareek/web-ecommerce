import { ArrowLeft, ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIRoutes } from "../../constants/ApiRoutes.js";
import { useCart } from "../../context/CartContext.js";
import Button from "../Controls/Button.js";

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  quantity: number;
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  thumbnail?: string;
  images?: string[];
  category?: Category;
  [key: string]: any; 
}

function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, cartItems, decreaseCartItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cartItem = cartItems.find((item: CartItem) => item.id === product?.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // fetch product 
  useEffect(() => {
    if (!id) return;

    fetch(`${APIRoutes.products}/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load product details");
        return response.json();
      })
      .then((data) => {
        setProduct(data.product || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-page-bg)]">
        <div className="text-xl">Product not found.</div>
      </div>
    );
  }



  return (
    <main className="min-h-screen p-8" aria-labelledby="product-title">
      <div className="max-w-6xl mx-auto space-y-3">
        <Button link="/" text="Back to products" icon={ArrowLeft} />

        <article className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start" itemScope itemType="https://schema.org/Product">
          <section className="overflow-hidden lg:sticky top-8 self-start relative">
            <figure className="h-[350px] rounded-[32px] bg-[var(--color-white-soft)] border border-[var(--color-gray-very-light)] shadow-sm overflow-hidden">
              <img
                src={product.images?.[0] || product.thumbnail || 'https://via.placeholder.com/350'}
                alt={`Product image of ${product.title}`}
                className="w-full h-full object-contain mx-auto"
                itemProp="image"
              />
              {product?.category && (
                <figcaption className="sr-only">Category: {product?.category?.name || "General"}</figcaption>
              )}
            </figure>

            {product?.category && (
              <span className="w-32 text-center absolute top-5 -right-7 rotate-[40deg] uppercase text-xs bg-[var(--color-yellow-soft-fill)] text-white px-2 py-1" role="text" aria-label={`Category: ${product?.category?.name || "General"}`}>
                {product?.category?.name || "General"}
              </span>
            )}
          </section>

          <section className="space-y-6">
            <header className="rounded-[32px] bg-[var(--color-white-soft)] border border-[var(--color-gray-very-light)] shadow-sm p-6">
              <h1 id="product-title" className="text-4xl font-bold text-gray-900" itemProp="name">
                {product.title}
              </h1>
              <p className="mt-4 text-gray-600 leading-relaxed" itemProp="description">
                {product.description}
              </p>
              <div className="justify-between mt-6 flex flex-wrap items-center gap-4">
                <span className="text-3xl font-bold text-[var(--color-green-mint)]" itemProp="price" >
                  ${product.price.toLocaleString()}
                </span>
                {product.discountPercentage && (
                  <span className="text-sm bg-[var(--color-red-soft-bg)] text-[var(--color-red-soft-text)] px-3 py-1 rounded-full" aria-label={`Discount: ${Math.round(product.discountPercentage)}% off`}>
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>
            </header>

            <section aria-labelledby="add-to-cart-heading">
              <h2 id="add-to-cart-heading" className="sr-only">Add to Cart</h2>

              {quantityInCart === 0 ? (
                <Button
                  icon={ShoppingCartIcon}
                  text="Add to Cart"
                  onClick={() => addToCart(product)} // Just pass the product
                />

              ) : (
                <div className="space-y-2">
                  <div className="flex w-full justify-between">
                    <p className="text-sm text-gray-600 mt-1">
                      Qty: <span className="font-semibold text-[var(--color-green-mint)]">{quantityInCart}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Total: <span className="font-semibold text-[var(--color-green-mint)]">${(product.price * quantityInCart).toFixed(2)}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => decreaseCartItem(product.id)}
                      className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full text-gray-700 bg-[var(--color-blue-soft-bg)] transition"
                      aria-label="Decrease quantity"
                      disabled={quantityInCart === 0}
                    >
                      -
                    </button>



                    <button
                      onClick={() => addToCart(product)}

                      className="w-8 h-8 bg-[var(--color-blue-soft-bg)] cursor-pointer flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-300 transition"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}



            </section>
          </section>
        </article>
      </div>
    </main>
  );
}

export default SingleProduct;


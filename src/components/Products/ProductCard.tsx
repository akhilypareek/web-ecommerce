import { ShoppingCartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Button from "../Controls/Button.js";
import type { Product } from "./AllProducts";



interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {

  const navigate = useNavigate();
  const { addToCart, cartItems, decreaseCartItem } = useCart();
  
  // Check if current product is already in cart
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  return (
    <article
      onClick={() => navigate(`/products/${product?.id}`)}
      className="cursor-pointer min-h-[420px] bg-[var(--color-white-soft)] rounded-2xl shadow-sm border border-[var(--color-gray-very-light)] overflow-hidden hover:shadow-md transition-all duration-300 group"
      itemScope
      itemType="https://schema.org/Product"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/products/${product?.id}`);
        }
      }}
      aria-label={`View details for ${product?.title}`}
    >
      {/* Product Image */}
      <figure className="relative overflow-hidden bg-[var(--color-blue-very-light)]">
        <img
          src={
            product?.images?.[0] ||
            product.thumbnail ||
            product?.image ||
            "https://via.placeholder.com/300x300?text=No+Image"
          }
          alt={`Product image of ${product?.title}`}
          className="mx-auto w-52 h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          itemProp="image"
          loading="lazy"
        />

        {product?.category && (
          <figcaption className="w-32 text-center absolute top-5 -right-7 rotate-[40deg] uppercase text-xs bg-[var(--color-yellow-soft-fill)] text-white px-2 py-1" aria-label={`Category: ${product?.category?.name || "General"}`}>
            {product?.category?.name || "General"}
          </figcaption>
        )}
      </figure>

      <section className="p-4 flex flex-col gap-2  h-full ">
        <header>
          <h3 className="text-sm font-semibold text-gray-700 line-clamp-2" itemProp="name">
            {product?.title}
          </h3>
        </header>

        {product?.description && (
          <p className="text-xs text-gray-500 line-clamp-3" itemProp="description">
            {product?.description}
          </p>
        )}

        <span className="text-lg font-bold text-[var(--color-green-mint)]" itemProp="price">
          ${product?.price}
        </span>

        {
          quantityInCart == 0 ?

            (<Button
              icon={ShoppingCartIcon}
              text="Add to Cart"
              onClick={() => addToCart(product)}

            />) :

            (
              <div className="space-y-2">

                <div
                  className="flex  w-full justify-between"
                >

                  <p className="text-sm text-gray-600 mt-1">
                    Qty: <span className="font-semibold text-[var(--color-green-mint)]">
                      ${quantityInCart}
                    </span>
                  </p>




                  <p className="text-sm text-gray-600 mt-1">
                    Total: <span className="font-semibold text-[var(--color-green-mint)]">
                      ${(product.price * quantityInCart).toFixed(2)}
                    </span>
                  </p>

                </div>
                <div className="flex items-center justify-center gap-2">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (quantityInCart > 0) decreaseCartItem(product.id);
                    }}
                    className={`w-8 h-8 cursor-pointer flex items-center justify-center rounded-full text-gray-700 bg-[var(--color-blue-soft-bg)] transition `}
                    aria-label="Decrease quantity"
                    title={quantityInCart === 0 ? "No items to remove" : "Decrease quantity"}
                    disabled={quantityInCart === 0}
                  >
                    -
                  </button>


                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product)
                    }}

                    className="w-8 h-8 bg-[var(--color-blue-soft-bg)] cursor-pointer flex items-center justify-center  rounded-full text-gray-700 hover:bg-gray-300 transition"
                    aria-label="Increase quantity"
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>)
        }

      </section>
    </article>
  );
}

export default ProductCard;



import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext.js";
import Button from "../Controls/Button.js";

export default function Cart() {
    const { cartItems, cartCount, cartTotal, removeFromCart, clearCart } = useCart();

// show when cart is empty
    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-8" aria-labelledby="empty-cart-heading">
                <section className="text-center">
                    <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
                    <h1 id="empty-cart-heading" className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h1>
                    <p className="text-gray-500 mb-6">Add some products to get started!</p>
                    <nav>
                        <Button
                            text="Continue Shopping"
                            icon={ArrowLeft}
                            link="/" />
                    </nav>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-8" aria-labelledby="cart-heading">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <nav>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-[var(--color-blue-soft-text)] hover:underline"
                            aria-label="Continue shopping and browse products"
                        >
                            <ArrowLeft size={16} aria-hidden="true" />
                            Continue Shopping
                        </Link>
                    </nav>
                    <h1 id="cart-heading" className="text-3xl font-bold text-gray-800">Your Cart</h1>
                    <button
                        onClick={clearCart}
                        className="cursor-pointer text-red-500 hover:text-red-700 text-sm font-medium"
                        aria-label="Clear all items from cart"
                    >
                        Clear Cart
                    </button>
                </header>

                <section className="space-y-4" aria-labelledby="cart-items-heading">
                    <h2 id="cart-items-heading" className="sr-only">Cart Items</h2>
                    {cartItems.map((item) => (
                        <article key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-6 hover:shadow-md transition-shadow">
                            <Link
                                to={`/products/${item.id}`}
                                className="flex items-center gap-6 flex-1"
                                aria-label={`View details for ${item.title}`}
                            >
                                <figure>
                                    <img
                                        src={item.thumbnail || item.image || item.images?.[0] || "https://via.placeholder.com/100"}
                                        alt={`Product image of ${item.title}`}
                                        className="w-20 h-20 object-cover rounded-xl"
                                        loading="lazy"
                                    />
                                </figure>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    <p className="text-lg font-bold text-[var(--color-green-mint)]">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </Link>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    removeFromCart(item.id);
                                }}
                                className="cursor-pointer text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                aria-label={`Remove ${item.title} from cart`}
                                title="Remove item"
                            >
                                <Trash2 size={20} aria-hidden="true" />
                            </button>
                        </article>
                    ))}
                </section>

                <section className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6" aria-labelledby="cart-total-heading">
                    <h2 id="cart-total-heading" className="sr-only">Cart Total</h2>
                    <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total ({cartCount} items):</span>
                        <span className="text-[var(--color-green-mint)]" aria-label={`Total price: $${cartTotal.toFixed(2)}`}>
                            ${cartTotal.toFixed(2)}
                        </span>
                    </div>
                </section>
            </div>
        </main>
    );
}
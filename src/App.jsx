import { useEffect, useMemo, useState } from "react";
import Hero from "./components/Hero";
import BookCard from "./components/BookCard";
import Cart from "./components/Cart";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const backend = useMemo(() => import.meta.env.VITE_BACKEND_URL || "http://localhost:8000", []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backend}/books`);
      if (!res.ok) throw new Error("Failed to load books");
      const data = await res.json();
      setBooks(data);
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === book.id);
      if (existing) {
        return prev.map((i) => (i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (book) => {
    setCart((prev) => prev.filter((i) => i.id !== book.id));
  };

  const handleCheckout = async (summary) => {
    try {
      const payload = {
        customer_name: "Guest",
        customer_email: "guest@example.com",
        shipping_address: "N/A",
        items: cart.map((c) => ({ book_id: c.id, title: c.title, price: c.price, quantity: c.quantity })),
        subtotal: summary.subtotal,
        tax: summary.tax,
        total: summary.total,
      };
      const res = await fetch(`${backend}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Checkout failed");
      setCart([]);
      setCartOpen(false);
      alert("Order placed! Thank you.");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Hero onBrowse={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })} />

        <section id="catalog" className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-2xl font-semibold">Catalog</h2>
            <button
              onClick={() => setCartOpen(true)}
              className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg"
            >
              View Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
            </button>
          </div>

          {loading ? (
            <p className="text-blue-200">Loading books...</p>
          ) : error ? (
            <div className="text-red-300">{error}</div>
          ) : books.length === 0 ? (
            <div className="text-blue-200/80">No books yet. Add some via the backend schema viewer or API.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {books.map((b) => (
                <BookCard key={b.id} book={b} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>
      </div>

      {cartOpen && (
        <Cart
          items={cart}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
          onClose={() => setCartOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

import { ShoppingCart } from "lucide-react";

export default function Hero({ onBrowse }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.15),transparent_40%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow">
          Find your next favorite book
        </h1>
        <p className="mt-4 text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto">
          Explore a curated catalog across genres. Fast checkout, beautiful reading.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={onBrowse}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition"
          >
            <ShoppingCart className="w-5 h-5" /> Browse books
          </button>
          <a href="#how" className="text-blue-200 hover:text-white transition">
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}

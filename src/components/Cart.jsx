import { X } from "lucide-react";

export default function Cart({ items, onRemove, onCheckout, onClose }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-700 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-blue-200 hover:text-white"><X /></button>
        </div>

        {items.length === 0 ? (
          <p className="text-blue-200/80">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-xl p-3">
                <div className="w-12 h-16 bg-slate-700 rounded-md flex items-center justify-center">📘</div>
                <div className="flex-1">
                  <p className="text-white font-medium line-clamp-1">{it.title}</p>
                  <p className="text-blue-200/80 text-sm">${it.price.toFixed(2)} × {it.quantity}</p>
                </div>
                <button onClick={() => onRemove(it)} className="text-red-300 hover:text-red-200 text-sm">Remove</button>
              </div>
            ))}

            <div className="border-t border-slate-700 pt-4 space-y-2 text-blue-100">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold text-white"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            <button
              onClick={() => onCheckout({ items, subtotal, tax, total })}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

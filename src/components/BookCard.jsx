export default function BookCard({ book, onAdd }) {
  return (
    <div className="group bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/40 transition">
      <div className="aspect-[3/4] bg-slate-900/50 flex items-center justify-center overflow-hidden">
        {book.cover_url ? (
          <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="text-center p-6">
            <div className="text-6xl">📚</div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold line-clamp-1">{book.title}</h3>
        <p className="text-blue-200/80 text-sm line-clamp-1">{book.author}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-white font-bold">${book.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(book)}
            className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

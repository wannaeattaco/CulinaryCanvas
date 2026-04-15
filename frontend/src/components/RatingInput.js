function StarButton({ active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`transition ${active ? "text-blue-500" : "text-slate-300 hover:text-blue-400"}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 2.75l2.85 5.77 6.37.93-4.61 4.49 1.09 6.34L12 17.28l-5.7 3 1.09-6.34L2.78 9.45l6.37-.93L12 2.75z" />
      </svg>
    </button>
  );
}

function RatingInput({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarButton key={star} active={star <= value} onClick={() => onChange(star)} />
      ))}
    </div>
  );
}

export default RatingInput;

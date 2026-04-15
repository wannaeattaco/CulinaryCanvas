import Icon from "../Icon";

function RecipeModalHero({ recipe, onClose }) {
  return (
    <div className="relative h-64 overflow-hidden bg-slate-100 sm:h-80">
      <img src={recipe.image_url} alt={recipe.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="mb-2 inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
          {recipe.category}
        </span>
        <h2 className="text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
          {recipe.title}
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/20 p-2 text-white transition hover:bg-black/40"
      >
        <Icon path="m6 6 12 12M18 6 6 18" className="h-4 w-4" />
      </button>
    </div>
  );
}

export default RecipeModalHero;

import Icon from "./Icon";
import RatingInput from "./RatingInput";

function RecipeCard({
  recipe,
  currentUser,
  onOpen,
  onFavoriteToggle,
  onRate,
  onEdit,
  onDelete,
}) {
  const canManageRecipe = currentUser.role === "admin" || recipe.user_id === currentUser.id;

  return (
    <article className="mb-6 break-inside-avoid overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-blue-100">
      <button type="button" onClick={() => onOpen(recipe.id)} className="block w-full text-left">
        <img src={recipe.image_url} alt={recipe.title} className="h-auto w-full object-cover" />
      </button>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              {recipe.category}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {recipe.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onFavoriteToggle(recipe)}
            className={`rounded-full p-2 transition ${
              recipe.is_favorite
                ? "bg-blue-900 text-white"
                : "border border-slate-300 text-slate-500 hover:border-blue-700 hover:text-blue-700"
            }`}
            aria-label={recipe.is_favorite ? "Remove favorite" : "Save recipe"}
          >
            <Icon path="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm leading-7 text-slate-600">{recipe.description}</p>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <RatingInput value={recipe.user_rating || 0} onChange={(value) => onRate(recipe.id, value)} />
          <span>{recipe.average_rating.toFixed(1)}</span>
          <span>{recipe.ratings_count} ratings</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onOpen(recipe.id)}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-700"
          >
            View details
          </button>
          {canManageRecipe ? (
            <>
              <button
                type="button"
                onClick={() => onEdit(recipe)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-700"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(recipe.id)}
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;

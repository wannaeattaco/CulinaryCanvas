import Icon from "../Icon";
import RatingInput from "../RatingInput";

function RecipeModalMetaBar({ recipe, canManageRecipe, onFavoriteToggle, onRate, onRecipeEdit, onRecipeDelete }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-5">
      <button
        type="button"
        onClick={() => onFavoriteToggle(recipe)}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
          recipe.is_favorite
            ? "bg-blue-900 text-white"
            : "border border-slate-300 text-slate-700 hover:border-blue-700"
        }`}
      >
        <Icon path="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" className="h-4 w-4" />
        {recipe.is_favorite ? "Saved" : "Save"}
      </button>
      <RatingInput value={recipe.user_rating || 0} onChange={(value) => onRate(recipe.id, value)} />
      <span className="text-sm text-slate-500">
        {recipe.average_rating.toFixed(1)} · {recipe.ratings_count} ratings
      </span>
      {canManageRecipe && (
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => onRecipeEdit(recipe)}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-700"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onRecipeDelete(recipe.id)}
            className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeModalMetaBar;

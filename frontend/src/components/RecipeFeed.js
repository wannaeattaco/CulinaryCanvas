import RecipeCard from "./RecipeCard";

function RecipeFeed({
  loading,
  filteredRecipes,
  activeView,
  user,
  onOpenRecipe,
  onFavoriteToggle,
  onRateRecipe,
  onEditRecipe,
  onDeleteRecipe,
}) {
  if (loading) {
    return (
      <div className="rounded-[32px] border border-blue-100 bg-white p-10 text-center text-sm text-slate-500">
        Loading recipes...
      </div>
    );
  }

  if (!filteredRecipes.length) {
    return (
      <div className="rounded-[32px] border border-dashed border-blue-200 bg-white/80 p-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          {activeView === "saved"
            ? "No saved recipes yet."
            : activeView === "mine"
              ? "You have not posted any recipes yet."
              : "No recipes match this search yet."}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {activeView === "feed"
            ? "Try another keyword or category."
            : "Try another view or adjust your search."}
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
      {filteredRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          currentUser={user}
          onOpen={onOpenRecipe}
          onFavoriteToggle={onFavoriteToggle}
          onRate={onRateRecipe}
          onEdit={onEditRecipe}
          onDelete={onDeleteRecipe}
        />
      ))}
    </div>
  );
}

export default RecipeFeed;

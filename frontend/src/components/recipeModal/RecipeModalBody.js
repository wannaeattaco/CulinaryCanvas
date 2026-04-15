function RecipeModalBody({ recipe }) {
  return (
    <>
      <p className="text-sm leading-7 text-slate-600">{recipe.description}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Ingredients
          </h3>
          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{recipe.ingredients}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Steps
          </h3>
          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{recipe.steps}</p>
        </div>
      </div>
    </>
  );
}

export default RecipeModalBody;

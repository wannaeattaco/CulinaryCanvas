import Icon from "./Icon";
import { inputClass, textareaClass } from "../utils/forms";

function RecipeComposerModal({
  editingRecipeId,
  recipeForm,
  onClose,
  onSubmit,
  onRecipeFormChange,
  onPhotoChange,
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-[32px] bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
              {editingRecipeId ? "Edit recipe" : "New recipe"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {editingRecipeId ? "Update this recipe" : "Create a new recipe"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 p-2 text-slate-500 transition hover:border-blue-700 hover:text-blue-700"
          >
            <Icon path="m6 6 12 12M18 6 6 18" />
          </button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Recipe title</label>
              <input
                required
                minLength={2}
                className={inputClass}
                value={recipeForm.title}
                onChange={(event) => onRecipeFormChange("title", event.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
              <input
                required
                minLength={2}
                className={inputClass}
                value={recipeForm.category}
                onChange={(event) => onRecipeFormChange("category", event.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              required
              minLength={5}
              className={textareaClass}
              value={recipeForm.description}
              onChange={(event) => onRecipeFormChange("description", event.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Ingredients</label>
              <textarea
                required
                minLength={3}
                className={textareaClass}
                value={recipeForm.ingredients}
                onChange={(event) => onRecipeFormChange("ingredients", event.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Cooking steps</label>
              <textarea
                required
                minLength={3}
                className={textareaClass}
                value={recipeForm.steps}
                onChange={(event) => onRecipeFormChange("steps", event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Recipe photo</label>
            <label className="flex cursor-pointer items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-700">
              <input
                required={!editingRecipeId}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPhotoChange}
              />
              <div>
                <p className="text-sm font-medium text-slate-700">Click to upload a recipe photo</p>
                <p className="mt-2 text-xs text-slate-500">
                  PNG, JPG, or any image file supported by your browser
                </p>
              </div>
            </label>
            {recipeForm.image_url ? (
              <div className="overflow-hidden rounded-[28px] border border-blue-100">
                <img src={recipeForm.image_url} alt="Recipe preview" className="h-72 w-full object-cover" />
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-blue-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeComposerModal;

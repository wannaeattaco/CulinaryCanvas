export const emptyRecipeForm = {
  title: "",
  description: "",
  ingredients: "",
  steps: "",
  category: "",
  image_url: "",
};

export const emptyAuthForm = {
  username: "",
  password: "",
  role: "user",
};

export const categories = ["All"];

export const inputClass =
  "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100";

export const textareaClass = `${inputClass} min-h-[110px] resize-y`;

export function validateRecipeForm(recipeForm) {
  if (recipeForm.title.trim().length < 2) {
    return "Recipe title must be at least 2 characters long.";
  }
  if (recipeForm.description.trim().length < 5) {
    return "Recipe description must be at least 5 characters long.";
  }
  if (recipeForm.ingredients.trim().length < 3) {
    return "Ingredients must be at least 3 characters long.";
  }
  if (recipeForm.steps.trim().length < 3) {
    return "Cooking steps must be at least 3 characters long.";
  }
  if (recipeForm.category.trim().length < 2) {
    return "Category must be at least 2 characters long.";
  }
  if (recipeForm.image_url.trim().length < 10) {
    return "Please add a recipe photo before posting.";
  }

  return "";
}

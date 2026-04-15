import { useState } from "react";
import useMineViewGuard from "./catalog/useMineViewGuard";
import { useRecipeFiltering } from "./catalog/useRecipeFiltering";
import useRecipeLoader from "./catalog/useRecipeLoader";
import { normaliseRecipe } from "../../utils/recipes";

function useRecipeCatalog({ user, setError }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeView, setActiveView] = useState("feed");
  const [loading, setLoading] = useState(false);

  const canPostRecipes = user?.role === "admin" || user?.role === "contributor";
  useRecipeLoader({ user, setLoading, setRecipes, setError });
  useMineViewGuard({ activeView, canPostRecipes, setActiveView });

  const filtering = useRecipeFiltering({
    canPostRecipes,
    recipes,
    activeView,
    search,
    category,
    userId: user?.id,
  });

  const updateRecipeInState = (updatedRecipe) => {
    const normalised = normaliseRecipe(updatedRecipe);
    setRecipes((current) =>
      current.map((recipe) => (recipe.id === normalised.id ? { ...recipe, ...normalised } : recipe))
    );
  };

  return {
    recipes,
    setRecipes,
    search,
    setSearch,
    category,
    setCategory,
    activeView,
    setActiveView,
    loading,
    canPostRecipes,
    availableViews: filtering.availableViews,
    filteredRecipes: filtering.filteredRecipes,
    displayedCategories: filtering.displayedCategories,
    updateRecipeInState,
  };
}

export default useRecipeCatalog;

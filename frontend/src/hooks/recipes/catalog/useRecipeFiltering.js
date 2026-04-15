import { useMemo } from "react";

function getAvailableViews(canPostRecipes) {
  return canPostRecipes
    ? [
        { id: "feed", label: "Feed" },
        { id: "saved", label: "Saved" },
        { id: "mine", label: "My Posts" },
      ]
    : [
        { id: "feed", label: "Feed" },
        { id: "saved", label: "Saved" },
      ];
}

function matchesView(recipe, activeView, userId) {
  const predicates = {
    saved: (item) => item.is_favorite,
    mine: (item) => item.user_id === userId,
  };
  const predicate = predicates[activeView] || (() => true);
  return predicate(recipe);
}

function matchesSearchAndCategory(recipe, search, category) {
  const searchable = `${recipe.title} ${recipe.description}`.toLowerCase();
  const matchesSearch = !search.trim() || searchable.includes(search.toLowerCase());
  const matchesCategory = category === "All" || recipe.category === category;
  return matchesSearch && matchesCategory;
}

export function useRecipeFiltering({ canPostRecipes, recipes, activeView, search, category, userId }) {
  const availableViews = useMemo(() => getAvailableViews(canPostRecipes), [canPostRecipes]);

  const filteredRecipes = useMemo(
    () =>
      recipes
        .filter((recipe) => matchesView(recipe, activeView, userId))
        .filter((recipe) => matchesSearchAndCategory(recipe, search, category)),
    [activeView, category, recipes, search, userId]
  );

  const displayedCategories = useMemo(() => {
    const recipeCategories = recipes
      .map((recipe) => recipe.category)
      .filter(Boolean)
      .filter((value, index, array) => array.indexOf(value) === index);
    return ["All", ...new Set(recipeCategories)];
  }, [recipes]);

  return {
    availableViews,
    filteredRecipes,
    displayedCategories,
  };
}

import useRecipeCatalog from "./recipes/useRecipeCatalog";
import useRecipeComposer from "./recipes/useRecipeComposer";
import useRecipeInteractions from "./recipes/useRecipeInteractions";

function useRecipes({ user, setError, setMessage }) {
  const catalog = useRecipeCatalog({ user, setError });
  const composer = useRecipeComposer({
    setRecipes: catalog.setRecipes,
    updateRecipeInState: catalog.updateRecipeInState,
    setError,
    setMessage,
  });
  const interactions = useRecipeInteractions({
    setRecipes: catalog.setRecipes,
    updateRecipeInState: catalog.updateRecipeInState,
    setError,
    setMessage,
  });

  return {
    recipes: catalog.recipes,
    search: catalog.search,
    setSearch: catalog.setSearch,
    category: catalog.category,
    setCategory: catalog.setCategory,
    activeView: catalog.activeView,
    setActiveView: catalog.setActiveView,
    loading: catalog.loading,
    canPostRecipes: catalog.canPostRecipes,
    availableViews: catalog.availableViews,
    filteredRecipes: catalog.filteredRecipes,
    displayedCategories: catalog.displayedCategories,
    recipeForm: composer.recipeForm,
    showComposer: composer.showComposer,
    editingRecipeId: composer.editingRecipeId,
    openComposer: composer.openComposer,
    closeComposer: composer.closeComposer,
    handlePhotoChange: composer.handlePhotoChange,
    handleRecipeFormChange: composer.handleRecipeFormChange,
    handleRecipeSubmit: composer.handleRecipeSubmit,
    handleRecipeEdit: composer.handleRecipeEdit,
    handleRecipeDelete: interactions.handleRecipeDelete,
    handleFavoriteToggle: interactions.handleFavoriteToggle,
    handleRateRecipe: interactions.handleRateRecipe,
  };
}

export default useRecipes;

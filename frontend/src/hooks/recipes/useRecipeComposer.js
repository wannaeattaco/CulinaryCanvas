import { useState } from "react";
import { createRecipe, updateRecipe } from "../../api";
import { emptyRecipeForm, validateRecipeForm } from "../../utils/forms";
import { formatApiError } from "../../utils/errors";
import { normaliseRecipe } from "../../utils/recipes";

function useRecipeComposer({ setRecipes, updateRecipeInState, setError, setMessage }) {
  const [recipeForm, setRecipeForm] = useState(emptyRecipeForm);
  const [showComposer, setShowComposer] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  const handleRecipeFormChange = (field, value) => {
    setRecipeForm((current) => ({ ...current, [field]: value }));
  };

  const openComposer = () => {
    setEditingRecipeId(null);
    setRecipeForm(emptyRecipeForm);
    setShowComposer(true);
  };

  const closeComposer = () => {
    setRecipeForm(emptyRecipeForm);
    setEditingRecipeId(null);
    setShowComposer(false);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      handleRecipeFormChange("image_url", typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  };

  const handleRecipeSubmit = async (event) => {
    event.preventDefault();
    const validationMessage = validateRecipeForm(recipeForm);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    try {
      if (editingRecipeId) {
        const response = await updateRecipe(editingRecipeId, recipeForm);
        updateRecipeInState(response.data);
        setMessage("Recipe updated.");
      } else {
        const response = await createRecipe(recipeForm);
        setRecipes((current) => [normaliseRecipe(response.data), ...current]);
        setMessage("Recipe posted.");
      }
      closeComposer();
    } catch (requestError) {
      setError(formatApiError(requestError, "Unable to save this recipe right now."));
    }
  };

  const handleRecipeEdit = (recipe) => {
    setRecipeForm({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      category: recipe.category,
      image_url: recipe.image_url,
    });
    setEditingRecipeId(recipe.id);
    setShowComposer(true);
  };

  return {
    recipeForm,
    showComposer,
    editingRecipeId,
    openComposer,
    closeComposer,
    handlePhotoChange,
    handleRecipeFormChange,
    handleRecipeSubmit,
    handleRecipeEdit,
  };
}

export default useRecipeComposer;

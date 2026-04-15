import { useEffect, useMemo, useState } from "react";
import { getComments } from "../../api";

function useRecipeDetailComments({ recipes, user, setError }) {
  const [detailRecipeId, setDetailRecipeId] = useState(null);
  const [commentsByRecipe, setCommentsByRecipe] = useState({});

  const detailRecipe = useMemo(
    () => recipes.find((recipe) => recipe.id === detailRecipeId) || null,
    [recipes, detailRecipeId]
  );

  useEffect(() => {
    if (!detailRecipeId || !user) {
      return;
    }

    getComments(detailRecipeId)
      .then((response) => {
        setCommentsByRecipe((current) => ({ ...current, [detailRecipeId]: response.data }));
      })
      .catch(() => {
        setError("Unable to load comments right now.");
      });
  }, [detailRecipeId, setError, user]);

  const setCommentsForRecipe = (recipeId, nextComments) => {
    setCommentsByRecipe((current) => ({ ...current, [recipeId]: nextComments }));
  };

  const refreshComments = async (recipeId) => {
    const response = await getComments(recipeId);
    setCommentsForRecipe(recipeId, response.data);
  };

  const closeRecipeDetail = (clearReplyingTo) => {
    setDetailRecipeId(null);
    clearReplyingTo();
  };

  const handleRecipeDeleted = (recipeId) => {
    setDetailRecipeId((current) => (current === recipeId ? null : current));
    setCommentsByRecipe((current) => {
      const next = { ...current };
      delete next[recipeId];
      return next;
    });
  };

  return {
    detailRecipe,
    detailRecipeId,
    setDetailRecipeId,
    comments: detailRecipe ? commentsByRecipe[detailRecipe.id] || [] : [],
    setCommentsForRecipe,
    refreshComments,
    closeRecipeDetail,
    handleRecipeDeleted,
  };
}

export default useRecipeDetailComments;

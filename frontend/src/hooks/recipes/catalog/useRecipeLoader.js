import { useEffect } from "react";
import { getRecipes } from "../../../api";
import { normaliseRecipe } from "../../../utils/recipes";

function useRecipeLoader({ user, setLoading, setRecipes, setError }) {
  useEffect(() => {
    if (!user) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    getRecipes()
      .then((response) => {
        setRecipes(response.data.map(normaliseRecipe));
      })
      .catch(() => {
        setError("Unable to load recipes right now.");
      })
      .finally(() => setLoading(false));
  }, [setError, setLoading, setRecipes, user]);
}

export default useRecipeLoader;

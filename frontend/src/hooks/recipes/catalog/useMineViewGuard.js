import { useEffect } from "react";

function useMineViewGuard({ activeView, canPostRecipes, setActiveView }) {
  useEffect(() => {
    if (activeView === "mine" && !canPostRecipes) {
      setActiveView("feed");
    }
  }, [activeView, canPostRecipes, setActiveView]);
}

export default useMineViewGuard;

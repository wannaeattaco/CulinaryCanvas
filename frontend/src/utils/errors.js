export function formatApiError(error, fallback) {
  const detail = error?.response?.data?.detail;

  if (Array.isArray(detail)) {
    const firstError = detail[0];
    const field = firstError?.loc?.[firstError.loc.length - 1];
    const mapping = {
      username: "Username must be at least 3 characters long.",
      password: "Password must be at least 6 characters long.",
      title: "Recipe title must be at least 2 characters long.",
      description: "Recipe description must be at least 5 characters long.",
      ingredients: "Ingredients must be at least 3 characters long.",
      steps: "Cooking steps must be at least 3 characters long.",
      category: "Category must be at least 2 characters long.",
      image_url: "Please add a recipe photo before posting.",
      content: "Comment must not be empty.",
    };

    if (mapping[field]) {
      return mapping[field];
    }

    return firstError?.msg || fallback;
  }

  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }

  return fallback;
}

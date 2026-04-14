from fastapi import HTTPException, status


def ensure_recipe_exists(recipe):
    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found",
        )


def ensure_recipe_modifiable(recipe, current_user):
    if current_user.role != "admin" and recipe.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only modify your own recipes",
        )


def to_recipe_response(recipe, rating_summary, is_favorite: bool, user_rating):
    return {
        "id": recipe.id,
        "title": recipe.title,
        "description": recipe.description,
        "ingredients": recipe.ingredients,
        "steps": recipe.steps,
        "category": recipe.category,
        "image_url": recipe.image_url,
        "user_id": recipe.user_id,
        "average_rating": rating_summary["average_rating"],
        "ratings_count": rating_summary["ratings_count"],
        "is_favorite": is_favorite,
        "user_rating": user_rating,
    }

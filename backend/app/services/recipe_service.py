from fastapi import HTTPException, status

from app.models.recipe import Recipe
from app.repository import favorite_repo, rating_repo, recipe_repo


def serialize_recipe(db, recipe: Recipe, current_user=None):
    rating_summary = rating_repo.get_rating_summary(db, recipe.id)
    favorite_ids = (
        favorite_repo.get_favorite_recipe_ids(db, current_user.id) if current_user else set()
    )
    user_rating = None
    if current_user:
        current_user_rating = rating_repo.get_rating_for_user(db, recipe.id, current_user.id)
        user_rating = current_user_rating.value if current_user_rating else None

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
        "is_favorite": recipe.id in favorite_ids,
        "user_rating": user_rating,
    }


def create_recipe(db, data, current_user):
    recipe = Recipe(**data.model_dump(), user_id=current_user.id)
    created_recipe = recipe_repo.create_recipe(db, recipe)
    return serialize_recipe(db, created_recipe, current_user)


def get_recipes(db, query=None, category=None, current_user=None):
    recipes = recipe_repo.get_all_recipes(db, query=query, category=category)
    return [serialize_recipe(db, recipe, current_user) for recipe in recipes]


def get_recipe(db, recipe_id, current_user=None):
    recipe = recipe_repo.get_recipe_by_id(db, recipe_id)
    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found",
        )
    return serialize_recipe(db, recipe, current_user)


def update_recipe(db, recipe_id, data, current_user):
    db_recipe = recipe_repo.get_recipe_by_id(db, recipe_id)
    if not db_recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found",
        )

    if current_user.role != "admin" and db_recipe.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only edit your own recipes",
        )

    updated_recipe = recipe_repo.update_recipe(db, db_recipe, data.model_dump())
    return serialize_recipe(db, updated_recipe, current_user)


def delete_recipe(db, recipe_id, current_user):
    db_recipe = recipe_repo.get_recipe_by_id(db, recipe_id)
    if not db_recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found",
        )

    if current_user.role != "admin" and db_recipe.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own recipes",
        )

    recipe_repo.delete_recipe(db, db_recipe)
    return {"message": "Recipe deleted"}

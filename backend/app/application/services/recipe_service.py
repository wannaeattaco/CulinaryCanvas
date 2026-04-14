from app.data.repositories import favorite_repository, rating_repository, recipe_repository
from app.domain.modules import recipe_domain
from app.models.recipe import Recipe


def _serialize_recipe(db, recipe, current_user=None):
    rating_summary = rating_repository.get_summary(db, recipe.id)
    favorite_ids = (
        favorite_repository.get_recipe_ids_for_user(db, current_user.id) if current_user else set()
    )
    current_user_rating = (
        rating_repository.get_for_user(db, recipe.id, current_user.id) if current_user else None
    )

    return recipe_domain.to_recipe_response(
        recipe=recipe,
        rating_summary=rating_summary,
        is_favorite=recipe.id in favorite_ids,
        user_rating=current_user_rating.value if current_user_rating else None,
    )


def create_recipe(db, data, current_user):
    recipe = Recipe(**data.model_dump(), user_id=current_user.id)
    created_recipe = recipe_repository.create(db, recipe)
    return _serialize_recipe(db, created_recipe, current_user)


def list_recipes(db, query=None, category=None, current_user=None):
    recipes = recipe_repository.list_all(db, query=query, category=category)
    return [_serialize_recipe(db, recipe, current_user) for recipe in recipes]


def get_recipe(db, recipe_id: int, current_user=None):
    recipe = recipe_repository.get_by_id(db, recipe_id)
    recipe_domain.ensure_recipe_exists(recipe)
    return _serialize_recipe(db, recipe, current_user)


def update_recipe(db, recipe_id: int, data, current_user):
    recipe = recipe_repository.get_by_id(db, recipe_id)
    recipe_domain.ensure_recipe_exists(recipe)
    recipe_domain.ensure_recipe_modifiable(recipe, current_user)
    updated_recipe = recipe_repository.update(db, recipe, data.model_dump())
    return _serialize_recipe(db, updated_recipe, current_user)


def delete_recipe(db, recipe_id: int, current_user):
    recipe = recipe_repository.get_by_id(db, recipe_id)
    recipe_domain.ensure_recipe_exists(recipe)
    recipe_domain.ensure_recipe_modifiable(recipe, current_user)
    recipe_repository.delete(db, recipe)
    return {"message": "Recipe deleted"}

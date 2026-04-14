from app.data.repositories import favorite_repository, recipe_repository
from app.domain.modules import favorite_domain


def get_favorites(db, current_user):
    favorite_ids = favorite_repository.get_recipe_ids_for_user(db, current_user.id)
    recipes = recipe_repository.list_all(db)
    return [recipe for recipe in recipes if recipe.id in favorite_ids]


def set_favorite(db, recipe_id: int, is_favorite: bool, current_user):
    recipe = recipe_repository.get_by_id(db, recipe_id)
    favorite_domain.ensure_favorite_recipe_exists(recipe)
    favorite_repository.set_value(db, recipe_id, current_user.id, is_favorite)
    return favorite_domain.to_favorite_response(is_favorite)

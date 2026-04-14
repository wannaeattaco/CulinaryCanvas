from app.data.repositories import rating_repository, recipe_repository
from app.domain.modules import rating_domain


def get_rating_summary(db, recipe_id: int, current_user=None):
    recipe = recipe_repository.get_by_id(db, recipe_id)
    rating_domain.ensure_rating_recipe_exists(recipe)

    summary = rating_repository.get_summary(db, recipe_id)
    user_rating = None
    if current_user:
        existing_rating = rating_repository.get_for_user(db, recipe_id, current_user.id)
        user_rating = existing_rating.value if existing_rating else None

    return rating_domain.to_rating_summary_response(summary, user_rating)


def set_rating(db, recipe_id: int, value: int, current_user):
    recipe = recipe_repository.get_by_id(db, recipe_id)
    rating_domain.ensure_rating_recipe_exists(recipe)
    rating_repository.upsert(db, recipe_id, current_user.id, value)
    summary = rating_repository.get_summary(db, recipe_id)
    return rating_domain.to_rating_summary_response(summary, value)

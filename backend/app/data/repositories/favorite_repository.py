from app.models.favorite import Favorite


def get_one(db, recipe_id: int, user_id: int):
    return (
        db.query(Favorite)
        .filter(Favorite.recipe_id == recipe_id, Favorite.user_id == user_id)
        .first()
    )


def set_value(db, recipe_id: int, user_id: int, value: bool):
    favorite = get_one(db, recipe_id, user_id)

    if value and not favorite:
        favorite = Favorite(recipe_id=recipe_id, user_id=user_id)
        db.add(favorite)
        db.commit()
        db.refresh(favorite)
        return True

    if not value and favorite:
        db.delete(favorite)
        db.commit()

    return value


def get_recipe_ids_for_user(db, user_id: int):
    favorites = db.query(Favorite).filter(Favorite.user_id == user_id).all()
    return {favorite.recipe_id for favorite in favorites}

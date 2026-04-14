from fastapi import HTTPException, status


def ensure_favorite_recipe_exists(recipe):
    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found",
        )


def to_favorite_response(is_favorite: bool):
    return {"is_favorite": is_favorite}

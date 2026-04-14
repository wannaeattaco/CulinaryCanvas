from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.application.services import favorite_service, recipe_service
from app.config.database import get_db
from app.core.deps import get_current_user
from app.schemas.favorite import FavoriteToggleResponse

router = APIRouter(prefix="/favorites", tags=["favorites"])


@router.get("/")
def get_favorites(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    recipes = favorite_service.get_favorites(db, current_user)
    return [recipe_service._serialize_recipe(db, recipe, current_user) for recipe in recipes]


@router.post("/recipe/{recipe_id}", response_model=FavoriteToggleResponse)
def add_favorite(
    recipe_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return favorite_service.set_favorite(db, recipe_id, True, current_user)


@router.delete("/recipe/{recipe_id}", response_model=FavoriteToggleResponse)
def remove_favorite(
    recipe_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return favorite_service.set_favorite(db, recipe_id, False, current_user)

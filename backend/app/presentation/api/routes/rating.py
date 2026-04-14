from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.application.services import rating_service
from app.config.database import get_db
from app.core.deps import get_current_user
from app.schemas.rating import RatingCreate, RatingSummary

router = APIRouter(prefix="/ratings", tags=["ratings"])


@router.get("/recipe/{recipe_id}", response_model=RatingSummary)
def get_rating_summary(
    recipe_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return rating_service.get_rating_summary(db, recipe_id, current_user)


@router.post("/recipe/{recipe_id}", response_model=RatingSummary)
def set_rating(
    recipe_id: int,
    data: RatingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return rating_service.set_rating(db, recipe_id, data.value, current_user)

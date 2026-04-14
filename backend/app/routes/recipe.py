from typing import Optional

from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.core.deps import get_current_user, require_contributor_or_admin
from app.core.security import decode_token
from app.models.user import User
from app.schemas.recipe import RecipeCreate, RecipeOut, RecipeUpdate
from app.services import recipe_service

router = APIRouter(prefix="/recipes", tags=["recipes"])
optional_bearer = HTTPBearer(auto_error=False)


def get_optional_user(
    credentials: HTTPAuthorizationCredentials = Depends(optional_bearer),
    db: Session = Depends(get_db),
):
    if not credentials:
        return None

    payload = decode_token(credentials.credentials)
    if not payload or payload.get("sub") is None:
        return None

    return db.query(User).filter(User.id == int(payload["sub"])).first()


@router.post("/", response_model=RecipeOut)
def create_recipe(
    data: RecipeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_contributor_or_admin),
):
    return recipe_service.create_recipe(db, data, current_user)


@router.get("/", response_model=list[RecipeOut])
def get_all(
    query: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user=Depends(get_optional_user),
):
    return recipe_service.get_recipes(db, query=query, category=category, current_user=current_user)


@router.get("/{recipe_id}", response_model=RecipeOut)
def get_one(
    recipe_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_optional_user),
):
    return recipe_service.get_recipe(db, recipe_id, current_user)


@router.put("/{recipe_id}", response_model=RecipeOut)
def update(
    recipe_id: int,
    recipe: RecipeUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_contributor_or_admin),
):
    return recipe_service.update_recipe(db, recipe_id, recipe, current_user)


@router.delete("/{recipe_id}")
def delete(
    recipe_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return recipe_service.delete_recipe(db, recipe_id, current_user)

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.application.services import comment_service
from app.config.database import get_db
from app.core.deps import get_current_user
from app.schemas.comment import CommentCreate, CommentLikeOut, CommentOut

router = APIRouter(prefix="/comments", tags=["comments"])


@router.get("/recipe/{recipe_id}", response_model=list[CommentOut])
def get_comments(
    recipe_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return comment_service.list_comments(db, recipe_id, current_user)


@router.post("/recipe/{recipe_id}", response_model=CommentOut)
def create_comment(
    recipe_id: int,
    data: CommentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return comment_service.create_comment(db, recipe_id, data, current_user)


@router.put("/{comment_id}", response_model=CommentOut)
def update_comment(
    comment_id: int,
    data: CommentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return comment_service.update_comment(db, comment_id, data, current_user)


@router.post("/{comment_id}/like", response_model=CommentLikeOut)
def like_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return comment_service.like_comment(db, comment_id, current_user)


@router.delete("/{comment_id}/like", response_model=CommentLikeOut)
def unlike_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return comment_service.unlike_comment(db, comment_id, current_user)


@router.delete("/{comment_id}")
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return comment_service.delete_comment(db, comment_id, current_user)

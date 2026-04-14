from sqlalchemy.orm import joinedload

from app.models.comment import Comment
from app.models.comment_like import CommentLike


def create(db, comment: Comment):
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def list_by_recipe(db, recipe_id: int):
    return (
        db.query(Comment)
        .options(joinedload(Comment.author), joinedload(Comment.likes))
        .filter(Comment.recipe_id == recipe_id)
        .order_by(Comment.created_at.asc())
        .all()
    )


def get_by_id(db, comment_id: int):
    return (
        db.query(Comment)
        .options(joinedload(Comment.author), joinedload(Comment.likes))
        .filter(Comment.id == comment_id)
        .first()
    )


def update(db, comment: Comment, content: str):
    comment.content = content
    db.commit()
    db.refresh(comment)
    return comment


def delete(db, comment: Comment):
    db.delete(comment)
    db.commit()


def get_like(db, comment_id: int, user_id: int):
    return (
        db.query(CommentLike)
        .filter(CommentLike.comment_id == comment_id, CommentLike.user_id == user_id)
        .first()
    )


def like(db, comment_id: int, user_id: int):
    existing_like = get_like(db, comment_id, user_id)
    if existing_like:
        return existing_like

    like = CommentLike(comment_id=comment_id, user_id=user_id)
    db.add(like)
    db.commit()
    db.refresh(like)
    return like


def unlike(db, comment_id: int, user_id: int):
    existing_like = get_like(db, comment_id, user_id)
    if existing_like:
        db.delete(existing_like)
        db.commit()

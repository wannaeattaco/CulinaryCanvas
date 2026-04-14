from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, Field


class CommentCreate(BaseModel):
    content: str = Field(min_length=1, max_length=500)
    parent_id: int | None = None


class CommentOut(BaseModel):
    id: int
    content: str
    recipe_id: int
    user_id: int
    username: str
    parent_id: int | None = None
    created_at: datetime
    likes_count: int = 0
    is_liked: bool = False
    replies: list["CommentOut"] = Field(default_factory=list)


class CommentLikeOut(BaseModel):
    likes_count: int
    is_liked: bool


CommentOut.model_rebuild()

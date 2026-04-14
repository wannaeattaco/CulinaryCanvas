from app.domain.modules.comment_tree import build_comment_tree
from app.domain.modules.comment_validation import (
    ensure_comment_exists,
    ensure_comment_modifiable,
    ensure_comment_recipe_exists,
    ensure_valid_reply_target,
)


def to_comment_like_response(comment_payload: dict):
    return {
        "likes_count": comment_payload["likes_count"],
        "is_liked": comment_payload["is_liked"],
    }

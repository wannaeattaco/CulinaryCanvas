from fastapi import HTTPException, status


def ensure_comment_recipe_exists(recipe):
    if recipe:
        return

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Recipe not found",
    )


def ensure_comment_exists(comment):
    if comment:
        return

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Comment not found",
    )


def ensure_comment_modifiable(comment, current_user):
    if current_user.role == "admin" or comment.user_id == current_user.id:
        return

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You can only modify your own comments",
    )


def ensure_valid_reply_target(parent_comment, recipe_id: int):
    if parent_comment and parent_comment.recipe_id == recipe_id:
        return

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Reply target is invalid",
    )

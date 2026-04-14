from app.data.repositories import comment_repository, recipe_repository
from app.domain.modules import comment_domain
from app.models.comment import Comment


def create_comment(db, recipe_id: int, data, current_user):
    recipe = recipe_repository.get_by_id(db, recipe_id)
    comment_domain.ensure_comment_recipe_exists(recipe)

    if data.parent_id:
        parent_comment = comment_repository.get_by_id(db, data.parent_id)
        comment_domain.ensure_valid_reply_target(parent_comment, recipe_id)

    comment = Comment(
        content=data.content,
        recipe_id=recipe_id,
        user_id=current_user.id,
        parent_id=data.parent_id,
    )
    created_comment = comment_repository.create(db, comment)
    loaded_comment = comment_repository.get_by_id(db, created_comment.id)
    return comment_domain.build_comment_tree([loaded_comment], current_user)[0]


def list_comments(db, recipe_id: int, current_user=None):
    recipe = recipe_repository.get_by_id(db, recipe_id)
    comment_domain.ensure_comment_recipe_exists(recipe)
    comments = comment_repository.list_by_recipe(db, recipe_id)
    return comment_domain.build_comment_tree(comments, current_user)


def update_comment(db, comment_id: int, data, current_user):
    comment = comment_repository.get_by_id(db, comment_id)
    comment_domain.ensure_comment_exists(comment)
    comment_domain.ensure_comment_modifiable(comment, current_user)
    updated_comment = comment_repository.update(db, comment, data.content)
    loaded_comment = comment_repository.get_by_id(db, updated_comment.id)
    return comment_domain.build_comment_tree([loaded_comment], current_user)[0]


def delete_comment(db, comment_id: int, current_user):
    comment = comment_repository.get_by_id(db, comment_id)
    comment_domain.ensure_comment_exists(comment)
    comment_domain.ensure_comment_modifiable(comment, current_user)
    comment_repository.delete(db, comment)
    return {"message": "Comment deleted"}


def like_comment(db, comment_id: int, current_user):
    comment = comment_repository.get_by_id(db, comment_id)
    comment_domain.ensure_comment_exists(comment)
    comment_repository.like(db, comment_id, current_user.id)
    loaded_comment = comment_repository.get_by_id(db, comment_id)
    payload = comment_domain.build_comment_tree([loaded_comment], current_user)[0]
    return comment_domain.to_comment_like_response(payload)


def unlike_comment(db, comment_id: int, current_user):
    comment = comment_repository.get_by_id(db, comment_id)
    comment_domain.ensure_comment_exists(comment)
    comment_repository.unlike(db, comment_id, current_user.id)
    loaded_comment = comment_repository.get_by_id(db, comment_id)
    payload = comment_domain.build_comment_tree([loaded_comment], current_user)[0]
    return comment_domain.to_comment_like_response(payload)

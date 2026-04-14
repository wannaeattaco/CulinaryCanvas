def build_comment_tree(comments, current_user=None):
    comment_map = {}
    root_comments = []
    current_user_id = current_user.id if current_user else None

    for comment in comments:
        comment_map[comment.id] = {
            "id": comment.id,
            "content": comment.content,
            "recipe_id": comment.recipe_id,
            "user_id": comment.user_id,
            "username": comment.author.username if comment.author else f"User {comment.user_id}",
            "parent_id": comment.parent_id,
            "created_at": comment.created_at,
            "likes_count": len(comment.likes),
            "is_liked": bool(
                current_user_id and any(like.user_id == current_user_id for like in comment.likes)
            ),
            "replies": [],
        }

    for comment in comments:
        node = comment_map[comment.id]
        if comment.parent_id and comment.parent_id in comment_map:
            comment_map[comment.parent_id]["replies"].append(node)
            continue
        root_comments.append(node)

    return root_comments

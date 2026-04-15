import { likeComment, unlikeComment } from "../../../api";

export async function toggleCommentLike({
  recipeId,
  comment,
  refreshComments,
  setError,
}) {
  try {
    if (comment.is_liked) {
      await unlikeComment(comment.id);
    } else {
      await likeComment(comment.id);
    }
    await refreshComments(recipeId);
  } catch {
    setError("Unable to update comment likes right now.");
  }
}

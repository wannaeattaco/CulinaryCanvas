import { deleteComment, updateComment } from "../../../api";
import { formatApiError } from "../../../utils/errors";

export async function saveCommentEdit({
  recipeId,
  commentId,
  content,
  refreshComments,
  clearCommentEdit,
  setError,
  setMessage,
}) {
  if (!content?.trim()) {
    setError("Comment must not be empty.");
    return;
  }

  try {
    await updateComment(commentId, { content, parent_id: null });
    await refreshComments(recipeId);
    clearCommentEdit(commentId);
    setMessage("Comment updated.");
  } catch (requestError) {
    setError(formatApiError(requestError, "Unable to update comment right now."));
  }
}

export async function removeComment({ recipeId, commentId, refreshComments, setError, setMessage }) {
  try {
    await deleteComment(commentId);
    await refreshComments(recipeId);
    setMessage("Comment deleted.");
  } catch {
    setError("Unable to delete comment right now.");
  }
}

import { createComment } from "../../../api";
import { formatApiError } from "../../../utils/errors";

export async function submitComment({
  recipeId,
  commentDraft,
  comments,
  setCommentsForRecipe,
  setCommentDraft,
  setError,
  setMessage,
}) {
  if (!commentDraft?.trim()) {
    setError("Comment must not be empty.");
    return;
  }

  try {
    const response = await createComment(recipeId, { content: commentDraft, parent_id: null });
    setCommentsForRecipe(recipeId, [...comments, response.data]);
    setCommentDraft("");
    setMessage("Comment added.");
  } catch (requestError) {
    setError(formatApiError(requestError, "Unable to post comment right now."));
  }
}

export async function submitReply({
  recipeId,
  parentId,
  replyContent,
  refreshComments,
  setReplyDraft,
  clearReplyingTo,
  setError,
  setMessage,
}) {
  if (!replyContent?.trim()) {
    setError("Comment must not be empty.");
    return;
  }

  try {
    await createComment(recipeId, { content: replyContent, parent_id: parentId });
    await refreshComments(recipeId);
    setReplyDraft(parentId, "");
    clearReplyingTo();
    setMessage("Reply added.");
  } catch (requestError) {
    setError(formatApiError(requestError, "Unable to post reply right now."));
  }
}

import { removeComment, saveCommentEdit } from "./commentActions/manageActions";
import { toggleCommentLike } from "./commentActions/reactionActions";
import { submitComment, submitReply } from "./commentActions/submitActions";

function useCommentActions({
  detailRecipe,
  comments,
  setCommentsForRecipe,
  refreshComments,
  commentDraft,
  setCommentDraft,
  replyDrafts,
  setReplyDraft,
  clearReplyingTo,
  commentEdits,
  clearCommentEdit,
  setError,
  setMessage,
}) {
  const getRecipeId = () => detailRecipe?.id ?? null;
  const withRecipe = (handler) => async (...args) => {
    const recipeId = getRecipeId();
    if (!recipeId) {
      return;
    }
    await handler(recipeId, ...args);
  };

  const handleCommentSubmit = withRecipe(async (recipeId) => {
    await submitComment({
      recipeId,
      commentDraft,
      comments,
      setCommentsForRecipe,
      setCommentDraft,
      setError,
      setMessage,
    });
  });

  const handleReplySubmit = withRecipe(async (recipeId, parentId) => {
    const replyContent = replyDrafts[parentId] || "";
    await submitReply({
      recipeId,
      parentId,
      replyContent,
      refreshComments,
      setReplyDraft,
      clearReplyingTo,
      setError,
      setMessage,
    });
  });

  const handleCommentEditSave = withRecipe(async (recipeId, commentId) => {
    const content = commentEdits[commentId];
    await saveCommentEdit({
      recipeId,
      commentId,
      content,
      refreshComments,
      clearCommentEdit,
      setError,
      setMessage,
    });
  });

  const handleCommentDelete = withRecipe(async (recipeId, commentId) => {
    await removeComment({ recipeId, commentId, refreshComments, setError, setMessage });
  });

  const handleCommentLikeToggle = withRecipe(async (recipeId, comment) => {
    await toggleCommentLike({ recipeId, comment, refreshComments, setError });
  });

  return {
    handleCommentSubmit,
    handleReplySubmit,
    handleCommentEditSave,
    handleCommentDelete,
    handleCommentLikeToggle,
  };
}

export default useCommentActions;

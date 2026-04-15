import useCommentActions from "./comments/useCommentActions";
import useCommentDraftState from "./comments/useCommentDraftState";
import useRecipeDetailComments from "./comments/useRecipeDetailComments";

function useRecipeComments({ recipes, user, setError, setMessage }) {
  const detail = useRecipeDetailComments({ recipes, user, setError });
  const drafts = useCommentDraftState({ detailRecipe: detail.detailRecipe });
  const actions = useCommentActions({
    detailRecipe: detail.detailRecipe,
    comments: detail.comments,
    setCommentsForRecipe: detail.setCommentsForRecipe,
    refreshComments: detail.refreshComments,
    commentDraft: drafts.commentDraft,
    setCommentDraft: drafts.setCommentDraft,
    replyDrafts: drafts.replyDrafts,
    setReplyDraft: drafts.setReplyDraft,
    clearReplyingTo: drafts.clearReplyingTo,
    commentEdits: drafts.commentEdits,
    clearCommentEdit: drafts.clearCommentEdit,
    setError,
    setMessage,
  });

  return {
    detailRecipe: detail.detailRecipe,
    detailRecipeId: detail.detailRecipeId,
    setDetailRecipeId: detail.setDetailRecipeId,
    closeRecipeDetail: () => detail.closeRecipeDetail(drafts.clearReplyingTo),
    comments: detail.comments,
    commentDraft: drafts.commentDraft,
    setCommentDraft: drafts.setCommentDraft,
    commentEdits: drafts.commentEdits,
    setCommentEdit: drafts.setCommentEdit,
    clearCommentEdit: drafts.clearCommentEdit,
    handleCommentEditStart: drafts.handleCommentEditStart,
    handleCommentEditSave: actions.handleCommentEditSave,
    handleCommentDelete: actions.handleCommentDelete,
    handleCommentLikeToggle: actions.handleCommentLikeToggle,
    replyDrafts: drafts.replyDrafts,
    setReplyDraft: drafts.setReplyDraft,
    replyingTo: drafts.replyingTo,
    setReplyingTo: drafts.setReplyingTo,
    handleCommentSubmit: actions.handleCommentSubmit,
    handleReplySubmit: actions.handleReplySubmit,
    handleRecipeDeleted: detail.handleRecipeDeleted,
  };
}

export default useRecipeComments;

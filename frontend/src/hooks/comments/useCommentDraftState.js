import { useState } from "react";

function useCommentDraftState({ detailRecipe }) {
  const [commentDrafts, setCommentDrafts] = useState({});
  const [commentEdits, setCommentEdits] = useState({});
  const [replyDrafts, setReplyDrafts] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);

  const clearReplyingTo = () => setReplyingTo(null);

  const clearCommentEdit = (commentId) => {
    setCommentEdits((current) => {
      const next = { ...current };
      delete next[commentId];
      return next;
    });
  };

  const commentDraft = detailRecipe ? commentDrafts[detailRecipe.id] || "" : "";

  const setCommentDraft = (value) => {
    if (!detailRecipe) {
      return;
    }

    setCommentDrafts((current) => ({ ...current, [detailRecipe.id]: value }));
  };

  const setCommentEdit = (commentId, value) => {
    setCommentEdits((current) => ({ ...current, [commentId]: value }));
  };

  const setReplyDraft = (commentId, value) => {
    setReplyDrafts((current) => ({ ...current, [commentId]: value }));
  };

  const handleCommentEditStart = (comment) => {
    setCommentEdits((current) => ({ ...current, [comment.id]: comment.content }));
  };

  return {
    commentEdits,
    commentDraft,
    setCommentDraft,
    setCommentEdit,
    clearCommentEdit,
    handleCommentEditStart,
    replyDrafts,
    setReplyDraft,
    replyingTo,
    setReplyingTo,
    clearReplyingTo,
  };
}

export default useCommentDraftState;

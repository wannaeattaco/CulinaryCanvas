import CommentItem from "../CommentItem";

function RecipeModalComments({
  comments,
  user,
  draft,
  onDraftChange,
  onCommentSubmit,
  commentEdits,
  onCommentEditStart,
  onCommentEditChange,
  onCommentEditCancel,
  onCommentEditSave,
  onCommentDelete,
  onCommentLikeToggle,
  replyDrafts,
  replyingTo,
  onReplyToggle,
  onReplyDraftChange,
  onReplySubmit,
}) {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 pt-5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Comments</h3>
      <div className="rounded-2xl bg-slate-50 p-4">
        <textarea
          className="min-h-[90px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-700"
          placeholder="Share your thoughts on this recipe"
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={onCommentSubmit}
            className="rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white"
          >
            Post comment
          </button>
        </div>
      </div>
      {comments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          No comments yet. Be the first to add one.
        </div>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUser={user}
            editDraft={commentEdits[comment.id]}
            onEditDraftChange={onCommentEditChange}
            onEditStart={onCommentEditStart}
            onEditCancel={onCommentEditCancel}
            onEditSave={onCommentEditSave}
            onDelete={onCommentDelete}
            onLikeToggle={onCommentLikeToggle}
            replyDraft={replyDrafts[comment.id] || ""}
            onReplyDraftChange={onReplyDraftChange}
            onReplyToggle={onReplyToggle}
            onReplySubmit={onReplySubmit}
            activeReplyId={replyingTo}
          />
        ))
      )}
    </div>
  );
}

export default RecipeModalComments;

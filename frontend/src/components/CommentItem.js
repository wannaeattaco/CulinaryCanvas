import CommentActionBar from "./comment/CommentActionBar";
import CommentEditBox from "./comment/CommentEditBox";
import CommentHeader from "./comment/CommentHeader";
import ReplyEditor from "./comment/ReplyEditor";

function CommentItem({
  comment,
  currentUser,
  editDraft,
  onEditDraftChange,
  onEditStart,
  onEditCancel,
  onEditSave,
  onDelete,
  onLikeToggle,
  replyDraft,
  onReplyDraftChange,
  onReplyToggle,
  onReplySubmit,
  activeReplyId,
}) {
  const isOwner = currentUser && currentUser.id === comment.user_id;
  const isEditing = editDraft !== undefined;
  const isReplying = activeReplyId === comment.id;
  const replies = comment.replies || [];

  return (
    <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
      <CommentHeader username={comment.username} createdAt={comment.created_at} />
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <CommentEditBox
            commentId={comment.id}
            editDraft={editDraft}
            onEditDraftChange={onEditDraftChange}
            onEditSave={onEditSave}
            onEditCancel={onEditCancel}
          />
        ) : (
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">{comment.content}</p>
        )}
        <CommentActionBar
          comment={comment}
          isOwner={isOwner}
          onLikeToggle={onLikeToggle}
          onReplyToggle={onReplyToggle}
          onEditStart={onEditStart}
          onDelete={onDelete}
        />
        {isReplying && (
          <ReplyEditor
            username={comment.username}
            commentId={comment.id}
            replyDraft={replyDraft}
            onReplyDraftChange={onReplyDraftChange}
            onReplySubmit={onReplySubmit}
            onReplyToggle={onReplyToggle}
          />
        )}
      </div>
      {replies.length > 0 && (
        <div className="ml-6 space-y-3 border-l border-stone-200 pl-4">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              editDraft={editDraft}
              onEditDraftChange={onEditDraftChange}
              onEditStart={onEditStart}
              onEditCancel={onEditCancel}
              onEditSave={onEditSave}
              onDelete={onDelete}
              onLikeToggle={onLikeToggle}
              replyDraft={replyDraft}
              onReplyDraftChange={onReplyDraftChange}
              onReplyToggle={onReplyToggle}
              onReplySubmit={onReplySubmit}
              activeReplyId={activeReplyId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;

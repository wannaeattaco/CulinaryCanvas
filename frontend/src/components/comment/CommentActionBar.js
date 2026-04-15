import Icon from "../Icon";

function CommentActionBar({
  comment,
  isOwner,
  onLikeToggle,
  onReplyToggle,
  onEditStart,
  onDelete,
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
      <button
        type="button"
        onClick={() => onLikeToggle(comment)}
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 transition ${
          comment.is_liked ? "bg-blue-100 text-blue-700" : "hover:bg-slate-200"
        }`}
      >
        <Icon
          path="M12 21s-6.5-4.35-8.5-8.03C1.9 9.96 3.31 6.5 6.84 6.5c1.94 0 3.16 1.04 4.16 2.3 1-1.26 2.22-2.3 4.16-2.3 3.53 0 4.94 3.46 3.34 6.47C18.5 16.65 12 21 12 21Z"
          className="h-4 w-4"
        />
        {comment.likes_count}
      </button>
      <button
        type="button"
        onClick={() => onReplyToggle(comment.id)}
        className="rounded-full px-2 py-1 hover:bg-slate-200"
      >
        Reply
      </button>
      {isOwner && (
        <>
          <button
            type="button"
            onClick={() => onEditStart(comment)}
            className="rounded-full px-2 py-1 hover:bg-slate-200"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(comment.id)}
            className="rounded-full px-2 py-1 text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default CommentActionBar;

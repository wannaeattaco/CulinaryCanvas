function CommentEditBox({ commentId, editDraft, onEditDraftChange, onEditSave, onEditCancel }) {
  return (
    <div className="mt-3 space-y-2">
      <textarea
        className="min-h-[90px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-700"
        value={editDraft}
        onChange={(event) => onEditDraftChange(commentId, event.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onEditSave(commentId)}
          className="rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => onEditCancel(commentId)}
          className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CommentEditBox;

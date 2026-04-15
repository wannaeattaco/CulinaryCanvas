import { getAvatarLabel } from "../../utils/recipes";

function CommentHeader({ username, createdAt }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-xs font-semibold text-white">
        {getAvatarLabel(username)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-slate-900">{username}</p>
          <span className="text-xs text-slate-500">{new Date(createdAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentHeader;

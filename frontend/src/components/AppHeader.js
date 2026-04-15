import Icon from "./Icon";

function AppHeader({
  activeView,
  availableViews,
  canPostRecipes,
  user,
  onChangeView,
  onOpenComposer,
  onLogout,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-blue-200 bg-[#0f172a] text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <p className="shrink-0 text-3xl font-semibold tracking-tight">CulinaryCanvas</p>

        <div className="flex flex-1 items-center justify-center gap-1">
          {availableViews.map((view) => (
            <button
              key={view.id}
              type="button"
              onClick={() => onChangeView(view.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeView === view.id
                  ? "bg-white text-slate-900"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        <div className="shrink-0 flex items-center gap-3">
          {canPostRecipes ? (
            <button
              type="button"
              onClick={onOpenComposer}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-blue-50"
            >
              + Post Recipe
            </button>
          ) : null}
          <div className="hidden flex-col items-end leading-tight sm:flex">
            <span className="text-sm font-medium text-white">{user.username}</span>
            <span className="text-[11px] uppercase tracking-wider text-white/50">{user.role}</span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full border border-white/15 p-2 text-white/80 transition hover:border-white/40 hover:text-white"
            aria-label="Log out"
          >
            <Icon path="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;

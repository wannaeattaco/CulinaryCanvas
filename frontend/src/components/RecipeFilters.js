import Icon from "./Icon";

function RecipeFilters({
  activeView,
  availableViews,
  search,
  category,
  displayedCategories,
  onChangeView,
  onSearchChange,
  onCategoryChange,
}) {
  return (
    <>
      <div className="sticky top-[73px] z-30 border-b border-blue-100 bg-[#eff6ff]/95 backdrop-blur">
        <div className="mx-auto grid max-w-6xl gap-3 px-6 py-4 sm:grid-cols-[minmax(0,1.8fr)_minmax(220px,0.8fr)] sm:px-8 lg:px-10">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon path="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
            </span>
            <input
              className="w-full rounded-full border border-slate-300 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-blue-700"
              placeholder="Search recipes, details, or titles"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
          <select
            className="appearance-none rounded-full border border-slate-300 bg-white py-3 pl-4 pr-10 text-sm outline-none transition focus:border-blue-700"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundPosition: "right 14px center",
              backgroundRepeat: "no-repeat",
            }}
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            {displayedCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3 md:hidden">
        {availableViews.map((view) => (
          <button
            key={view.id}
            type="button"
            onClick={() => onChangeView(view.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeView === view.id
                ? "bg-blue-900 text-white"
                : "border border-slate-300 bg-white text-slate-700"
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default RecipeFilters;

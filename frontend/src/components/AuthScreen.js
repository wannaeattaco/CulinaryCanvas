import { inputClass } from "../utils/forms";

function AuthScreen({ authMode, authForm, onAuthFormChange, onSubmit, onModeChange }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_35%),linear-gradient(180deg,_#eff6ff,_#dbeafe)] px-4 py-12">
      <div className="mx-auto grid max-w-6xl items-start gap-10 pt-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <p className="text-4xl font-semibold tracking-tight text-stone-950">CulinaryCanvas</p>
          <div className="space-y-4">
            <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              A recipe feed built for discovering beautiful food.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Discover, rate, save, and discuss recipes in one clean gallery.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] bg-white/80 p-5 shadow-sm ring-1 ring-blue-100">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                Explore
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Browse photo-first recipes with ingredients, steps, and categories.
              </p>
            </div>
            <div className="rounded-[28px] bg-white/80 p-5 shadow-sm ring-1 ring-blue-100">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                Review
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Rate recipes, edit comments, like replies, and join the conversation.
              </p>
            </div>
            <div className="rounded-[28px] bg-white/80 p-5 shadow-sm ring-1 ring-blue-100">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                Organize
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Search recipes fast and browse by category in a clean feed layout.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-8 shadow-xl ring-1 ring-blue-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
                Welcome
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {authMode === "login" ? "Log in" : "Create account"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onModeChange(authMode === "login" ? "register" : "login")}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-700"
            >
              {authMode === "login" ? "Create a new account" : "Back to login"}
            </button>
          </div>

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
              <input
                required
                minLength={3}
                className={inputClass}
                value={authForm.username}
                onChange={(event) => onAuthFormChange("username", event.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                required
                minLength={6}
                type="password"
                className={inputClass}
                value={authForm.password}
                onChange={(event) => onAuthFormChange("password", event.target.value)}
              />
              {authMode === "register" ? (
                <p className="mt-2 text-xs text-slate-500">Use at least 6 characters.</p>
              ) : null}
            </div>
            {authMode === "register" ? (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
                <select
                  className={`${inputClass} appearance-none pr-10`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                    backgroundPosition: "right 16px center",
                    backgroundRepeat: "no-repeat",
                  }}
                  value={authForm.role}
                  onChange={(event) => onAuthFormChange("role", event.target.value)}
                >
                  <option value="user">User</option>
                  <option value="contributor">Contributor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            ) : null}
            <button
              type="submit"
              className="w-full rounded-full bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              {authMode === "login" ? "Log in" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;

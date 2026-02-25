import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(search.trim());
  };

  const handleClear = () => {
    setSearch("");
    onSearch("");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <span className="rounded-lg bg-gradient-to-tr from-red-500 to-orange-400 px-2 py-1 text-xs font-bold uppercase tracking-widest text-white">
              Web
            </span>
            <span className="hidden text-lg font-semibold tracking-tight text-white sm:inline">
              XemPhim
            </span>
          </button>

          <nav className="hidden items-center gap-4 text-sm font-medium text-slate-300 md:flex">
            {routes
              .filter((route) => route.showInHeader)
              .map((route) => (
                <button
                  key={route.path}
                  type="button"
                  onClick={() => navigate(route.path)}
                  className={`relative px-1 pb-0.5 transition-colors ${
                    (route.path === "/"
                      ? currentPath === "/"
                      : currentPath.startsWith(route.path))
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {route.label}
                  {(route.path === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(route.path)) && (
                    <span className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-full rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
                  )}
                </button>
              ))}
          </nav>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 items-center justify-end gap-3"
        >
          <div className="flex w-full max-w-xs items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-100 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-red-500/70 sm:max-w-sm">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400 sm:text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-3 py-1 text-[11px] font-semibold text-white shadow-sm hover:from-red-400 hover:to-orange-300"
            >
              Tìm
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;

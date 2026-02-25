import { useContext, useMemo, useState } from "react";
import { MovieContext } from "../context/MovieDetailContext";

const MovieSearch = ({ data, favorites, onToggleFavorite }) => {
  const { handleVideoTrailer } = useContext(MovieContext);
  const [minRating, setMinRating] = useState(0);
  const [yearFilter, setYearFilter] = useState("all");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const ratingOk =
        !minRating || (item.vote_average || 0) >= Number(minRating);
      const year =
        item.release_date?.slice(0, 4) ||
        item.first_air_date?.slice(0, 4) ||
        "";
      const yearOk =
        yearFilter === "all" ||
        (year && yearFilter === "2020plus" && Number(year) >= 2020) ||
        (year && yearFilter === "before2020" && Number(year) < 2020);
      return ratingOk && yearOk;
    });
  }, [data, minRating, yearFilter]);

  return (
    <section className="my-8 max-w-full">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-semibold uppercase tracking-wide text-white md:text-xl">
            Kết quả tìm kiếm
          </h2>
          <p className="text-xs text-slate-400">
            Tìm thấy {filteredData.length} / {data.length} phim
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <span className="text-slate-300">Điểm IMDb tối thiểu</span>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="rounded-full border border-white/10 bg-black/40 px-2 py-1 text-xs text-slate-100 outline-none"
            >
              <option value={0}>Bất kỳ</option>
              <option value={7}>7.0</option>
              <option value={8}>8.0</option>
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
            <span className="text-slate-300">Năm phát hành</span>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="rounded-full border border-white/10 bg-black/40 px-2 py-1 text-xs text-slate-100 outline-none"
            >
              <option value="all">Tất cả</option>
              <option value="2020plus">Từ 2020 trở lên</option>
              <option value="before2020">Trước 2020</option>
            </select>
          </div>
          {(minRating || yearFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setMinRating(0);
                setYearFilter("all");
              }}
              className="rounded-full border border-white/20 bg-transparent px-3 py-1 text-xs font-medium text-slate-200 hover:bg-white/5"
            >
              Xóa lọc
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {filteredData.map((item) => {
          const isFavorite = favorites?.some(
            (movie) => movie.id === item.id
          );
          const year =
            item.release_date?.slice(0, 4) ||
            item.first_air_date?.slice(0, 4) ||
            "";
          const rating = item.vote_average
            ? item.vote_average.toFixed(1)
            : null;

          return (
            <div
              key={item.id}
              className="group relative h-[260px] w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-900/80 shadow-lg shadow-black/40 transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl md:h-[280px]"
              onClick={() => handleVideoTrailer(item.id)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${
                    item.poster_path
                  })`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent opacity-90" />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite?.(item);
                }}
                className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/60 px-2 py-1 text-xs font-semibold text-slate-100 shadow-sm backdrop-blur"
              >
                <span
                  className={
                    isFavorite ? "text-red-400" : "text-slate-300"
                  }
                >
                  ♥
                </span>
              </button>

              {rating && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-black/60 px-2 py-1 text-[11px] font-medium text-yellow-300 backdrop-blur">
                  ⭐ {rating}
                </span>
              )}

              {year && (
                <span className="absolute left-3 bottom-14 z-10 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-100">
                  {year}
                </span>
              )}

              <div className="relative z-10 flex h-full flex-col justify-end p-3">
                <h3 className="line-clamp-2 text-xs font-semibold text-white md:text-sm">
                  {item.name || item.title || item.original_title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MovieSearch;

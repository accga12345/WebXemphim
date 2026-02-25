import clsx from "clsx";
import { useContext } from "react";
import { MovieContext } from "../context/MovieDetailContext";

const MovieItem = ({
  movie,
  isFavorite,
  onToggleFavorite,
  variant = "carousel",
}) => {
  const { handleVideoTrailer } = useContext(MovieContext);

  if (!movie) return null;

  const title = movie.name || movie.title || movie.original_title;
  const year =
    movie.release_date?.slice(0, 4) ||
    movie.first_air_date?.slice(0, 4) ||
    "";
  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : null;

  if (variant === "grid") {
    return (
      <div
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-900/80 shadow-lg shadow-black/40"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <img
            src={
              movie.poster_path
                ? `${import.meta.env.VITE_IMG_URL}${movie.poster_path}`
                : ""
            }
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onClick={() => handleVideoTrailer(movie.id)}
          />

          <button
            type="button"
            onClick={() => onToggleFavorite?.(movie)}
            className="absolute right-2 top-2 z-10 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/60 px-2 py-1 text-xs font-semibold text-slate-100 shadow-sm backdrop-blur"
          >
            <span
              className={
                isFavorite ? "text-red-400" : "text-slate-300"
              }
            >
              ♥
            </span>
          </button>

          {year && (
            <span className="absolute left-2 bottom-2 z-10 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-slate-100 backdrop-blur">
              {year}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-2">
          <h3 className="line-clamp-2 text-xs font-semibold text-white md:text-sm">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative h-[280px] w-[190px] cursor-pointer overflow-hidden rounded-2xl bg-slate-900/80 shadow-lg shadow-black/40 transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl md:h-[300px] md:w-[200px]"
      onClick={() => handleVideoTrailer(movie.id)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${
            movie.poster_path
          })`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent opacity-90" />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.(movie);
        }}
        className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/60 px-2 py-1 text-xs font-semibold text-slate-100 shadow-sm backdrop-blur"
      >
        <span
          className={clsx(
            isFavorite ? "text-red-400" : "text-slate-300"
          )}
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
        <span className="absolute left-3 bottom-16 z-10 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-100">
          {year}
        </span>
      )}

      <div className="relative z-10 flex h-full flex-col justify-end p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-white">
          {title}
        </h3>
      </div>
    </div>
  );
};


export default MovieItem;


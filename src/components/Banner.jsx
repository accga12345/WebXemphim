import { useContext } from "react";
import IconRatingHalf from "../assets/rating-half.png";
import IconRating from "../assets/rating.png";
import IconPlay from "../assets/play-button.png";
import { MovieContext } from "../context/MovieDetailContext";

const Banner = ({ movie }) => {
  const { handleVideoTrailer } = useContext(MovieContext);

  if (!movie) {
    return null;
  }

  const title = movie.title || movie.name || movie.original_title;
  const overview =
    movie.overview ||
    "Khám phá bộ phim mới nhất cùng giao diện xem phim mượt mà, dễ dùng và đầy cảm hứng.";
  const year =
    movie.release_date?.slice(0, 4) ||
    movie.first_air_date?.slice(0, 4) ||
    "";
  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : null;
  const rating5 = movie.vote_average
    ? Math.max(0, Math.min(5, movie.vote_average / 2))
    : 0;
  const fullStars = Math.floor(rating5);
  const hasHalfStar = rating5 - fullStars >= 0.5;
  const posterUrl = movie.poster_path
    ? `${import.meta.env.VITE_IMG_URL}${movie.poster_path}`
    : null;
  const backdropUrl = movie.backdrop_path
    ? `${import.meta.env.VITE_IMG_URL}${movie.backdrop_path}`
    : posterUrl;

  const handlePlay = () => {
    if (handleVideoTrailer && movie.id) {
      handleVideoTrailer(movie.id);
    }
  };

  return (
    <section
      className="relative mt-2 overflow-hidden rounded-3xl bg-cover bg-center shadow-2xl ring-1 ring-white/10"
      style={
        backdropUrl
          ? { backgroundImage: `url(${backdropUrl})` }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />

      <div className="relative flex flex-col gap-10 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-14">
        <div className="flex w-full flex-col gap-6 md:w-1/2">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
            Phim mới nhất
          </p>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <div
                className="flex items-center gap-1"
                aria-label={
                  rating ? `Đánh giá ${rating}/10` : "Chưa có đánh giá"
                }
              >
                {Array.from({ length: 5 }).map((_, idx) => {
                  const isFull = idx < fullStars;
                  const isHalf = idx === fullStars && hasHalfStar;
                  const src = isHalf ? IconRatingHalf : IconRating;
                  const className = isFull || isHalf ? "h-5 w-5" : "h-5 w-5 opacity-30";
                  return (
                    <img
                      key={idx}
                      src={src}
                      alt=""
                      className={className}
                    />
                  );
                })}
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-100">
                {year || "Mới"} • Điện ảnh
                {rating ? ` • ${rating}/10 IMDb` : ""}
              </span>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-200 md:text-base line-clamp-4">
              {overview}
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/30 hover:from-red-400 hover:to-orange-300"
            >
              <span>Xem ngay</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-slate-100 hover:bg-white/10">
              Chi tiết phim
            </button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center md:w-1/2">
          <div className="relative h-[260px] w-[180px] overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl shadow-black/60 md:h-[320px] md:w-[220px]">
            <button
              type="button"
              onClick={handlePlay}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-sm transition-opacity duration-500 ease-out hover:opacity-100"
            >
              <img src={IconPlay} alt="play" className="h-14 w-14" />
            </button>
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

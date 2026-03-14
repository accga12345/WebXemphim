import { useState } from "react";
import MovieItem from "../components/MovieItem";
import { getTrendingMovies } from "../services/movieService";

const TrendingPage = ({ trendingMovies, favorites, onToggleFavorite }) => {
  const [movies, setMovies] = useState(trendingMovies || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextPage = page + 1;

    try {
      const data = await getTrendingMovies(nextPage);
      const results = data.results || [];
      setMovies((prev) => [...prev, ...results]);
      setPage(nextPage);
      if (!results.length || results.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-4 max-w-full">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold uppercase tracking-wide text-white md:text-2xl">
          Tất cả phim trending
        </h1>
        <p className="text-xs text-slate-400">
          {movies.length} phim
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
        {movies.map((movie) => {
          const isFavorite = favorites?.some(
            (item) => item.id === movie.id
          );
          return (
            <MovieItem
              key={movie.id}
              movie={movie}
              isFavorite={!!isFavorite}
              onToggleFavorite={onToggleFavorite}
              variant="grid"
            />
          );
        })}
      </div>

      {movies.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loading || !hasMore}
            className={`rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide ${
              hasMore
                ? "bg-white/10 text-orange-300 hover:bg-white/20"
                : "bg-white/5 text-slate-400 cursor-not-allowed"
            }`}
          >
            {loading
              ? "Đang tải..."
              : hasMore
              ? "Xem thêm"
              : "Hết phim"}
          </button>
        </div>
      )}
    </section>
  );
};

export default TrendingPage;



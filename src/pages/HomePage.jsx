import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import MovieItem from "../components/MovieItem";

const HomePage = ({
  trendingMovies,
  topRatedMovies,
  nowPlayingMovies,
  favorites,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const newestMovie = useMemo(() => {
    const allMovies = [
      ...(nowPlayingMovies || []),
      ...(trendingMovies || []),
      ...(topRatedMovies || []),
    ];
    if (!allMovies.length) return null;

    const sorted = allMovies
      .filter((movie) => movie.release_date || movie.first_air_date)
      .sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date);
        const dateB = new Date(b.release_date || b.first_air_date);
        return dateB - dateA;
      });

    return sorted[0] || allMovies[0];
  }, [nowPlayingMovies, trendingMovies, topRatedMovies]);

  const gridMovies = useMemo(
    () => (trendingMovies || []).slice(0, 10),
    [trendingMovies]
  );

  return (
    <>
      <Banner movie={newestMovie} />

      <MovieList
        title="Phim hot hôm nay"
        data={trendingMovies.slice(0, 10)}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      <MovieList
        title="Phim đề cử"
        data={topRatedMovies.slice(0, 10)}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {favorites?.length > 0 && (
        <MovieList
          title="Phim yêu thích của bạn"
          data={favorites.slice(0, 10)}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}

      <section className="my-8 max-w-full">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-white md:text-xl">
            Danh sách phim
          </h2>
          <button
            type="button"
            onClick={() => navigate("/trending")}
            className="rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300 hover:bg-white/20"
          >
            Xem thêm
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {gridMovies.map((movie) => {
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
      </section>
    </>
  );
};


export default HomePage;


import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { MovieProvider } from "./context/MovieDetailContext";
import { getAllHomeData, searchMovies } from "./services/movieService";
import routes from "./routes";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const [searchData, setSearchData] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
      // ignore write errors
    }
  }, [favorites]);

  const toggleFavorite = (movie) => {
    if (!movie) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  const handleSearch = async (value) => {
    if (value === "") {
      setSearchData([]);
      navigate("/");
      return;
    }
    try {
      const data = await searchMovies(value);
      setSearchData(data.results || []);
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const data = await getAllHomeData();
        setTrendingMovies(data.trendingMovies);
        setTopRatedMovies(data.topRatedMovies);
        setNowPlayingMovies(data.nowPlayingMovies);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <MovieProvider>
      <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 text-slate-50">
        <Header onSearch={handleSearch} />

        <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-28 pb-16">
          <Routes>
            {routes.map(({ path, page: Page }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Page
                    trendingMovies={trendingMovies}
                    topRatedMovies={topRatedMovies}
                    nowPlayingMovies={nowPlayingMovies}
                    searchData={searchData}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                  />
                }
              />
            ))}
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;

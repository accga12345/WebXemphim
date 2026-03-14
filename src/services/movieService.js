const API_BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export const getTrendingMovies = async (page = 1) => {
  const res = await fetch(`${API_BASE_URL}/trending/movie/day?language=vi&page=${page}`, options);
  return res.json();
};

export const getTopRatedMovies = async (page = 1) => {
  const res = await fetch(`${API_BASE_URL}/movie/top_rated?language=vi&page=${page}`, options);
  return res.json();
};

export const getNowPlayingMovies = async () => {
  const res = await fetch(`${API_BASE_URL}/movie/now_playing?language=vi&page=1`, options);
  return res.json();
};

export const searchMovies = async (query) => {
  if (!query || query.trim() === "") return { results: [] };
  
  const res = await fetch(
    `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=vi&page=1`,
    options
  );
  return res.json();
};

export const getMovieDetails = async (movieId) => {
  const res = await fetch(`${API_BASE_URL}/movie/${movieId}?language=vi`, options);
  return res.json();
};

export const getMovieTrailer = async (movieId) => {
  const res = await fetch(`${API_BASE_URL}/movie/${movieId}/videos?language=en-US`, options);
  return res.json();
};

export const getAllHomeData = async () => {
  try {
    const [trending, topRated, nowPlaying] = await Promise.all([
      getTrendingMovies(),
      getTopRatedMovies(),
      getNowPlayingMovies(),
    ]);

    return {
      trendingMovies: trending.results || [],
      topRatedMovies: topRated.results || [],
      nowPlayingMovies: nowPlaying.results || [],
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      trendingMovies: [],
      topRatedMovies: [],
      nowPlayingMovies: [],
    };
  }
};

import MovieSearch from "../components/MovieSearch";

const SearchPage = ({ searchData, favorites, onToggleFavorite }) => {
  const hasSearchResults = searchData && searchData.length > 0;

  if (!hasSearchResults) {
    return (
      <p className="text-sm text-slate-400">
        Không tìm thấy phim phù hợp. Hãy thử từ khóa khác.
      </p>
    );
  }

  return (
    <MovieSearch
      data={searchData}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

export default SearchPage;


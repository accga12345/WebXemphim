import PropTypes from "prop-types";
import MovieList from "../components/MovieList";

const FavoritesPage = ({ favorites, onToggleFavorite }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        Bạn chưa thêm phim nào vào mục yêu thích. Hãy bấm vào biểu tượng trái tim trên poster phim để lưu lại.
      </p>
    );
  }

  return (
    <MovieList
      title="Danh sách phim yêu thích"
      data={favorites}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

FavoritesPage.propTypes = {
  favorites: PropTypes.array,
  onToggleFavorite: PropTypes.func,
};

export default FavoritesPage;


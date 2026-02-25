import HomePage from "../pages/HomePage";
import TrendingPage from "../pages/TrendingPage";
import TopRatedPage from "../pages/TopRatedPage";
import FavoritesPage from "../pages/FavoritesPage";
import SearchPage from "../pages/SearchPage";

const routes = [
  {
    path: "/",
    page: HomePage,
    label: "Trang chủ",
    showInHeader: true,
  },
  {
    path: "/trending",
    page: TrendingPage,
    label: "Đang hot",
    showInHeader: true,
  },
  {
    path: "/top-rated",
    page: TopRatedPage,
    label: "Đánh giá cao",
    showInHeader: true,
  },
  {
    path: "/favorites",
    page: FavoritesPage,
    label: "Yêu thích",
    showInHeader: true,
  },
  {
    path: "/search",
    page: SearchPage,
    label: "Tìm kiếm",
    showInHeader: false,
  },
];

export default routes;


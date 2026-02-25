import { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../context/MovieDetailContext";
import MovieItem from "./MovieItem";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, data, favorites, onToggleFavorite }) => {
  return (
    <section className="my-8 max-w-full">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold uppercase tracking-wide text-white md:text-xl">
          {title}
        </h2>
        <p className="text-xs text-slate-400">
          {data?.length || 0} phim
        </p>
      </div>

      <Carousel
        responsive={responsive}
        draggable={false}
        itemClass="px-1 md:px-2"
      >
        {data?.map((movie) => {
          const isFavorite = favorites?.some(
            (item) => item.id === movie.id
          );

          return (
            <MovieItem
              key={movie.id}
              movie={movie}
              isFavorite={!!isFavorite}
              onToggleFavorite={onToggleFavorite}
              variant="carousel"
            />
          );
        })}
      </Carousel>
    </section>
  );
};


export default MovieList;

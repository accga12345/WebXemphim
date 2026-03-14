import { createContext, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { getMovieTrailer } from "../services/movieService";

const MovieContext = createContext();

const opts = {
  width: "900",
  height: "500",
  playerVars: {
    autoplay: 1,
  },
};

const MovieProvider = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleVideoTrailer = async (movieId) => {
    try {
      const data = await getMovieTrailer(movieId);
      setTrailerUrl(data.results[0]?.key);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MovieContext.Provider value={{ handleVideoTrailer }}>
      {children}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        {trailerUrl && (
          <div className="flex items-center justify-center mt-5">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </Modal>
    </MovieContext.Provider>
  );
};


export { MovieProvider, MovieContext };

import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import styles from './MovieResults.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const MovieResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=5ee426334d2a65170e91b3ab1bb7fb1a&query=${query}`
        );

        setMovies(response.data.results);
      } catch (error) {
        console.log('Error occurred while fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleShowTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=5ee426334d2a65170e91b3ab1bb7fb1a`
      );

      const trailers = response.data.results.filter(
        (trailer) => trailer.type.toLowerCase() === 'trailer'
      );

      if (trailers.length > 0) {
        setSelectedMovie(trailers[0].key);
      } else {
        console.log('No trailers found for the movie');
      }
    } catch (error) {
      console.log('Error occurred while fetching trailers:', error);
    }
  };

  const handleCloseTrailer = () => {
    setSelectedMovie(null);
  };

  return(
    <div className={styles.container}>
      <h4>Search results for: {query}</h4>
      <Link to="/">Home</Link>
      <div className={styles['movie-list']}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles['movie-card']}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              className={styles['movie-poster']}
              onClick={() => handleShowTrailer(movie.id)}
            />
            <div className={styles['movie-title']}>{movie.title}</div>
          </div>
        ))}
      </div>
      {selectedMovie && (
    <div className={styles.trailer}>
        <div className={styles['youtube-wrapper']}>
            <YouTube videoId={selectedMovie} className={styles['youtube-player']} />
        </div>
        <button className={styles['close-button']} onClick={handleCloseTrailer}>Close</button>
    </div>
)}
    </div>
  );
};

export default MovieResults;

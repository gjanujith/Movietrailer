import React, { useEffect, useState } from 'react';
import axios from '../constants/Axios';
import { API_KEY, imageUrl } from '../constants/Constants';
import './Banner.css';
import Youtube from 'react-youtube';

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [urlId, setUrlId] = useState('');

  useEffect(() => {
    axios
      .get(`/trending/movie/day?api_key=5ee426334d2a65170e91b3ab1bb7fb1a`)
      .then((response) => {
        const randomIndex = Math.floor(
          Math.random() * response.data.results.length
        );
        setMovie(response.data.results[randomIndex]);
      });
  }, []);

  const opts = {
    height: '350',
    width: '99.5%',
    playerVars: {
      autoplay: 0,
    },
  };

  const handlePlay = () => {
    axios
      .get(`/movie/${movie.id}/videos?language=en-US'&api_key=${API_KEY}`)
      .then((response) => {
        const videos = response.data.results.filter(
          (video) => video.type === 'Trailer'
        );
        if (videos.length !== 0) {
          setUrlId(videos[0]);
        } else {
          console.log('No trailer videos found for this movie.');
        {}
        }
      });
  };

  const handleClose = () => {
    setUrlId('');
  };

  return (
    <header
    className='banner'
    style={{
      backgroundSize: 'cover',
      backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)), linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)), url(${movie ? imageUrl + movie.backdrop_path : ''})`,
      backgroundPosition: 'center center',
    }}
  >
    {movie && (
      <div className='banner__contents'>
        <h6 className='banner__title'>
          {movie.title || movie.name || movie.original_name}
        </h6>
        <h6 className='banner__description'>
          {movie.overview}
        </h6>
        <div className='banner__buttons'>
          <button className='button-2' onClick={handlePlay}>
            <span className='play'>Play</span>
          </button>
        </div>
      </div>
    )}
{urlId && (
  <div className='banner__youtube'>
    <div className='youtube-wrapper'>
      <Youtube opts={opts} videoId={urlId.key} />
    </div>
    <button className='banner__close-button' onClick={handleClose}>
      Close
    </button>
  </div>
)}
  </header>
  );
};

export default Banner;

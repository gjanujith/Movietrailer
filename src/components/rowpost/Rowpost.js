import React, { useEffect, useState } from 'react';
import axios from '../constants/Axios';
import { API_KEY, imageUrl } from '../constants/Constants';
import './Rowpost.css';
import Youtube from 'react-youtube';

const Rowpost = (props) => {
  const [series, setSeries] = useState([]);
  const [urlId, setUrlId] = useState('');

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setSeries(response.data.results);
      console.log(response.data.results);
    });
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const handleMovie = (id) => {
    axios
      .get(`/movie/${id}/videos?language=en-US'&api_key=${API_KEY}`)
      .then((response) => {
        const videos = response.data.results.filter(
          (video) => video.type === 'Trailer'
        );
        if (videos.length !== 0) {
          setUrlId(videos[0]);
        } else {
          console.log('No trailer videos found for this movie.');
        }
      });
  };

  const handleClose = () => {
    setUrlId('');
  };

  return (
    <div className='content-item'>
      <h4 className='titles'>{props.title}</h4>
      <div className='posters'>
        {series.map((obj) => (
          <div>
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            src={`${imageUrl + obj.poster_path}`}
            alt=''
          />
          <h6 className='title-movie'>{obj.title}</h6>
          </div>
          
        ))}
      </div>
      {urlId && (
        <div>
          <Youtube opts={opts} videoId={urlId.key} />
          <button className='button-38' onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Rowpost;
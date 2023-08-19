import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MovieSearch.module.css'; // import your CSS module

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = (e) => {
      e.preventDefault();
      navigate(`/search/${query}`);
    };

  return (
    <div className={styles.container}>
      <div className={styles.title}>MovieTrailer</div>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.button} type="submit">Search</button>
      </form>
    </div>
  );
};

export default MovieSearch;

import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.Title}
          releaseDate={movie.Release_date}
          openingText={movie.Opening_text}
          onDeleteMovie={props.onDeleteMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;

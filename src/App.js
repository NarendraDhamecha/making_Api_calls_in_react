import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Input from "./components/Input";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let title = null;
  let openingText = null;
  let releaseDate = null;

  const titleHandler = (e) => {
    title = e.target.value
  };

  const openingTextHandler = (e) => {
    openingText = e.target.value
  }

  const releaseDateHandler = (e) => {
    releaseDate = e.target.value
  }

  const addMovieHandler = (e) => {
    e.preventDefault();
    const inputDetails = {
      Title: title,
      Opening_Text: openingText,
      Release_Date: releaseDate
    }

    console.log(inputDetails);
    
  };

  // useEffect(() => {

  //   fetchMoviesHandler();
  //   console.log('useeffect called');
  // },[fetchMoviesHandler])

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();

      const transFormedData = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });

      setMovies(transFormedData);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>no data found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = error;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <Input
          onTitle={titleHandler}
          onOpeningText={openingTextHandler}
          onReleaseDate={releaseDateHandler}
          onAddMovie={addMovieHandler}
        />
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

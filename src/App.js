import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Input from "./components/Input";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestType, setRequestType] = useState(0)

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://learning-http-request-d46f1-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "content-type": "movie-app",
        },
      }
    );
    if(response.ok){
      setRequestType(requestType + 1);
    }
  };

  const deleteMovieHandler = async (id) => {
    const response = await fetch(
      `https://learning-http-request-d46f1-default-rtdb.firebaseio.com/movies/${id}.json`,
      { method: "DELETE" }
    );

    if(response.ok){
      setRequestType(requestType + 1);
    }
  };
  // useEffect(() => {

  //   fetchMoviesHandler();
  //   console.log('useeffect called');
  // },[fetchMoviesHandler])

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://learning-http-request-d46f1-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          Title: data[key].Title,
          Opening_text: data[key].Opening_text,
          Release_date: data[key].Release_Date,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    let id = null;
    if (error) {
      id = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);
    }
    return () => {
      clearInterval(id);
    };
  }, [error]);

  const cancelRetrying = () => {
    setError(null);
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler, requestType]);

  let content = <p>no data found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />;
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
        <Input onAddMovie={addMovieHandler} />
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {error && <button onClick={cancelRetrying}>cancel retrying</button>}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

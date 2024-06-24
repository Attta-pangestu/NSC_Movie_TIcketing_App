import { nowPlayingMovies, popularMovies, upcomingMovies } from "./enpoint";

export const getNowPlayingMoviesList = async () => {
    try {
      let response = await fetch(nowPlayingMovies);
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(
        ' Something went wrong in getNowPlayingMoviesList Function',
        error,
      );
    }
  };
  
 export  const getUpcomingMoviesList = async () => {
    try {
      let response = await fetch(upcomingMovies);
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(
        ' Something went wrong in getUpcomingMoviesList Function',
        error,
      );
    }
  };
  
  export const getPopularMoviesList = async () => {
    try {
      let response = await fetch(popularMovies);
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(
        ' Something went wrong in getPopularMoviesList Function',
        error,
      );
    }
  };
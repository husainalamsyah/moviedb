// Movie.js

import React from "react";
import LoadingMovie from "./LoadingMovie";
import "./Movie.css";

class Movie extends React.Component {
  state = {
    isLoading: true,
    movie: {}
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=651925d45022d1ae658063b443c99784&language=en-US`;
    fetch(movieUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({ movie: data, isLoading: false })
      })
      .catch(error => console.log("Error:", error));
  }

  render() {
    const { isLoading } = this.state;
    const {
      title,
      backdrop_path,
      release_date,
      genres,
      overview,
      vote_average,
      runtime
    } = this.state.movie;

    const year = release_date ? release_date.substring(0, 4) : null;

    const backgroundStyle = {
      backgroundImage: `url(http://image.tmdb.org/t/p/w1280/${backdrop_path})`
    }

    return (
     <div className="movie-page"> 
      { 
        isLoading 
          ? <LoadingMovie />
          : <div>
              <div className="movie-image" style={backgroundStyle} />
              <div className="movie-details">
                <h1>
                  {title}
                  <span>({year})</span>
                </h1>
                <section className="genres">
                  {genres.map((genre, index) => (
                    <div key={genre.id}>
                      <span>{genre.name}</span>
                      {index < genres.length - 1 && (
                        <span className="separator">|</span>
                      )}
                    </div>
                  ))}
                </section>
                <h5>
                  Rating:
                  <span>{vote_average}</span>
                </h5>
                <h5>
                  Runtime:
                  <span>{`${runtime} min`}</span>
                </h5>
                <h4>Overview</h4>
                <p>{overview}</p>
              </div>
            </div>
      }
     </div> 
    )
  }
}

export default Movie;
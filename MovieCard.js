import React from 'react';
import { Link } from "react-router-dom";

export default function MovieCard(props){
    let nameOrTitle = ""
    let airOrRelease = ""
    if(props.moviesOrShows==="tv"){
      nameOrTitle="name"
      airOrRelease="first_air_date"
    }else if(props.moviesOrShows==="movie"){
      nameOrTitle="title"
      airOrRelease="release_date"
    }
    return (
      <Link
        key={props.movieData.id}
        to={`../details`} 
        state={{
          movie: props.movieData,
          moviesOrShows: props.moviesOrShows
        }}
      >
        <div 
            className='card my-2 mx-1 p-1 text-center'
            style={{width: "10rem"}}
        >
            <img className='card-img-top' src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${props.movieData.poster_path}`}/>
            <h5>{props.movieData[nameOrTitle]}</h5>
            <p>{props.movieData[airOrRelease]}</p>
        </div>
      </Link>
    )
}
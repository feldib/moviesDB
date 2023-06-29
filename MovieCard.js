import React from 'react';
import { Link, useLocation } from "react-router-dom";


export default function MovieCard(movieData){
    return (
      <Link to={`../details`} 
        state={{
          from: useLocation().pathname,
          movie: movieData
        }}
      >
        <div 
            className='card my-2 mx-1 p-1 text-center'
            style={{width: "10rem"}}
        >
            <img className='card-img-top' src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movieData.poster_path}`}/>
            <h5>{movieData.name}</h5>
            <p>{movieData.first_air_date}</p>
        </div>
      </Link>
    )
}
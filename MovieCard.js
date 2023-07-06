import React from 'react';
import { Link, useLocation } from "react-router-dom";
import {base_photo_url} from "./options"
import {init_nameOrTitle_airOrRelease} from "./functions"

export default function MovieCard(props){
    const location = useLocation()
    const pathList = location.pathname.split("/")
    const movieOrShowPath = pathList[1]
    const [nameOrTitle, airOrRelease] = init_nameOrTitle_airOrRelease(props.moviesOrShows)
    return (
      <Link
        key={props.movieData.id}
        to={`../${movieOrShowPath}/${props.movieData.id}`}
      >
        <div 
            className='card my-2 mx-1 p-1 text-center'
            style={{width: "10rem"}}
        >
            <img className='card-img-top' src={`${base_photo_url}/w440_and_h660_face/${props.movieData.poster_path}`}/>
            <h5>{props.movieData[nameOrTitle]}</h5>
            <p>{props.movieData[airOrRelease]}</p>
        </div>
      </Link>
    )
}
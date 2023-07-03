import React from 'react'
import MovieCard from './MovieCard'

function Gallery(props) {
    return (
        <div className='d-flex flex-wrap'>
            {props.movieArray.map((m)=>{
                return MovieCard(m, props.moviesOrShows)
            })}
        </div>
    )
}

export default Gallery
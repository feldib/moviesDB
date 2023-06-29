import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { fetchPictures } from './fetchFunctions'

function MoviePage() {
    const location = useLocation()
    const {from, movie} = location.state
    const [picturesSrcS, setPicturesSrcS] = React.useState([])
    React.useEffect(()=>{
        (async ()=>{
            const srcS = await fetchPictures(movie.id)
            setPicturesSrcS(srcS)
        })()
        },[]
    )
    return (
        <div className='row'>
            <div className='row'>
                <h1 className=''>{movie.title}</h1>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className='row'>
                        <img 
                            src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`} 
                            style={{
                                width: "200px"
                            }}
                        />
                    </div>
                    <h3 className='row'>
                        {movie["release_date"]}
                    </h3>
                </div>
                <div className='col'>
                    <h2 className='row'>Description</h2>
                    <p className='row'>{movie["overview"]}</p>
                </div>
            </div>
            <div className='row'>
                <Link to={`${from}`}>
                    <button className='btn btn-secondary'>
                        Back to Browsing
                    </button>
                </Link>
            </div>
            <div className='row d-flex d-wrap'>
                {picturesSrcS.map((imgSrc)=>{
                    return (
                        <div className='card my-2 mx-1 p-1' style={{width: "150px"}}>
                            <img src={`https://image.tmdb.org/t/p/w440_and_h660_face/${imgSrc}`} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MoviePage;
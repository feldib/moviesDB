import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { fetchPictures } from './fetchFunctions'

function MoviePage() {
    const location = useLocation()
    const {movie, moviesOrShows} = location.state
    let path = ""
    if(moviesOrShows==="tv"){
        path="TVShows"
    }else if(moviesOrShows==="movie"){
        path="Movies"
    }
    const [picturesSrcS, setPicturesSrcS] = React.useState([])
    const {id, title, poster_path, overview, release_date} = movie
    React.useEffect(()=>{
        (async ()=>{
            const srcS = await fetchPictures(id)
            setPicturesSrcS(srcS)
        })()
        },[]
    )
    return (
        <div className='row'>
            <div className='row'>
                <h1 className=''>{title}</h1>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className='row'>
                        <img 
                            src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`} 
                            style={{
                                width: "200px"
                            }}
                        />
                    </div>
                    <h3 className='row'>
                        {release_date}
                    </h3>
                </div>
                <div className='col'>
                    <h2 className='row'>Description</h2>
                    <p className='row'>{overview}</p>
                </div>
            </div>
            <div className='row'>
                <Link to={`../${path}`}>
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
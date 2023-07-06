import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { fetchPictures, fetchDetails } from './fetchFunctions'
import {base_photo_url} from "./options"
import Loader from './Loader';

function MoviePage() {
    const location = useLocation() 
    const pathList = location.pathname.split("/")
    const id = pathList[pathList.length-1]
    const [movie, setMovie] = React.useState("")
    const [picturesSrcS, setPicturesSrcS] = React.useState([])
    const [nameOrTitle, setNameOrTitle] = React.useState("")
    const [airOrRelease, setAirOrRelease] = React.useState("")
    const [dataLoading, setDataLoading] = React.useState(true)
    const [picturesLoading, setPicturesLoading] = React.useState(true)
    let moviesOrShowsPath = pathList[1]
    let movieOrTVShows = ""

    async function setUpData(id, movieOrTVShows){
        setMovie(await fetchDetails(id, movieOrTVShows))
        setDataLoading(false)
        let showSrcS = await fetchPictures(id, movieOrTVShows)
        setPicturesSrcS(showSrcS)
        setPicturesLoading(false)
    }

    React.useEffect(()=>{
        (async()=>{
            switch(moviesOrShowsPath){
                case("TVShows"):
                    movieOrTVShows = "tv"
                    setNameOrTitle("name")
                    setAirOrRelease("first_air_date")
                    await setUpData(id, movieOrTVShows)
                    break;
                case("Movies"):
                    movieOrTVShows = "movie"
                    setNameOrTitle("title")
                    setAirOrRelease("release_date")
                    await setUpData(id, movieOrTVShows)
                    break;
            }
        })()
    },[])
    
    return (
        <div className='row'>
            {dataLoading ? <Loader /> :
                <>
                <div className='row'>
                    <h1 className=''>{movie[nameOrTitle]}</h1>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='row'>
                            <img 
                                src={`${base_photo_url}/w440_and_h660_face/${movie.poster_path}`} 
                                style={{
                                    width: "200px"
                                }}
                            />
                        </div>
                        <h3 className='row'>
                            {movie[airOrRelease]}
                        </h3>
                    </div>
                    <div className='col'>
                        <p className='row'>{movie.overview}</p>
                    </div>
                </div>
                </>
            }

            <div className='row'>
                <Link to={`/${moviesOrShowsPath}`}>
                    <button className='btn btn-secondary'>
                        Back to Browsing
                    </button>
                </Link>
            </div>
            
            {picturesLoading ? <Loader /> :
                <div className='row d-flex d-wrap'>
                    {picturesSrcS.map((imgSrc)=>{
                        return (
                            <div className='card my-2 mx-1 p-1' style={{width: "150px"}}>
                                <img src={`https://image.tmdb.org/t/p/w440_and_h660_face/${imgSrc}`} />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    );
}

export default MoviePage;
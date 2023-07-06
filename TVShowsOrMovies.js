import React from 'react';
import {Link, Outlet } from "react-router-dom";
import MovieCard from './MovieCard'
import {fetchTrending, filterFetch, searchFetch} from './fetchFunctions'

function TVShows(props) {
    const [currentmovieArray, setCurrentmovieArray] = React.useState([])
    const [context, setContext] = React.useState()
    const [pageTitle, setPageTitle] = React.useState("")
    React.useEffect(()=>{
        (async()=>{
            if(props.moviesOrShows==="tv"){
                setPageTitle("TV Shows")
            }else if(props.moviesOrShows==="movie"){
                setPageTitle("Movies")
            }
            setCurrentmovieArray(
                await fetchTrending(
                    props.moviesOrShows
                    )
            )
        })()
    },[props.moviesOrShows])
    const filterMovies = async(originalLanguage)=>{
        setCurrentmovieArray(
                await filterFetch(props.moviesOrShows, originalLanguage)
            )
    }
    const resetToTrending = async()=>{
        setCurrentmovieArray(
                await fetchTrending(props.moviesOrShows)
        )
    }
    return (
        <div className="row">
            <div className='row text-center mt-5'>
                <h1 className='display-1'>{pageTitle}</h1>
                <div className='row navbar'>
                    <Link 
                        className='col nav-link' 
                        to="Search"
                        onClick={()=>{
                            setContext({
                                search: async(query)=>{
                                    setCurrentmovieArray(
                                            await searchFetch(props.moviesOrShows, query)
                                        )
                                }
                            })
                        }}                                             
                    >
                        <h3 className='display-4'>
                            Search
                        </h3>
                    </Link>
                    <Link 
                        className='col nav-link' 
                        to="Browse"
                        onClick={()=>{
                            setContext([filterMovies, resetToTrending])
                        }}
                    >
                        <h3 className='display-4'>
                            Browse
                        </h3>
                    </Link>
                </div>
            </div>
            <Outlet context={context}/>
            <div className='d-flex flex-wrap'>
            {currentmovieArray.map(
                (movieData)=>{
                return (
                    <MovieCard 
                        movieData={movieData} 
                        moviesOrShows={props.moviesOrShows}
                    />
                )
                }
            )}
        </div>
    </div>)
}

export default TVShows;
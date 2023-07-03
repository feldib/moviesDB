import React from 'react';
import {Link, Outlet } from "react-router-dom";
import Gallery from "./Gallery"
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
            setCurrentmovieArray(await fetchTrending(props.moviesOrShows))
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
                <h1>{pageTitle}</h1>
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
                        Search
                    </Link>
                    <Link 
                        className='col nav-link' 
                        to="Browse"
                        onClick={()=>{
                            setContext([filterMovies, resetToTrending])
                        }}
                    >
                        Browse
                    </Link>
                </div>
            </div>
            <Outlet context={context}/>
            <Gallery movieArray={currentmovieArray} moviesOrShows={props.moviesOrShows} />
        </div>
    )
}

export default TVShows;
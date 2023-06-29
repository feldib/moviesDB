import React from 'react';
import {Link, Outlet } from "react-router-dom";
import Gallery from "./Gallery"
import {fetchTrending, filterFetch, searchFetch} from './fetchFunctions'

function TVShows(props) {
    const [currentmovieArray, setCurrentmovieArray] = React.useState([])
    const [context, setContext] = React.useState()
    React.useEffect(()=>{
        (async()=>{
            setCurrentmovieArray(await fetchTrending(props.moviesOrShows))
        })()
    },[])
    let pageTitle=""
    if(props.moviesOrShows==="tv"){
        pageTitle="TV Shows"
    }else if(props.moviesOrShows==="movie"){
        pageTitle="Movies"
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
                            setContext({
                                filterMovies: async(originalLanguage)=>{
                                    setCurrentmovieArray(
                                            await filterFetch(props.moviesOrShows, originalLanguage)
                                        )
                                },
                                resetToTrending: async()={}
                            })
                        }}  
                    >
                        Browse
                    </Link>
                </div>
            </div>
            <Outlet context={context}/>
            <Gallery movieArray={currentmovieArray}/>
        </div>
    )
}

export default TVShows;
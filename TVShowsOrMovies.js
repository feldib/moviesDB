import React from 'react';
import {Link, Outlet } from "react-router-dom";
import Gallery from "./Gallery"

function TVShows(props) {
    function filterFetch(moviesOrShows, originalLanguage="", options){
        const moviesUrlDiscover = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`
        const tvShowsURLDiscover = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
        let url=""
        if(moviesOrShows==="movies"){
            url=moviesUrlDiscover
        }else if(moviesOrShows==="tv"){
            url=tvShowsURLDiscover
        }
        let lang = ""
        if(originalLanguage!==""){
            lang = `&with_original_language=${originalLanguage}`
        }
        fetch(`${url}${lang}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
    function searchFilter(moviesOrShows, title, options){
        let what=""
        if(moviesOrShows==="movie" || moviesOrShows==="tv"){
            what=moviesOrShows
        }
        fetch(`https://api.themoviedb.org/3/search/${what}?query=${title}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    let pageTitle=""
    if(props.moviesOrShows==="tv"){
        pageTitle="TV Shows"
    }else if(props.moviesOrShows==="movies"){
        pageTitle="Movies"
    }
    return (
        <div className="row">
            <div className='row text-center mt-5'>
                <h1>{pageTitle}</h1>
                <div className='row navbar'>
                    <Link className='col nav-link' to="Search">
                        Search
                    </Link>
                    <Link className='col nav-link' to="Browse">
                        Browse
                    </Link>
                </div>
            </div>
            <Outlet />
            <Gallery />
        </div>
    )
}

export default TVShows;
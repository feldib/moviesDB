import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import options from './options.js';
import HomePage from "./HomePage.js"
import TVShowsOrMovies from "./TVShowsOrMovies.js"
import Search from './Search'
import Browse from './Browse'

function App() {
    const [languages, setLanguages] = React.useState(
        localStorage.getItem("languages")
    )
    React.useEffect(
        ()=>{
            if(!languages){
                fetch("https://api.themoviedb.org/3/configuration/languages", options)
                .then(response => response.json())
                .then(response =>{
                    localStorage.setItem("languages", JSON.stringify(response))
                    setLanguages(localStorage.getItem("languages"))
                })
                .catch(err => console.error(err));
            }
        }, []
    )
    return (
        <BrowserRouter>
            <div className='container'>
                <div className='row navbar border-bottom border-black'>
                    <Link className='col navbar-brand' to="/">
                        <h1 className='col navbar-brand'>
                            YourStreamer
                        </h1>
                    </Link>
                    <Link className='col nav-link' to="TVShows">
                        TV Shows
                    </Link>
                    <Link className='col nav-link' to="Movies">
                        Movies
                    </Link>
                </div>
                    <Routes>
                        <Route path="/" element={
                            <HomePage />
                        }/>

                        <Route path="TVShows" element={
                            <TVShowsOrMovies moviesOrShows="tv" />
                        }>
                            <Route path="Search" element={<Search />}></Route>
                            <Route path="Browse" element={<Browse languages={languages} />}></Route>
                        </Route>

                        <Route path="Movies" element={
                            <TVShowsOrMovies moviesOrShows="movies" />
                        }>
                            <Route path="Search" element={<Search />}></Route>
                            <Route path="Browse" element={<Browse languages={languages} />}></Route>
                        </Route>
                    </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
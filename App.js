import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage.js"
import TVShowsOrMovies from "./TVShowsOrMovies.js"
import Search from './Search'
import Browse from './Browse'
import MoviePage from './MoviePage.js';
import {fetchLanguages} from "./fetchFunctions.js"

function App() {
    const [languages, setLanguages] = React.useState(
        localStorage.getItem("languages")
    )
    React.useEffect(
        ()=>{
            if(!languages){
                fetchLanguages(setLanguages)
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
                            <TVShowsOrMovies moviesOrShows="movie" />
                        }>
                            <Route path="Search" element={<Search />}></Route>
                            <Route path="Browse" element={<Browse languages={languages} />}></Route>
                        </Route>
                        <Route path="details" element={<MoviePage />} />
                    </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
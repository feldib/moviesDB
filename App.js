import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import options from './options.js';
import HomePage from "./HomePage.js"
import TVShows from "./TVShows.js"
import Movies from "./Movies.js"

function App() {
    React.useEffect(
        ()=>{
            let languages = localStorage.getItem("languages")
            if(!languages){
                fetch("https://api.themoviedb.org/3/configuration/languages", options)
                .then(response => response.json())
                .then(response =>{
                    localStorage.setItem("languages", response)
                    languages = localStorage.getItem("languages")
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
                            <TVShows />
                        }/>
                        <Route path="Movies" element={
                            <Movies />
                        }/>
                    </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
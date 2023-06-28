import React from 'react';
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className='row text-center mt-5'>
            <h1>Welcome</h1>
            <p>Browse your favourite Movie or TV Show with YourStreamer</p>
            <Link className='col' to="TVShows">
                <button className='btn btn-primary'>TV Shows</button>
            </Link>
            <Link className='col' to="Movies">
                <button className='btn btn-primary'>Movies</button>
            </Link>
        </div>
    );
}

export default HomePage;
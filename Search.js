import React from 'react';

function Search() {
    return (
        <div className='row '>
            <div className='input-group justify-content-center'>
                <input type='text'></input>
                <div className='input-group-append'>
                    <button type='button' className='btn btn-outline-secondary'>🔎</button>
                </div>
            </div>
        </div>
    );
}

export default Search;
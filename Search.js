import React from 'react';
import { useOutletContext } from "react-router-dom";

function Search() {
    const input = React.useRef()
    const {search} = useOutletContext()
    return (
        <div className='row '>
            <div className='input-group justify-content-center'>
                <input type='text' ref={input}></input>
                <div className='input-group-append'>
                    <button 
                        type='button' 
                        className='btn btn-outline-secondary'
                        onClick={()=>{
                            if(input.current.value!==""){
                                search(input.current.value)
                            }
                        }}
                    >🔎</button>
                </div>
            </div>
        </div>
    );
}

export default Search;
import React from 'react';
import { useOutletContext } from "react-router-dom";

function Search() {
    const input = React.useRef()
    const {search} = useOutletContext()
    return (
        <div className='row '>

            <div className='input-group justify-content-center'>
                <input 
                    type='text' 
                    ref={input}
                />
                    <button 
                        type='button' 
                        className='btn btn-outline-secondary bg-secondary input-group-append'
                        onClick={()=>{
                            if(input.current.value!==""){
                                search(input.current.value)
                            }
                        }}
                    >🔎</button>
            </div>

        </div>
    );
}

export default Search;
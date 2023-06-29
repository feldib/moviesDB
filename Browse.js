import React from 'react';
import { useOutletContext } from "react-router-dom";


function Browse(props) {
    const {filterMovies} = useOutletContext()
    const menu = React.useRef()
    const [shownLangs, setShownLangs] = React.useState([])
    const [chosenLang, setChosenLang] = React.useState()
    React.useEffect(()=>{
        if(chosenLang){
            filterMovies(chosenLang.iso_639_1)
        }
    },[chosenLang])
    return (
        <div className='row'>
            <div className="col dropdown">
                <button 
                    onClick={()=>{
                        menu.current.hidden = !menu.current.hidden
                    }}
                    className="btn btn-secondary dropdown-toggle"
                >
                    Choose Language
                </button>
                <div 
                    className='p-2 text-white border  bg-secondary bg-gradient rounded' 
                    ref={menu} 
                    hidden
                >
                    <input 
                        className='rounded' 
                        type="text" 
                        placeholder="Search.." 
                        onKeyUp={(e)=>{
                            if(e.target.value==""){
                                setShownLangs([])
                            }else{
                                setShownLangs(
                                    JSON.parse(props.languages).filter((langData)=>{
                                        return langData["english_name"].includes(e.target.value)
                                    })
                                )
                            }
                        }} 
                    />
                    <div>
                        {shownLangs.map((lang)=>{
                            return <a 
                                        className='border-bottom dropdown-item'
                                        onClick={
                                            ()=>{
                                                menu.current.hidden = !menu.current.hidden
                                                setChosenLang(lang)
                                            }
                                        }
                                    >{lang["english_name"]}</a>
                        })}
                    </div>
                </div>
            </div>
            <div className='col'>
                <button 
                    className="btn btn-danger"
                    onClick={()=>{
                        setChosenLang()
                    }}
                >
                    Any language
                </button>
            </div>
            <div className="row">
                {chosenLang && <h3>{chosenLang["english_name"]}</h3>}
            </div>
        </div>
    )
}

export default Browse;
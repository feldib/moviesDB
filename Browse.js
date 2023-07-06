import React from 'react';
import { useOutletContext } from "react-router-dom";
import {fetchLanguages} from "./fetchFunctions.js"

function Browse(props) {
    const [filterMovies, resetToTrending] = useOutletContext()
    const [shownLangs, setShownLangs] = React.useState([])
    const [chosenLang, setChosenLang] = React.useState()
    const [languages, setLanguages] = React.useState(
        localStorage.getItem("languages")
    )
    React.useEffect(
        ()=>{
            if(!languages){
                (async()=>{
                    await fetchLanguages(setLanguages)
                })()
            }
        }, []
    )
    React.useEffect(()=>{
        if(chosenLang){
            filterMovies(chosenLang.iso_639_1)
        }
    },[chosenLang])
    const menu = React.useRef()
    const getFilteredLangs = (value)=>{
        const rawLangList = JSON.parse(languages).filter(
            (langData)=>{
                return (
                    langData["english_name"]
                    .toLowerCase()
                    .includes(
                        value.toLowerCase()
                    )
                )
            }
        )
        return rawLangList
    }
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
                    style={{maxWidth: "210px"}}
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
                                    getFilteredLangs(e.target.value)
                                )
                            }
                        }} 
                    />
                    <div>
                        {shownLangs.map((lang)=>{
                            return <button 
                                        className='border-bottom dropdown-item py-1 px-3'
                                        onClick={
                                            ()=>{
                                                menu.current.hidden = !menu.current.hidden
                                                setChosenLang(lang)
                                            }
                                        }
                                    >{lang["english_name"]}</button>
                        })}
                    </div>
                </div>
            </div>
            <div className='col'>
                <button 
                    className="btn btn-danger"
                    onClick={()=>{
                        setChosenLang()
                        resetToTrending()
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
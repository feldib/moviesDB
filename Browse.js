import React from 'react';

function Browse(props) {
    // const languages = React.useState(JSON.parse(props.languages))[0]
    const menu = React.useRef()
    const [shownLangs, setShownLangs] = React.useState([])
    const [chosenLang, setChosenLang] = React.useState()
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
                            setShownLangs(
                                JSON.parse(props.languages).filter((langData)=>{
                                    if(e.target.value!==""){
                                        return langData["english_name"].includes(e.target.value)
                                    }
                                })
                            )
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
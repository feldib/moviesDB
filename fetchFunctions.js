import options from './options.js';

async function fetchTrending(moviesOrShows){
    let trending = []
    await fetch(`https://api.themoviedb.org/3/trending/${moviesOrShows}/day?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
                trending = response.results
            })
        .catch(err => console.error(err));
    return trending
}
function fetchLanguages(setLanguages){
    fetch("https://api.themoviedb.org/3/configuration/languages", options)
        .then(response => response.json())
        .then(response =>{
            localStorage.setItem("languages", JSON.stringify(response))
            setLanguages(localStorage.getItem("languages"))
        })
        .catch(err => console.error(err));
}
async function filterFetch(moviesOrShows, originalLanguage){
    const moviesUrlDiscover = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`
    const tvShowsURLDiscover = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    let url=""
    if(moviesOrShows==="movie"){
        url=moviesUrlDiscover
    }else if(moviesOrShows==="tv"){
        url=tvShowsURLDiscover
    }
    let lang = ""
    if(originalLanguage!==""){
        lang = `&with_original_language=${originalLanguage}`
    }
    let array = []
    await fetch(`${url}${lang}`, options)
        .then(response => response.json())
        .then(response => {
            array = response.results
        })
        .catch(err => console.error(err));
    return array
}
async function searchFetch(moviesOrShows, title){
    let what=""
    if(moviesOrShows==="movie" || moviesOrShows==="tv"){
        what=moviesOrShows
    }
    let array = []
    await fetch(`https://api.themoviedb.org/3/search/${what}?query=${title}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => {
            array = response.results
        })
        .catch(err => console.error(err));
    return array
}
async function fetchPictures(id){
    let imagesSrcS = []
    await fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options)
        .then(response => response.json())
        .then(response => {
            imagesSrcS = response.backdrops.map((element)=>{
                return element["file_path"]
            })
        })
        .catch(err => console.error(err));
    return imagesSrcS
}

export {fetchTrending, fetchLanguages, filterFetch, searchFetch, fetchPictures}
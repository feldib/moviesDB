import options from './options.js';
import {base_url} from "./options"

async function fetchTrending(moviesOrShows){
    let trending = []
    await fetch(`${base_url}trending/${moviesOrShows}/day?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
                trending = response.results
            })
        .catch(err => console.error(err));
    return trending
}
async function fetchLanguages(setLanguages){
    await fetch(`${base_url}configuration/languages`, options)
        .then(response => response.json())
        .then(response =>{
            localStorage.setItem("languages", JSON.stringify(response))
            setLanguages(localStorage.getItem("languages"))
        })
        .catch(err => console.error(err));
}
async function filterFetch(moviesOrShows, originalLanguage){
    const tvShowsURLDiscover = `${base_url}discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`
    const moviesUrlDiscover = `${base_url}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
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
    await fetch(`${base_url}search/${what}?query=${title}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => {
            array = response.results
        })
        .catch(err => console.error(err));
    return array
}
async function fetchPictures(id, movieOrTVShows){
    let imagesSrcS = []
    await fetch(`${base_url}${movieOrTVShows}/${id}/images`, options)
        .then(response => response.json())
        .then(response => {
            imagesSrcS = response.backdrops.map((element)=>{
                return element["file_path"]
            })
        })
        .catch(err => console.error(err));
    return imagesSrcS
}

async function fetchDetails(id, movieOrTVShows){
    let movie={}
    await fetch(`${base_url}${movieOrTVShows}/${id}`, options)
  .then(response => response.json())
  .then(response => {movie = response})
  .catch(err => console.error(err));
  return movie
}


export {fetchTrending, fetchLanguages, filterFetch, searchFetch, fetchPictures, fetchDetails}
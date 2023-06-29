const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjE5NGIzYTdiZTNlOWJlZTEzODU4ODMwMjA2NjAzZiIsInN1YiI6IjY0OWFjOTBjYTZkZGNiMDBjNjllYzc5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7omvpFcYnHj4QcX6LOBXZvROexkSe43aeoKpWo_EFPM'
    }
  }

const langaugesURL = "https://api.themoviedb.org/3/configuration/languages"
  
function filterFetch(moviesOrShows, originalLanguage="", options){
    const moviesUrlDiscover = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`
    const tvShowsURLDiscover = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    let url=""
    if(moviesOrShows==="movies"){
        url=moviesUrlDiscover
    }else if(moviesOrShows==="tv"){
        url=tvShowsURLDiscover
    }
    let lang = ""
    if(originalLanguage!==""){
        lang = `&with_original_language=${originalLanguage}`
    }
    fetch(`${url}${lang}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function searchFilter(moviesOrShows, title, options){
    let what=""
    if(moviesOrShows==="movie" || moviesOrShows==="tv"){
        what=moviesOrShows
    }
    fetch(`https://api.themoviedb.org/3/search/${what}?query=${title}&include_adult=false&language=en-US&page=1`, options)
    .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

searchFilter("tv", "Germany", options)
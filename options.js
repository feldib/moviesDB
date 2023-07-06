const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjE5NGIzYTdiZTNlOWJlZTEzODU4ODMwMjA2NjAzZiIsInN1YiI6IjY0OWFjOTBjYTZkZGNiMDBjNjllYzc5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7omvpFcYnHj4QcX6LOBXZvROexkSe43aeoKpWo_EFPM'
    }
}

const base_url = 'https://api.themoviedb.org/3/'

const base_photo_url = `https://www.themoviedb.org/t/p`

export {options as default, base_url, base_photo_url}
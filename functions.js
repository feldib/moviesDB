const getFilteredLangs = (value, languages)=>{
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

const init_nameOrTitle_airOrRelease = (moviesOrShows)=>{
    let nameOrTitle
    let airOrRelease
    switch(moviesOrShows){
        case("tv"):
          nameOrTitle="name"
          airOrRelease="first_air_date"
          break;
        case("movie"):
          nameOrTitle="title"
          airOrRelease="release_date"
          break;
    }
    return [nameOrTitle, airOrRelease]
}

export {getFilteredLangs, init_nameOrTitle_airOrRelease}
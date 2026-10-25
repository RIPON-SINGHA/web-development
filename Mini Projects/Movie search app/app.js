const searchedResultSection = document.querySelector(".search-results-section")

const movieSearchForm = document.querySelector("#movie-search-form")
const movieSearchInput = document.querySelector(".movie-search")
const movieSearchButton = document.querySelector(".submit-search")

const searchedMoviesSection = document.querySelector("#search-results")
const trendingSection = document.querySelector("#featured-movies")

const searchForText = document.querySelector(".search-query")

const selectSearchType = document.querySelector(".search-type-btns-container")

const MOVIE_API_KEY = "8ed255f30945b540e8a15dbdf3dbebae"
let searchType = "movie"

async function fetchMovieData(searchType, movieName) {

    const  response = await fetch(`https://api.themoviedb.org/3/search/${searchType}?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1&api_key=${MOVIE_API_KEY}`)

    if(!response.ok) {
        const error = new Error(`Movie Data could not load into site.. || ${response.status}`)
        error.status = response.status

        throw error
    }

    const data = await response.json()
    const result = data.results

    if (!Array.isArray(result)){
        throw new Error(`Server could not hand the proper data...`)
    }
    
    const betterData = createBetterData(result, searchType)
    console.log(betterData)
    return betterData
}

async function fetchTrendingMedia() {
   
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${MOVIE_API_KEY}`)

        if(!response.ok) {
            throw new Error(`Trending data could not load from API ${response.status}`)
        }

        const data = await response.json()
        const trendingMediaData = data.results
        
        if (!Array.isArray(trendingMediaData)){
            throw new Error(`Server could not hand the proper data...`)
        
        }

        const refinedTrendingData = createBetterData(trendingMediaData)
        console.log(refinedTrendingData)

        return refinedTrendingData
    
}

async function updateAppUi(searchType, movieName) {
    try {
        if(movieName.length === 0) {
            return
        }
        
        searchedResultSection.classList.remove("hidden")
        searchForText.textContent =`"${movieName}"`
        const movieData = await fetchMovieData(searchType, movieName)

        if(movieData.length === 0) {
            renderErrorMsg("No movie by this name", searchedMoviesSection)
            return
        }

        renderMediaOnScreen(movieData, searchedMoviesSection)
    
        } catch (error) {
        console.log(`Search failed: ${error.message} (status: ${error.status ?? "none"})`)

        if (error.status === 429) {
            renderErrorMsg("Too many searches at a time. Please wait a moment and try again.", searchedMoviesSection)
        } else if (error.status >= 500) {
            renderErrorMsg("The movie server is having problems. Please try again later.", searchedMoviesSection)
        } else {
            renderErrorMsg("Something went wrong. Please try again.", searchedMoviesSection)
        }
    }
    
}

function createBetterData(results, fallbackType) {

    return results.map(media => {
        const type = media.media_type ?? fallbackType
        const date  = (type === "movie" ? media.release_date : media.first_air_date) || ""

        return {
            id: media.id,
            type: type,
            title: type === "movie" ? media.title : media.name,
            releaseYear: date.slice(0, 4),
            posterPath: media.poster_path,
            rating: media.vote_average
        }
    }).filter(el => 
        el.type === "movie" || el.type === "tv"
    )
}

function renderMediaOnScreen(mediaData, containerEl) {
    containerEl.innerHTML = ""

    mediaData.forEach(media => {
        const movieCardContainer = document.createElement("li")
    
        const movieCardEl = document.createElement("article")
        movieCardEl.classList.add("movie-card")

        const moviePosterContainer = document.createElement("div")
        moviePosterContainer.classList.add("poster-container")

        const movieLink = document.createElement("a")
        
        if(media.posterPath) {
            let moviePoster = document.createElement("img")
            moviePoster.classList.add("movie-poster")
            moviePoster.src = `https://image.tmdb.org/t/p/w500${media.posterPath}`
            moviePoster.alt = media.title
            movieLink.appendChild(moviePoster)
        }
        

        const movieDateAndRateContainer = document.createElement("div")
        movieDateAndRateContainer.classList.add("info-action")

        const movieReleaseYear = document.createElement("p")
        movieReleaseYear.classList.add("movie-year")
        movieReleaseYear.textContent = media.releaseYear

        const movieRating = document.createElement("p")
        movieRating.classList.add("movie-rating")
        movieRating.textContent = media.rating === 0 ? "No vote" : `${media.rating.toFixed(1)} / 10`
        
        const addToFavBtn = document.createElement("button")
        addToFavBtn.classList.add("add-to-fav-btn")
        addToFavBtn.textContent = "♡"

        movieDateAndRateContainer.append(movieReleaseYear, movieRating, addToFavBtn)
        moviePosterContainer.appendChild(movieLink)
        movieCardEl.append(moviePosterContainer, movieDateAndRateContainer)
        movieCardContainer.append(movieCardEl)

        containerEl.appendChild(movieCardContainer)
    })
}

function renderErrorMsg(msg, section) {
    section.innerHTML = ""

    const noMovieExistText = document.createElement("h1")
    noMovieExistText.textContent = msg
    noMovieExistText.style.color = "#64656c"

    section.append(noMovieExistText)
}

function changeActiveBtnClass() {
    selectSearchType.querySelectorAll("button").forEach(el => {
            el.classList.remove("selected-type")
            if(el.dataset.type === searchType){
                el.classList.add("selected-type")
            }
        })
}

async function renderTrendingOnScreen() {
    try {
        const trendingMediaData = await fetchTrendingMedia()

        if(trendingMediaData.length === 0) {
            console.log("data length is zero. data did not arrive properly.")
            renderErrorMsg("Trending media data couldn't load from server.", trendingSection)
            return
        }

        renderMediaOnScreen(trendingMediaData, trendingSection)

    } catch (error) {
        console.log(`Error: ${error.message}`)
        renderErrorMsg("Server couldn't load trending media data.", trendingSection)
    }
   
}

movieSearchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    updateAppUi(searchType, movieSearchInput.value.trim())
})

selectSearchType.addEventListener("click", (e) => {
    const btn = e.target.closest("button")

    if(btn) {
        searchType = btn.dataset.type
        changeActiveBtnClass()
    }
})

renderTrendingOnScreen()
changeActiveBtnClass()
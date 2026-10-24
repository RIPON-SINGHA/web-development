const searchedResultSection = document.querySelector(".search-results-section")

const movieSearchForm = document.querySelector("#movie-search-form")
const movieSearchInput = document.querySelector(".movie-search")
const movieSearchButton = document.querySelector(".submit-search")

const searchedMoviesSection = document.querySelector("#search-results")

const searchForText = document.querySelector(".search-query")

const MOVIE_API_KEY = "8ed255f30945b540e8a15dbdf3dbebae"
async function fetchMovieData(movieName) {

    const  response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1&api_key=${MOVIE_API_KEY}`)

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

    return result
}

async function updateAppUi(movieName) {
    try {
        if(movieName.length === 0) {
            return
        }

        searchForText.textContent =`"${movieName}"`
        const movieData = await fetchMovieData(movieName)

        if(movieData.length === 0) {
            renderErrorMsg("No movie by this name")
            return
        }

        const releaseYear = movieData[0].release_date.slice(0, 4)
        const title = movieData[0].title
        const posterPath = movieData[0].poster_path
        const rating = movieData[0].vote_average        

        renderMovieCard(title, releaseYear, posterPath, rating)
    
    } catch (error) {
        if (error.status === 401) {
            console.log(`something went wrong, || ${error.message}`)
            renderErrorMsg("Something went wrong. Please try again.")
        } else if (error.status === 429) {
            console.log(`too many requests at a time || ${error.status}`)
            renderErrorMsg("To many requests at a time. please try again later")
        } else if (error.status === 500) {
            console.log("server went down")
            renderErrorMsg("Server went down. Please visit later.")
        } else {
            renderErrorMsg("couldn't get any proper data on this. try again later")
        }
    } 
    
}

function renderMovieCard(title, releaseYear, poster, rating) {
    searchedMoviesSection.innerHTML = ""

    const movieCardContainer = document.createElement("li")
    
    const movieCardEl = document.createElement("article")
    movieCardEl.classList.add("movie-card")

    const moviePosterContainer = document.createElement("div")
    moviePosterContainer.classList.add("poster-container")

    const movieLink = document.createElement("a")
    
    const moviePoster = document.createElement("img")
    moviePoster.classList.add("movie-poster")
    moviePoster.src = `https://image.tmdb.org/t/p/w500${poster}`
    moviePoster.alt = title

    const movieDateAndRateContainer = document.createElement("div")
    movieDateAndRateContainer.classList.add("info-action")

    const movieReleaseYear = document.createElement("p")
    movieReleaseYear.classList.add("movie-year")
    movieReleaseYear.textContent = releaseYear

    const movieRating = document.createElement("p")
    movieRating.classList.add("movie-rating")
    movieRating.textContent = rating === 0 ? "No vote" : `${rating.toFixed(2)} / 10`
    
    const addToFavBtn = document.createElement("button")
    addToFavBtn.classList.add("add-to-fav-btn")
    addToFavBtn.textContent = "♡"

    movieDateAndRateContainer.append(movieReleaseYear, movieRating, addToFavBtn)
    movieLink.appendChild(moviePoster)
    moviePosterContainer.appendChild(movieLink)
    movieCardEl.append(moviePosterContainer, movieDateAndRateContainer)
    movieCardContainer.append(movieCardEl)

    searchedMoviesSection.appendChild(movieCardContainer)

    searchedResultSection.classList.remove("hidden")
}

function renderErrorMsg(msg) {
    searchedMoviesSection.innerHTML = ""

    const noMovieExistText = document.createElement("h1")
    noMovieExistText.textContent = msg
    noMovieExistText.style.color = "#64656c"

    searchedMoviesSection.append(noMovieExistText)
}

movieSearchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    updateAppUi(movieSearchInput.value.trim())
})
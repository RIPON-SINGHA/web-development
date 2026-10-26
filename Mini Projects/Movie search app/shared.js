function saveToLocalStorage() {
    try {
        localStorage.setItem("savedMedia", JSON.stringify(savedMedia))
    } catch (error) {
        console.log(`data couldn't load in localStorage ${error.message}`)
    }
}

function getSavedMedia() {
    try {
        const saved = JSON.parse(localStorage.getItem("savedMedia"))
        return Array.isArray(saved) ? saved : []
    } catch (error) {
        console.log(`some error occured while saving ${error.message}`)
        return []
    }
}

let savedMedia = getSavedMedia()


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
        
        if(savedMedia.some(item => item.id === media.id && item.type === media.type)) {
            addToFavBtn.textContent = "♥︎"
            addToFavBtn.classList.add("full-opacity")
        }
        

        movieDateAndRateContainer.append(movieReleaseYear, movieRating, addToFavBtn)
        moviePosterContainer.appendChild(movieLink)
        movieCardEl.append(moviePosterContainer, movieDateAndRateContainer)
        movieCardContainer.append(movieCardEl)

        containerEl.appendChild(movieCardContainer)

        addToFavBtn.addEventListener("click", (e) => {
            const isSaved = savedMedia.some(item => (item.id === media.id && item.type === media.type))

            if(isSaved) {
                savedMedia = savedMedia.filter(item => (item.id !== media.id || item.type !== media.type))
                saveToLocalStorage()
                addToFavBtn.textContent = "♡"
                addToFavBtn.classList.remove("full-opacity")
                console.log(savedMedia)
                return
            } 

            savedMedia.push(media)
            saveToLocalStorage()
            addToFavBtn.textContent = "♥︎"
            addToFavBtn.classList.add("full-opacity")
            console.log(savedMedia)
            
           
        })
    })
}

function renderErrorMsg(msg, section) {
    section.innerHTML = ""

    const noMovieExistText = document.createElement("h1")
    noMovieExistText.textContent = msg
    noMovieExistText.style.color = "#64656c"

    section.append(noMovieExistText)
}

const emptyFavoriteSection = document.querySelector(".empty-favorite-movies-section")
const favoriteMoviesSection = document.querySelector(".favorite-movies-section")

const favoriteMoviesContainer = document.querySelector("#favorite-movies")

const moviesCount = document.querySelector(".movies-count")

const findFavMovie = document.querySelector(".search-fav-movie")

function showFavoriteSection() {
    if(savedMedia.length === 0) {
        emptyFavoriteSection.classList.remove("hidden")
        favoriteMoviesSection.classList.add("hidden")
    } else {
        emptyFavoriteSection.classList.add("hidden")
        favoriteMoviesSection.classList.remove("hidden")
        moviesCount.textContent = (savedMedia.length > 1) ? `${savedMedia.length} titles saved` : `${savedMedia.length} title saved`
    }
}

favoriteMoviesContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-fav-btn")

    if(!btn) return

    const mediaCard = btn.closest("li")
    mediaCard.remove()
    showFavoriteSection()
})

findFavMovie.addEventListener("input", () => {
    const userInput = findFavMovie.value.trim().toLowerCase()

    const filteredArray = savedMedia.filter(item => item.title.toLowerCase().includes(userInput))

    if(filteredArray.length > 0) {
        renderMediaOnScreen(filteredArray, favoriteMoviesContainer)
    } else {
        renderErrorMsg("No favorite matches your search", favoriteMoviesContainer)
    }
    
})

renderMediaOnScreen(savedMedia, favoriteMoviesContainer)

showFavoriteSection()
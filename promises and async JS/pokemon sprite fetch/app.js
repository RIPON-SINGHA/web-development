const pokemonInput = document.querySelector("#pokemonName")
const searchBtn = document.querySelector("#searchBtn")
const pokemonImgEL = document.querySelector("#pokemonImg")

async function getPokemonData() {

    let pokemonName = pokemonInput.value.toLocaleLowerCase()

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if(!response.ok) {
            throw new Error("No pokemon found by that name....")
        }

        const data = await response.json()
        const pokemonSprite = data.sprites.front_default
        showPokemonSprite(pokemonSprite)

    } catch (error) {
        console.log(error.message)
    }
}

function showPokemonSprite(pokemonSprite) {
    pokemonImgEL.src = pokemonSprite
    pokemonImgEL.style.display = "block"
}


searchBtn.addEventListener("click", getPokemonData)

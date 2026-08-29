// lat = 0
// lon = 0

async function getLocation() {
    try {
        const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=new york,&limit=1&appid=c4fd1a280e73e01f43a4629ddf94a1ef")

        if(!response.ok) {
            throw new Error(`HTTP Error: ${response.status} || server couldn't load data...`)
        }

        const data = await response.json()

        if (data.length === 0) {
            throw new Error("The city does not exist....")
        }

        const {lat, lon} = data[0]

        return {lat, lon}

    } catch (error) {
        throw error
    }
} 

async function getWeather() {
   
    try {
        const {lat, lon} = await getLocation()
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c4fd1a280e73e01f43a4629ddf94a1ef&units=metric`)

        if (!response.ok) {
            throw new Error(`Weather server couldn't load data. || status code: ${response.status}`)
        }

        const data = await response.json()
        const temp = data.main.temp
        const humidity = data.main.humidity
        const weather = data.weather[0].main
        console.log(`temp: ${temp}`)
        console.log(`humidity: ${humidity}`)
        console.log(`weather: ${weather}`)

    } catch(error) {
        console.log(`Error: ${error.message}`)
    }
}

getWeather()

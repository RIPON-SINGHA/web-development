const cityInputEL = document.querySelector(".city_input")
const fetchWeatherBtn = document.querySelector(".fetch_data")
const City_name = document.querySelector(".city_name")
const tempBox = document.querySelector(".temp_data")
const humidityBox = document.querySelector(".humidity_data")
const windBox = document.querySelector(".wind_data")
const weatherBox = document.querySelector(".weather_data")

async function getLocation(cityName) {  
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=2&appid=218b2441a696c6d28af09f4c97b8c6d3`)

        if (!response.ok) {
            throw new Error(`HTTPS error: ${response.status} || server couldn't load data.`)
        } 
        
        const data = await response.json()

        if (data.length === 0) {
            throw new Error("The city does not exist")
        }

        const {lat, lon, name} = data[0]

        return {lat, lon, name}
        
    } catch (error) {
        throw error
    }
}

async function getWeather(cityName, callback) {
    try {   
        const {lat, lon, name} = await getLocation(cityName)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=218b2441a696c6d28af09f4c97b8c6d3&units=metric`)

        if (!response.ok) {
            throw new Error(`HTTPS Error: ${response.status} || Server couldn't load data`)
        }

        const data = await response.json()
        const weatherData = {
            cityName :  name,
            temp : data.main.temp,
            humidity : data.main.humidity,
            wind: data.wind.speed,
            weather : data.weather[0].main
        }
        
        callback(weatherData)


    } catch (error) {
        console.log(`Error: ${error.message}`)
        City_name.textContent = error.message
        tempBox.textContent = `00 °C`
        humidityBox.textContent = `00 %`
        windBox.textContent = `00 km/h`
        weatherBox.textContent = `No data`
    }
}


function updateVisual() {
    const city_name = cityInputEL.value

    if (!city_name.trim()) {
        console.log("No city name")
        City_name.textContent = "No city name!"
        tempBox.textContent = `00 °C`
        humidityBox.textContent = `00 %`
        windBox.textContent = `00 km/h`
        weatherBox.textContent = `No data`
        return
    }

    City_name.textContent = "Loading...."
    getWeather(city_name, (weatherData) => {
        const {cityName, temp, humidity, wind, weather} = weatherData

        City_name.textContent = cityName
        tempBox.textContent = `${temp} °C`
        humidityBox.textContent = `${humidity} %`
        windBox.textContent = `${(wind * 3.6).toFixed(1)} km/h`
        weatherBox.textContent = `${weather}`
    })

}

fetchWeatherBtn.addEventListener('click', updateVisual)
cityInputEL.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        updateVisual()
    }
})

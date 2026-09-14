const currentLocationName = document.querySelector(".location_name")

const currentDayEl = document.querySelector(".show_date_day")
const currentDateEl = document.querySelector(".show_date")
const currentMonthEl = document.querySelector(".show_date_month")
const currentTimeEL = document.querySelector(".show_time")
const dayNightIndicator = document.querySelector(".day_night_indication")
const currentTimezone = document.querySelector(".show_timezone")

const currentPlaceTemp = document.querySelector(".main_city_current_temp")
const currentWeatherDescription = document.querySelector(".weather_description")

const currentWeatherHumidityLevel = document.querySelector(".humidity_level")
const currentWeatherWindSpeed = document.querySelector(".wind_level")

const fetchWeatherDataBtn = document.querySelector(".fetch_weather_data")
const userSearchInput = document.querySelector(".city_input")

function getUserLocationPosition() {
    return new Promise((resolve, reject) => { 
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

async function getUserCoordinates() {
    const pos = await getUserLocationPosition()
    const lat  = pos.coords.latitude
    const lon = pos.coords.longitude

    const [weatherData, locationName] = await Promise.all([getWeatherData(lat, lon), getUserLocationName(lat, lon)])

    return [weatherData, locationName, lat, lon]
}


async function getWeatherData(lat, lon) {
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=218b2441a696c6d28af09f4c97b8c6d3&units=metric`)

        if(!weatherResponse.ok) {
            throw new Error (`Error: server couldn't load data || ${weatherResponse.status}`)
        }

        const weatherData = await weatherResponse.json()

        const currentTemp = weatherData.main.temp
        const currentHumidity = weatherData.main.humidity
        const currentWindSpeed = weatherData.wind.speed
        const currentWeatherDescription = weatherData.weather[0].description
        const weathershortDescription = weatherData.weather[0].main
        const currentUserTimezone = weatherData.sys.country

        return [currentTemp, currentHumidity, currentWindSpeed, currentWeatherDescription, weathershortDescription, currentUserTimezone]

    } catch (error) {
        throw error
    }
}

async function getUserLocationName(lat, lon) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=218b2441a696c6d28af09f4c97b8c6d3`)

        if (!response.ok) {
            throw new Error (`Error: server couldn't load any dara || ${response.status}`)
        }

        const data = await response.json()
        const locationName = data[0].name

        return locationName

    } catch (error) {
        throw error
    }
}


async function updateCurrentLocationWeatherUi(weatherData, locationName) {
    // const [weatherData, locationName] = await getUserCoordinates()
    currentLocationName.textContent = locationName
    currentPlaceTemp.textContent = weatherData[0].toFixed(1) + "°C"
    currentWeatherDescription.textContent = weatherData[3]
    currentWeatherHumidityLevel.textContent = weatherData[1] + "%"
    currentWeatherWindSpeed.textContent = (weatherData[2]*3.6).toFixed(1) + "km/h"
}

function updateCurrentLocationDayTime(weatherData) {
    let currTime = new Date()
    let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    const currentTimehours = String(currTime.getHours()).padStart(2, '0');
    const currentTimeMinutes = String(currTime.getMinutes()).padStart(2, '0');

    currentTimehours >= 12 ? dayNightIndicator.textContent = "PM" : dayNightIndicator.textContent = "AM"
    let currentDay = weekDays[currTime.getDay()]
    currentDayEl.textContent = currentDay
    let currentMonth = months[currTime.getMonth()]
    currentDateEl.textContent = currTime.getDate()
    currentMonthEl.textContent = currentMonth

    currentTimeEL.textContent = `${currentTimehours}:${currentTimeMinutes}`

    getUserTimezone(weatherData)
}

async function getUserTimezone(weatherData) {
    // const [weatherData, _] = await getUserCoordinates()
    const currTime = new Date();

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const tzAbbreviation = new Intl.DateTimeFormat(`en-${weatherData[5]}-u-va-posix`, {
    timeZone: timeZone,
    timeZoneName: 'short'
    })
    .formatToParts(currTime)
    .find(part => part.type === 'timeZoneName').value;

    currentTimezone.textContent = tzAbbreviation
    console.log(tzAbbreviation); 
}

async function getUserSearchCoordinate(cityName) {
    try {
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=218b2441a696c6d28af09f4c97b8c6d3`)

        if(!response.ok) {
            throw new Error (`Error: Server couldn't load data || ${response.status}`)
        }

        const data = await response.json()
        const {lat, lon} = data[0]

        return {lat, lon}
        // console.log(lat, lon)

    } catch (error) {
        throw error
    }
}

async function getSearchLocationWeatherData() {
    try {
        const searchedCityName = userSearchInput.value
        const {lat, lon} = await getUserSearchCoordinate(searchedCityName)
        const [searchedWeatherdata, searchedLocationName] = await Promise.all([getWeatherData(lat, lon), getUserLocationName(lat, lon)])

        console.log(searchedWeatherdata, searchedLocationName)

        const temp = searchedWeatherdata[0]
        const humidity = searchedWeatherdata[1]
        const windSpeed = searchedWeatherdata[2]
        const weatherDescription = searchedWeatherdata[4]

        console.log(temp, humidity, windSpeed, weatherDescription)
        return [temp, humidity, windSpeed, weatherDescription]

    } catch(error) {
        throw error
    }
}


async function init() {
    const [weatherData, locationName] = await getUserCoordinates()

    updateCurrentLocationWeatherUi(weatherData, locationName)
    updateCurrentLocationDayTime(weatherData)
}

fetchWeatherDataBtn.addEventListener("click", ()=> {
    getSearchLocationWeatherData()
})

init()
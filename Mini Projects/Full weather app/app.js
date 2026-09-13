const currentLocationName = document.querySelector(".location_name")

const currentDayEl = document.querySelector(".show_date_day")
const currentDateEl = document.querySelector(".show_date")
const currentMonthEl = document.querySelector(".show_date_month")
const currentTimeEL = document.querySelector(".show_time")
const dayNightIndicator = document.querySelector(".day_night_indication")
const currentTimezome = document.querySelector(".show_timezone")

const currentPlaceTemp = document.querySelector(".main_city_current_temp")
const currentWeatherDescription = document.querySelector(".weather_description")

const currentWeatherHumidityLevel = document.querySelector(".humidity_level")
const currentWeatherWindSpeed = document.querySelector(".wind_level")

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

        const weaterData = await weatherResponse.json()

        const currentTemp = weaterData.main.temp
        const currentHumidity = weaterData.main.humidity
        const currentWindSpeed = weaterData.wind.speed
        const currentWeatherDescription = weaterData.weather[0].description

        return [currentTemp, currentHumidity, currentWindSpeed, currentWeatherDescription]

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

async function showData() {
    const [weatherData, locationName, lat, lon] = await getUserCoordinates()
    console.log(weatherData)
    console.log(locationName)
    console.log(lat)
    console.log(lon)
}

showData()


async function updateCurrentLocationWeatherUi() {
    const [weatherData, locationName] = await getUserCoordinates()

    currentLocationName.textContent = locationName
    currentPlaceTemp.textContent = weatherData[0] + "°C"
    currentWeatherDescription.textContent = weatherData[3]
    currentWeatherHumidityLevel.textContent = weatherData[1] + "%"
    currentWeatherWindSpeed.textContent = weatherData[2] + "km/h"
}

function updateCurrentLocationDay() {
    let currTime = new Date()
    let day = currTime.getDay()
    let month = currTime.getMonth()

    switch (day) {
        case 0:
            currentDayEl.textContent = "Sun"
            break;
        case 1:
            currentDayEl.textContent = "Mon"
            break;
        case 2:
            currentDayEl.textContent = "Tue"
            break;
        case 3:
            currentDayEl.textContent = "Wed"
            break;
        case 4:
            currentDayEl.textContent = "Thur"
            break;
        case 5:
            currentDayEl.textContent = "Fri"
            break;
        case 6:
            currentDayEl.textContent = "Sat"
            break;
        default:
            break;
    }

    currentDateEl.textContent = currTime.getDate()

    switch (month) {
        case 0:
            currentMonthEl.textContent = "Jan"
            break;
        case 1:
            currentMonthEl.textContent = "Feb"
            break;
        case 2:
            currentMonthEl.textContent = "Mar"
            break;
        case 3:
            currentMonthEl.textContent = "Apr"
            break;
        case 4:
            currentMonthEl.textContent = "may"
            break;
        case 5:
            currentMonthEl.textContent = "Jun"
            break;
        case 6:
            currentMonthEl.textContent = "jul"
            break;
        case 7:
            currentMonthEl.textContent = "Aug"
            break;
        case 8:
            currentMonthEl.textContent = "Sep"
            break;
        case 9:
            currentMonthEl.textContent = "oct"
            break;
        case 10:
            currentMonthEl.textContent = "Nov"
            break;
        case 11:
            currentMonthEl.textContent = "dec"
        default:
            break;

    }

}

updateCurrentLocationWeatherUi()
updateCurrentLocationDay()
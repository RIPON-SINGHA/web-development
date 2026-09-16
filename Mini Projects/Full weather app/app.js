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

const searchedWeatherContainer = document.querySelector(".search_weather_container")

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
            throw new Error (`Error: Server couldn't load data || ${weatherResponse.status}`)
        }

        const weatherData = await weatherResponse.json()
        const currentTemp = weatherData.main.temp
        const currentHumidity = weatherData.main.humidity
        const currentWindSpeed = (weatherData.wind.speed * 3.6)
        const currentWeatherDescription = weatherData.weather[0].description
        const weathershortDescription = weatherData.weather[0].main
        const currentUserTimezone = weatherData.sys.country

        return [currentTemp, currentHumidity, currentWindSpeed, currentWeatherDescription, weathershortDescription, currentUserTimezone]

    } catch (error) {
        console.log(error.message)
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


function updateCurrentLocationWeatherUi(weatherData, locationName) {
    currentLocationName.textContent = locationName
    currentPlaceTemp.textContent = weatherData[0].toFixed(1) + "°C"
    currentWeatherDescription.textContent = weatherData[3]
    currentWeatherHumidityLevel.textContent = weatherData[1] + "%"
    currentWeatherWindSpeed.textContent = weatherData[2].toFixed(1) + "km/h"
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
        if(data.length === 0) {
            throw new Error("Error: City does not exist")
        }

        const {lat, lon} = data[0]

        return {lat, lon}

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
        const windSpeed = searchedWeatherdata[2].toFixed(1)
        const weatherDescription = searchedWeatherdata[4]
        const countryIsoCode = searchedWeatherdata[5]

        const countryNamesInEnglish = new Intl.DisplayNames(['en'], {type: 'region'})
        const searchedCityCountryName = countryNamesInEnglish.of(`${countryIsoCode}`)

        return [temp, humidity, windSpeed, weatherDescription, searchedLocationName, searchedCityCountryName]

    } catch(error) {
        throw error
    }
}

async function addSearchedWeatherCard(callback){
    try {
        const searchedWeatherData = await getSearchLocationWeatherData()
        const temp = searchedWeatherData[0]
        const humidity = searchedWeatherData[1]
        const windSpeed = searchedWeatherData[2]
        const weatherDescription = searchedWeatherData[3]
        const searchedLocationName = searchedWeatherData[4]
        const searchedCityCountryName = searchedWeatherData[5]

        const weatherCard = document.createElement("div")
        weatherCard.classList.add("searched_weather")
        const leftSideWeatherCorner = createchild(weatherCard, "div", "searched_place_time_other_weather_data")
        const cityName = createchild(leftSideWeatherCorner, "span", "place_name")
        const countryNameBox = createchild(leftSideWeatherCorner, "p", "show_country_time")
        const countryName = createchild(countryNameBox, "span", "country")
        const showHumidityWind = createchild(leftSideWeatherCorner, "p", "show_humidity_wind")
        const showHumidity = createchild(showHumidityWind, "span", "searched_humidity")
        const showWind = createchild(showHumidityWind, "span", "searched_wind")

        const mainWeatherCorner = createchild(weatherCard, "div", "searched_city_temp")
        const cityTemp = createchild(mainWeatherCorner, "span", "mainCityTemp")
        const showWeatherDescription = createchild(mainWeatherCorner, "p", "searched_weather_description")

        const closeBtn = createchild(weatherCard, "div", "close_btn")

        cityName.textContent = searchedLocationName
        countryName.textContent = searchedCityCountryName
        showHumidity.textContent = "H: "+ humidity + "%" + " "
        showWind.textContent = "W: " + windSpeed + "km/h"

        cityTemp.textContent = temp.toFixed(1) + "°C"
        showWeatherDescription.textContent = weatherDescription
        closeBtn.textContent = "✕" 
        searchedWeatherContainer.appendChild(weatherCard)

    } catch (error) {
        console.log(error.message)
    }

}

function isThereAnyWeather() {
    const searchCityTitleEL = document.querySelector(".searched_city_title");
    
    if(searchedWeatherContainer.children.length > 0) {
        searchCityTitleEL.textContent = "Searched cities"
    } else {
        searchCityTitleEL.textContent = "No Searched cities"

    }
}

function createchild(parent, tagName, className) {
    const el = document.createElement(tagName)
    if (className){
        el.classList.add(className)
    }
    parent.appendChild(el)
    return el
}

async function init() {
    const [weatherData, locationName] = await getUserCoordinates()

    updateCurrentLocationWeatherUi(weatherData, locationName)
    updateCurrentLocationDayTime(weatherData)
}

fetchWeatherDataBtn.addEventListener("click", async ()=> {
    await addSearchedWeatherCard()
    isThereAnyWeather()
    userSearchInput.value = ""
})

userSearchInput.addEventListener("keydown", async (e) => {
    if(e.key === "Enter") {
        await addSearchedWeatherCard()
        isThereAnyWeather()
        userSearchInput.value = ""
    }
})

searchedWeatherContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("close_btn")) {
        e.target.parentElement.remove()
        isThereAnyWeather()
    }
})

init()
isThereAnyWeather()
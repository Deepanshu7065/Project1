const cityName = document.querySelector('.cityName');
const searchButton = document.querySelector('.search-btn');
const weatherCard = document.querySelector('.weather-card');
const currentWeather = document.querySelector('.current-weather');
const card = document.querySelector('.card');
const locationButton  = document.querySelector('.search-btn2');

const API_key = "f8a7dc14de2b6b73fe0f23efb1301ca5"

const createWheatherCard = (cityName, weatherItem, index) => {

    if (index === 0) {
        return `
        <div class = "current-weather">
         <div class="details">
        <h2> ${cityName}  (${weatherItem.dt_txt.split(" ")[0]})</h2>
        <h4>temprature :$ ${(weatherItem.main.temp - 273.15).toFixed(2)}&deg;C</h4>
        <h4>Wind :  ${weatherItem.wind.speed}</h4>
        <h4>Humidity : ${weatherItem.main.humidity}</h4>
        </div>
        <div class="icon">
         <img src="OIP.jpg" alt="weather" width="80px" height="50px">
          <h4>Moderate Rain</h4>
         </div>
        </div>`
    }else{

        return `<div class = "card">
     <div class ="card1">
     <h2> ${cityName}</h2>
     <h2> (${weatherItem.dt_txt.split(" ")[0]})</h2>
     <h4>temprature :$ ${(weatherItem.main.temp - 273.15).toFixed(2)}&deg;C</h4>
     <h4>Wind :  ${weatherItem.wind.speed}</h4>
     <h4>Humidity : ${weatherItem.main.humidity}</h4>
     </div>
     </div>`
     
    }
}


const getWeatherDetail = (cityName, lat, lon) => {
    const weatherAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`
    fetch(weatherAPI).then(res => res.json()).then
        (data => {
          
            let forDate = []
            const fivedays = data.list.filter(filterDate => {
                const filterWeatherDate = new Date(filterDate.dt_txt).getDate()
                if (!forDate.includes(filterWeatherDate)) {
                    return forDate.push(filterWeatherDate)
                }
            })
        
            cityName.value = "";
            weatherCard.innerHTML = "";
            currentWeather.innerHTML = "";

            fivedays.forEach((weatherItem, index) => {
                if (index === cityName) {
                    weatherCard.insertAdjacentHTML("afterbegin", createWheatherCard(cityName, weatherItem, index))
                } else {
                    currentWeather.insertAdjacentHTML("beforebegin", createWheatherCard(cityName, weatherItem, index))
                    currentWeather.classList.remove('current-weather')
                    
                }
            })         
        })
        .catch(() => {
            alert("valid ApI")
        })

}

const getCity = () => {
    const cityInput = cityName.value
    const API_URL = (`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=3&appid=${API_key}`)

    fetch(API_URL).then(response => response.json())
        .then
        (data => {

            for (let i = 0; i < data.length; i++) {
                let element = data[i];
                const { name, lat, lon, } = element
                getWeatherDetail(name, lat, lon)
            }
        }).catch(() => {
            alert("valid ApI")
        })

}

searchButton.addEventListener('click', getCity)

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
        console.log(position)
    }),
       error => {
        console.log(error)
    };
}

locationButton.addEventListener('click', getUserCoordinates)
searchButton.addEventListener('click', getCity)



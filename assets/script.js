const API_KEY = '614f9ab2dbacc46c49256732a0839f1e';
var counter = 0; // keeps the location of the search history; makes sure the right results get pulled out of storage

searchHistory(); // First call to pull up the previous search historyf

function submitForm(city) {         // gets called when the submit button clicks to search for a city 

  if (city === undefined) {
    const inputValue = document.getElementById('city').value;
    city = inputValue;
  }


  // Do something with the input value, such as send it to a server


 // Replace with the name of the city you want the forecast for

// Make a request to the OpenWeatherMap API
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    // Extract the weather data for each day

    const forecastData = data.list.filter(weather => weather.dt_txt.includes('12:00:00'));

    // Display the forecast data
    const forecastContainer = document.getElementById('forecast');
    var count = 1;
    forecastData.forEach(weather => {
      const date = new Date(weather.dt_txt);
      const temperature = Math.round(((weather.main.temp - 273.15) * (9/5)) + 32);
      const humidity = weather.main.humidity;
      const windSpeedMph = (weather.wind.speed * 2.23694).toFixed(2);
      var description = weather.weather[0].description;

      switch (description) {
        case 'clear sky': description = '#x1F305'; break;
        case 'few clouds': description = '#x1F324'; break;
        case 'scattered clouds': description = '#x1F325'; break;
        case 'broken clouds': description = '#x1F325'; break;
        case 'shower rain': description = '#x1F327'; break;
        case 'rain': description = '#x1F327'; break;
        case 'thunderstorm': description = '#x26C8'; break;
        case 'snow': description = '#x1F328'; break;
        case 'mist': description = '#x1F32B'; break;
        case 'light rain': description = '#x1F327'; break;
        case 'overcast clouds': description = '#x1F325'; break;
        case 'moderate rain': description = '#x1F327'; break;

      }



      forecastCard = document.getElementById('card-' + count);
            forecastCard.innerHTML = `
        <div class="date bold-text">${date.toLocaleDateString()}</div>
        <div class="temperature">${temperature}&deg;F</div>
        <div class="humidity">${humidity}% humidity</div>
        <div class="wind">${windSpeedMph} mph</div>
        <div class="description">&${description}</div>
      `;
      count++;

    })
  })
  .catch(error => {
    console.error('Error:', error);
  });


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const date = new Date(data.dt * 1000).toLocaleDateString();
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      var description = data.weather[0].description;
      switch (description) {
        case 'clear sky': description = '#x1F305'; break;
        case 'few clouds': description = '#x1F324'; break;
        case 'scattered clouds': description = '#x1F325'; break;
        case 'broken clouds': description = '#x1F325'; break;
        case 'shower rain': description = '#x1F327'; break;
        case 'rain': description = '#x1F327'; break;
        case 'thunderstorm': description = '#x26C8'; break;
        case 'snow': description = '#x1F328'; break;
        case 'mist': description = '#x1F32B'; break;
        case 'overcast clouds': description = '#x1F325'; break;

      }
      const weatherDisplay = `<h2>${city} &${description}</h2> Date: ${date}<br>Temperature: ${temperature} &deg;C<br>Humidity: ${humidity}%<br>Wind Speed: ${windSpeed} m/s<br>`;
      document.getElementById('title').innerHTML = weatherDisplay;
    })
    .catch(error => {
      console.error('Error:', error);
    });

    localStorage.setItem(city, city);
    searchHistory(city);

}


function searchHistory(city) { // gets called to update and display the search history
  var container = document.getElementById('search-history');

  for (let i = counter; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`Key: ${key}, Value: ${value}`);
    if (key === 'city') {
      continue;
    }
    var button = document.createElement('button');
    button.innerHTML = city || value; // allows for the input of a parameter or info from the search bar in html
    if (button.innerHTML === city) {
      button.innerHTML = `<div class="search-history">${city}</div>`
      button.setAttribute('onclick', `submitForm('${city}')`);
    }
    else {
      button.innerHTML = `<div class="search-history">${value}</div>`
      button.setAttribute('onclick', `submitForm('${value}')`);
    }

    container.appendChild(button);
    counter++;
  }




}

function clearHistory() { // clears the search history
  localStorage.clear();
  document.getElementById('search-history').innerHTML = '';
  counter = 0;
}


async function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather);

}

attachEvents();

async function getWeather() {
    let code = '';
    try {
        code = await getCode();

    } catch (error) {
        const input = document.getElementById('location');
        input.value = 'Error'
        return;
    }
    const [currentWeather, upcomingWeather] = await Promise.all([
        getCurrent(code),
        getUpcoming(code)
    ]);
    const forecast = document.getElementById('forecast');
    forecast.style.display = 'block';
    const weatherStyle = {
        'Sunny': '&#x2600;', // ☀
        'Partly sunny': '&#x26C5;', // ⛅
        'Overcast': '&#x2601;', // ☁
        'Rain': '&#x2614;', // ☂
        'Degrees': '&#176;'   // °
    }

    const currentCondition = document.getElementById('current');
    const symbolSpan = document.createElement('span');
    symbolSpan.classList.add('condition');
    symbolSpan.classList.add('symbol');
    symbolSpan.innerHTML = weatherStyle[currentWeather.forecast.condition];

    const divEl = e('div', symbolSpan);
    divEl.classList.add('forecasts');

    const typeWeather = e('span', currentWeather.forecast.condition);
    typeWeather.classList.add('forecast-data');
    const citySpan = e('span', currentWeather.name);
    citySpan.classList.add('forecast-data');
    const tempSpan = document.createElement('span');
    tempSpan.innerHTML = `${currentWeather.forecast.low}${weatherStyle.Degrees}/${currentWeather.forecast.high}${weatherStyle.Degrees}`;
    tempSpan.classList.add('forecast-data');
    const span = e('span', citySpan);
    span.classList.add('condition');
    span.appendChild(tempSpan);
    span.appendChild(typeWeather);

    divEl.appendChild(span);

    currentCondition.appendChild(divEl);
    const upcomingDiv = document.getElementById('upcoming');
    const upcSpanElements = upcomingWeather.forecast.map(f => {
        // const symbolSpanF = e('span', weatherStyle[f.condition]);
        const symbolSpanF = document.createElement('span');
        symbolSpanF.innerHTML = weatherStyle[f.condition];
        symbolSpanF.classList.add('condition');
        symbolSpanF.classList.add('symbol');

        const typeWeatherF = e('span', f.condition);
        typeWeatherF.classList.add('forecast-data');
        const spanF = e('span', symbolSpanF);
        const spanTempF = document.createElement('span');
        spanTempF.innerHTML = `${f.low}${weatherStyle.Degrees}/${f.high}${weatherStyle.Degrees}`;
        spanTempF.classList.add('forecast-data');
        spanF.classList.add('upcoming');
        spanF.appendChild(spanTempF);
        spanF.appendChild(typeWeatherF);
        return spanF;
    })
    const upcDiv = e('div', upcSpanElements[0]);
    upcDiv.classList.add('forecast-info');
    upcDiv.appendChild(upcSpanElements[1]);
    upcDiv.appendChild(upcSpanElements[2]);
    upcomingDiv.appendChild(upcDiv);
}

async function getCode() {
    const input = document.getElementById('location');
    const cityName = input.value;

    const url = 'http://localhost:3030/jsonstore/forecaster/locations';

    const response = await fetch(url);
    const data = await response.json();
    let city = data.find(x => x.name.toLowerCase() === cityName.toLowerCase());
    return city.code;

}
async function getCurrent(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;

    const response = await fetch(url);
    const data = await response.json();

    return data;

}
async function getUpcoming(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}
function e(type, content) {
    const result = document.createElement(type);
    if (typeof content == 'string') {
        result.textContent = content;
    } else {
        result.appendChild(content);
    }
    return result;
}
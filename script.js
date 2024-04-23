let clickCount = 0;

const countryInput = document.getElementById('country');
const countryCodeInput = document.getElementById('countryCode');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}


async function fetchAnd() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        countryInput.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
        getCountryByIP();
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        const countriesList = document.getElementById('countriesList');
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            countriesList.appendChild(option);
        });
        getCountryByIP();
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}


function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            //const option = document.createElement('option');
            //option.value = country;
            //option.textContent = country;
            //option.selected = true; 
            //countryInput.appendChild(option);
            //document.getElementById('countryInput').value = country;
            countryInput.value = country;
            getCountryCode();
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode() {
    const countryName = countryInput.value;
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {        
        const countryCode = data[0].idd.root + data[0].idd.suffixes.join("");
        const option = document.createElement('option');
        option.value = countryCode;
        option.textContent = countryCode;
        option.selected = true; 
        countryCodeInput.appendChild(option);
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}


(() => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);
    fetchAndFillCountries();
    countryInput.addEventListener('change', getCountryCode);
   
})()


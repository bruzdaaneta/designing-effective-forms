let clickCount = 0;

const countryInput = document.getElementById('country');
const countryCodeInput = document.getElementById('countryCode');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');
const vatUECheckbox = document.getElementById('vatUE');
const vatNumberInput = document.getElementById('vatNumber');

const countriesPrefix = {
    "Austria": "AT",
    "Belgium": "BE",
    "Bulgaria": "BG",
    "Croatia": "HR",
    "Cyprus": "CY",
    "Czechia:": "CZ",
    "Denmark": "DK",
    "Estonia": "EE",
    "Finland": "FI",
    "France": "FR",
    "Greece": "EL",
    "Spain": "NL",
    "Ireland": "IE",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "Latvia": "LV",
    "Malta": "MT",
    "Germany": "DE",
    "Poland": "PL",
    "Portugal": "PT",
    "Romania": "RO",
    "Slovakia": "SK",
    "Slovenia": "SI",
    "Sweden": "SE",
    "Hungary": "HU",
    "Italy": "IT" 
};

function fillUENumber() {
    if (vatUECheckbox.checked) {
        let prefix = createPrefix();
        vatNumberInput.value = prefix + vatNumberInput.value;
    }
    else {
        vatNumberInput.value = vatNumberInput.value.substring(2);
    }
}

function disableUEVat() {
    if (!(countryInput.value in countriesPrefix)) {
        vatUECheckbox.checked = false;
    }
    else vatUECheckbox.checked = true;
    fillUENumber();
}


function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

function createPrefix() {
    const country = countryInput.value;
    const prefix = country.slice(0, 2);
    return prefix.toUpperCase();
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
            countryInput.value = country;
            getCountryCode();
            disableUEVat();
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

vatUECheckbox.addEventListener('change', fillUENumber);

(() => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);
    fetchAndFillCountries();
    countryInput.addEventListener('change', getCountryCode);
    countryInput.addEventListener('change', disableUEVat);
   
})()


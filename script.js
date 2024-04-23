let clickCount = 0;

const countryInput = document.getElementById('country');
const countryCodeInput = document.getElementById('countryCode');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');
const vatUECheckbox = document.getElementById('vatUE');
const vatNumberInput = document.getElementById('vatNumber');
const invoiceData = document.getElementById('invoiceData');
const inputs = document.querySelectorAll('.next-input');


const nameError = document.getElementById("name-error");
const surnameError = document.getElementById("surname-error");
const streetError = document.getElementById("street-error");
const zipCodeError = document.getElementById("zipCode-error");
const cityError = document.getElementById("city-error");
const countryError = document.getElementById("country-error");
const phoneNumberError = document.getElementById("phoneNumber-error");
const vatNumberError = document.getElementById("vatNumber-error");
const emailError = document.getElementById("email-error");

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

function trimInput(inputValue) {
    var trimmedValue = inputValue.trim();
    return trimmedValue;
}

function containsOnlyLetters(inputValue, allowNumbers) {
    if (allowNumbers)
        return /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż0-9.\s-]*$/.test(inputValue);
    else return /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s-]*$/.test(inputValue);
}

function containsOnlyNumbers(inputValue, allowLetters) {
    if (allowLetters)
        return /^(?=.*\d)[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż0-9/]*$/.test(inputValue);
    else return /^(?=.*\d)[0-9/]*$/.test(inputValue); //true - przynajmniej jedna cyfra
}

function zipCodeCorrect(inputValue) {
    var regex = /^\d{2}-\d{3}$/;
    return regex.test(inputValue);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validation(name, surname, street, zipCode, city, country, phoneNumber, vatNumber, email) {
    //flagi do walidacji
    let validName = true;
    let validSurname = true;
    let validStreet = true;
    let validZipCode = true;
    let validCity = true;
    let validCountry = true;
    let validPhoneNumber = true;
    let validVatNumber = true;
    let validEmail = true;

    //walidacja imie - dozwolone litery, '-'
    name = trimInput(name);
    if (name.trim() !== "") {
        if (!containsOnlyLetters(name, false)) {
            nameError.innerText = "Niepoprawnie wprowadzone dane.";
            nameError.style.display = "block";
            validName = false;
        } 
        else nameError.style.display = "none";
    
    } else {
        nameError.innerText = "Uzupełnij pole!";
        nameError.style.display = "block";
        validName = false;
    }

    //walidacja nazwisko - dozwolone litery, '-'
    surname = trimInput(surname);
    if (surname.trim() !== "") {
        if (!containsOnlyLetters(surname, false)) {
            surnameError.innerText = "Niepoprawnie wprowadzone dane.";
            surnameError.style.display = "block";
            validSurname = false;
        } else surnameError.style.display = "none";
        
    } else {
        surnameError.innerText = "Uzupełnij pole!";
        surnameError.style.display = "block";
        validSurname = false;
    }


    //walidacja ulica - dozwolone litery, '-', '/', '.', spacje, numery
    street = trimInput(street);
    if (street.trim() !== "") {
        console.log(street);
        if (!containsOnlyLetters(street, true)) {
            streetError.innerText = "Niepoprawnie wprowadzone dane.";
            streetError.style.display = "block";
            validStreet = false;
        } else streetError.style.display = "none";
        
    } else {
        streetError.innerText = "Uzupełnij pole!";
        streetError.style.display = "block";
        validStreet = false;
    }


    //walidacja miasto - dozwolone litery, '-'
    city = trimInput(city);
    if (city.trim() !== "") {
        if (!containsOnlyLetters(city, false)) {
            cityError.innerText = "Niepoprawnie wprowadzone dane.";
            cityError.style.display = "block";
            validCity = false;
        } else cityError.style.display = "none";
        
    } else {
        cityError.innerText = "Uzupełnij pole!";
        cityError.style.display = "block";
        validCity = false;
    }

    //walidacja kraj - dozwolone litery
    country = trimInput(country);
    if (country.trim() !== "") {
        if (!containsOnlyLetters(country, false)) {
            countryError.innerText = "Niepoprawnie wprowadzone dane.";
            countryError.style.display = "block";
            validCountry = false;
        } else countryError.style.display = "none";
        
    } else {
        countryError.innerText = "Uzupełnij pole!";
        countryError.style.display = "block";
        validCountry = false;
    }

    //walidacja kod pocztowy - format XX-XXX
    zipCode = trimInput(zipCode);
    if (zipCode.trim() !== "") {
        console.log(zipCode);
        if (!zipCodeCorrect(zipCode)) {
            zipCodeError.innerText = "Niepoprawnie wprowadzone dane.";
            zipCodeError.style.display = "block";
            validZipCode = false;
        } else zipCodeError.style.display = "none";
        
    } else {
        zipCodeError.innerText = "Uzupełnij pole!";
        zipCodeError.style.display = "block";
        validZipCode = false;
    }

    //walidacja numerTelefonu
    phoneNumber = trimInput(phoneNumber);
    if (phoneNumber.trim() !== "") {
        if (!containsOnlyNumbers(phoneNumber, false)) {
            phoneNumberError.innerText = "Niepoprawnie wprowadzone dane.";
            phoneNumberError.style.display = "block";
            validPhoneNumber = false;
        } 
        else phoneNumberError.style.display = "none";
        
    } else {
        phoneNumberError.innerText = "Uzupełnij pole!";
        phoneNumberError.style.display = "block";
        validPhoneNumber = false;
    }

    //walidacja numer vat
    vatNumber = trimInput(vatNumber);
    if (vatNumber.trim() !== "") {
        if (!containsOnlyNumbers(vatNumber, true)) {
            vatNumberError.innerText = "Niepoprawnie wprowadzone dane.";
            vatNumberError.style.display = "block";
            validVatNumber = false;
        } 
        else vatNumberError.style.display = "none";
        
    } else {
        vatNumberError.innerText = "Uzupełnij pole!";
        vatNumberError.style.display = "block";
        validVatNumber = false;
    }
    
     //walidacja email
    email = trimInput(email);
    if (email.trim() !== "") {
        if (!validateEmail(email)) {
            emailError.innerText = "Niepoprawnie wprowadzone dane.";
            emailError.style.display = "block";
            validEmail = false;
        } 
        else emailError.style.display = "none";
    } else {
        emailError.innerText = "Uzupełnij pole!";
        emailError.style.display = "block";
        validEmail = false;
    }

    if (validName && validSurname && validStreet && validZipCode && validCity && validCountry && validPhoneNumber && validVatNumber && validEmail) return true;
    else return false;
}


inputs.forEach((input, index) => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          
            if (index < inputs.length - 1) {
                e.preventDefault(); 
             
                inputs[index + 1].focus();
            } else {
                //e.preventDefault(); 
                const name = document.querySelector('input[name="name_input"]').value;
                const surname = document.querySelector('input[name="surname_input"]').value;
                const street = document.querySelector('input[name="street_input"]').value;
                const zipCode = document.querySelector('input[name="zipCode_input"]').value;
                const city = document.querySelector('input[name="city_input"]').value;
                const country = document.querySelector('input[name="country_input"]').value;
                const phoneNumber = document.querySelector('input[name="phoneNumber_input"]').value;
                const vatNumber = document.querySelector('input[name="vatNumber_input"]').value;
                const email = document.querySelector('input[name="email_input"]').value;
                let validate = validation(name, surname, street, zipCode, city, country, phoneNumber, vatNumber, email);
                //if(validate) console.log("git"); //input.form.submit();
            }
        }
    });
});

function fillUENumber() {
    vatNumberInput.value = vatNumberInput.value.substring(2);
    if (vatUECheckbox.checked) {
        let prefix = countriesPrefix[countryInput.value];
        vatNumberInput.value = prefix + vatNumberInput.value;
    }
    else {
        vatNumberInput.value = vatNumberInput.value.substring(2);
    }
}

function fillInvoiceData() {
    invoiceData.textContent = "Numer VAT: " + vatNumberInput.value;
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
            vatNumberInput.textContent = '';
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

const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.querySelector('input[name="name_input"]').value;
    const surname = document.querySelector('input[name="surname_input"]').value;
    const street = document.querySelector('input[name="street_input"]').value;
    const zipCode = document.querySelector('input[name="zipCode_input"]').value;
    const city = document.querySelector('input[name="city_input"]').value;
    const country = document.querySelector('input[name="country_input"]').value;
    const phoneNumber = document.querySelector('input[name="phoneNumber_input"]').value;
    const vatNumber = document.querySelector('input[name="vatNumber_input"]').value;
    const email = document.querySelector('input[name="email_input"]').value;
    
    let isValid = validation(name, surname, street, zipCode, city, country, phoneNumber, vatNumber, email);
    
    if (isValid) {
        $('#form-feedback-modal').modal('show');
    }
});


(() => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);
    fetchAndFillCountries();
    countryInput.addEventListener('change', getCountryCode);
    countryInput.addEventListener('change', disableUEVat);
    countryInput.addEventListener('change', fillInvoiceData);
    vatNumberInput.addEventListener('change', fillInvoiceData);
   
})()









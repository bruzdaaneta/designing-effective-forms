const name = document.querySelector('input[name="name_input"]').value;
const surname = document.querySelector('input[name="surname_input"]').value;
const street = document.querySelector('input[name="street_input"]').value;
const zipCode = document.querySelector('input[name="zipCode_input"]').value;
const city = document.querySelector('input[name="city_input"]').value;
const country = document.querySelector('input[name="country_input"]').value;
const phoneNumber = document.querySelector('input[name="phoneNumber_input"]').value;
const vatNumber = document.querySelector('input[name="vatNumber_input"]').value;
const email = document.querySelector('input[name="email_input"]').value;


const nameError = document.getElementById("name-error");
const surnameError = document.getElementById("surname-error");
const streetError = document.getElementById("street-error");
const zipCodeError = document.getElementById("zipCode-error");
const cityError = document.getElementById("city-error");
const countryError = document.getElementById("country-error");
const phoneNumberError = document.getElementById("phoneNumber-error");
const vatNumberError = document.getElementById("vat-error");
const emailError = document.getElementById("email-error");


function trimInput(inputValue) {
    var trimmedValue = inputValue.trim();
    return trimmedValue;
}

//zezwala na spacje
function containsOnlyLetters(inputValue, allowNumbers) {
    if (allowNumbers)
        return /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż0-9.\s-]*$/.test(inputValue);
    else return /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s-]*$/.test(inputValue); //true - same dozwolone znaki
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
document.addEventListener('DOMContentLoaded', () => {
    const modeButton = document.getElementById('mode-button');
    const body = document.body;

    const toggleMode = () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            modeButton.innerHTML = '<i class="far fa-moon"></i> Dark Mode';
        } else {
            modeButton.innerHTML = '<i class="fas fa-moon"></i> Light Mode';
        }
    };

    modeButton.addEventListener('click', toggleMode);
});


function countriesCards(countries) {
    const card = document.getElementById('countries-cards');
    card.innerHTML = '';
    if (countries.length === 0) {
        card.innerHTML = '<p>No countries found.</p>';
        return;
    }
    else{
    countries.forEach(element => {
        const country = document.createElement('div');
        country.classList.add('country-card');
        country.innerHTML = `
            <img src="${element.flags.png}" alt="${element.name.common}">
            <div class="info">
                <h3>${element.name.common}</h3>
                <p><strong>Population:</strong> ${element.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${element.region}</p>
                <p><strong>Capital:</strong> ${element.capital}</p>
            </div>
        `;
        country.addEventListener('click', () => {
           const countryCode = element.cca3; 
            window.location.href = `./Switzerland/index.html?code=${countryCode}`; 
        });

        card.appendChild(country);
    });
}
}


function handleSearchAndFilter() {
    const searchWord = document.getElementById('searchInput').value.toLowerCase();
    const filterRegion = document.getElementById('filter').value;

    const filteredCountries = countries.filter(country => {
        const matchesName = country.name.common.toLowerCase().includes(searchWord);
        const matchesRegion = filterRegion === 'all' || country.region.toLowerCase() === filterRegion;
        return matchesName && matchesRegion;
    });

    countriesCards(filteredCountries);
}


let countries = [];

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        countries = data;
        countriesCards(countries);
    })
    .catch(error => console.error('Error fetching countries:', error));

document.getElementById('searchInput').addEventListener('input', handleSearchAndFilter);
document.getElementById('filter').addEventListener('change', handleSearchAndFilter);

function displayResults(countries) {
    countriesCards(countries);
}

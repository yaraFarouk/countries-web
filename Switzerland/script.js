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




document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const countryCode = urlParams.get('code');

    if (!countryCode) {
        console.error('Country code not found in the URL');
        return;
    }

    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                console.error('No data found for the given country code');
                return;
            }

            const country = data[0];
            console.log('Fetched country data:', country);

            document.getElementById('country-name').textContent = country.name.common || 'N/A';
            document.getElementById('native-name').textContent =
                country.name.nativeName
                    ? country.name.nativeName[Object.keys(country.name.nativeName)[0]].common
                    : 'N/A';
            document.getElementById('population').textContent = country.population
                ? country.population.toLocaleString()
                : 'N/A';
            document.getElementById('region').textContent = country.region || 'N/A';
            document.getElementById('sub-region').textContent = country.subregion || 'N/A';
            document.getElementById('capital').textContent = country.capital ? country.capital[0] : 'N/A';
            document.getElementById('languages').textContent = country.languages
                ? Object.values(country.languages).join(', ')
                : 'N/A';
            document.getElementById('currency').textContent = country.currencies
                ? Object.values(country.currencies).map(c => c.name).join(', ')
                : 'N/A';
            document.getElementById('top-level-domain').textContent = country.tld.join(', ') || 'N/A';
            document.getElementById('flag').src = country.flags.png || '';

            const borderCountries = document.getElementById('border-countries');
            borderCountries.innerHTML = ''; 
            if (country.borders) {
                country.borders.forEach(border => {
                    const borderButton = document.createElement('button');
                    borderButton.textContent = border;
                    borderButton.addEventListener('click', () => {
                        window.location.href = `?code=${border}`; 
                    });
                    borderCountries.appendChild(borderButton);
                });
            } else {
                borderCountries.textContent = 'None';
            }
        })
        .catch(error => {
            console.error('Error fetching country details:', error);
            alert('Failed to load country details. Please try again later.');
        });
});

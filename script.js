document.addEventListener('DOMContentLoaded',()=>{
const modeButton=document.getElementById('mode-button');
const body=document.body;
const toggleMode =()=>{
    body.classList.toggle('light-mode');
    if(body.classList.contains('light-mode')){
        modeButton.innerHTML='<i class="far fa-moon"></i>Dark Mode';
    
    }
    else {
        modeButton.innerHTML='<i class="fas fa-moon"></i>Dark Mode';
     
    }
};
modeButton.addEventListener('click',toggleMode);
});

function countriesCards(countries){
    const card = document.getElementById('countries-cards');
    card.innerHTML='';
    countries.forEach(element => {
        const country=document.createElement('div');
        country.classList.add('country-card');
        country.innerHTML= `
                  <img src="${element.flags.png}" alt="${element.name.common}">
                  <div class="info">
                  <h3>${element.name.common}</h3>
                  <p><strong>Population:</strong> ${element.population.toLocaleString()}</p>
                  <p><strong>Region:</strong> ${element.region}</p>
                  <p><strong>Capital:</strong> ${element.capital}</p>
                  
                  </div>
        `;
        card.appendChild(country)
    });
}
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
      countries = data;
      countriesCards(countries);
  });
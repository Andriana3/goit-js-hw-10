
import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";


const errLoader = document.querySelector('.loader');
const errElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');
errLoader.textContent = '';

// errLoader.classList.remove('is-hidden');
breedSelect.classList.add('is-hidden');

fetchBreeds()
  .then(breeds => {
      showLoader()
        // hideLoader();
    showCatInfo()
    errLoader.classList.add('is-hidden');
    

    breedSelect.classList.remove('is-hidden');
        
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
        
        const breedSelectInstance = new SlimSelect({
            select: '#selectElement',
            theme: 'my-custom-theme'
});
    })
    
    .catch(error => {
      hideLoader();
      showError();
      hideCatInfo()
       console.log("помилка")
  });



breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  showLoader()
hideCatInfo()
    
  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        hideLoader();
        hideError()
        showCatInfo()

        catInfo.innerHTML = `
        <img src="${catData[0].url}" alt="Зображення кота" width = "500px" heigth = "500px">
        <h2>Назва породи: ${catData[0].breeds[0].name}</h2>
        <p>Опис: ${catData[0].breeds[0].description}</p>
        <p>Темперамент: ${catData[0].breeds[0].temperament}</p>
      `;
      })
      .catch(error => {
        console.log("помилка")
        showError()
        hideCatInfo()
      });
  }
});


function showLoader() {
  errLoader.classList.remove('is-hidden');
  errLoader.textContent = '';
  breedSelect.classList.add('is-hidden')
}

function hideLoader() {
  errLoader.classList.add('is-hidden');
  breedSelect.classList.remove('is-hidden')
}

function showError() {
  errElement.classList.remove('is-hidden');
  
}

function hideError() {
  errElement.classList.add('is-hidden');
}

function showCatInfo() {
  catInfo.classList.remove('is-hidden');
}

function hideCatInfo() {
  catInfo.classList.add('is-hidden');
}
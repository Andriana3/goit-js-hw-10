
import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";


const errLoader = document.querySelector('.loader');
const errElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');



fetchBreeds()
    .then(breeds => {
        hideLoader();
        
    breedSelect.classList.remove('hide');
    breedSelect.classList.add('show');
        
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
       console.log("помилка")
  });



breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
    showLoader()
    

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
        hideLoader();
        hideError()
        

      catInfo.innerHTML = `
        <img src="${catData[0].url}" alt="Зображення кота" width = "500px" heigth = "500px">
        <h2>Назва породи: ${catData[0].breeds[0].name}</h2>
        <p>Опис: ${catData[0].breeds[0].description}</p>
        <p>Темперамент: ${catData[0].breeds[0].temperament}</p>
      `;
    })
    .catch(error => {
     console.log("помилка")
    });
});


function showLoader() {
  errLoader.classList.remove('hide');
  errLoader.classList.add('show');
}

function hideLoader() {
  errLoader.classList.remove('show');
  errLoader.classList.add('hide');
}

function showError() {
  errElement.classList.remove('hide');
  errElement.classList.add('show');
}

function hideError() {
  errElement.classList.remove('show');
  errElement.classList.add('hide');
}

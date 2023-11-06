import axios from "axios";

const apiKey = "live_YqUbUCuB1EKCZGys69tReKhwn2lJwWlj4Ma233Vk5Xa9G9B4PA81qKnXAivZYq1w";
axios.defaults.headers.common["x-api-key"] = apiKey;

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
       error;
    });
}

export function fetchCatByBreed(breedId) {
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios.get(apiUrl)
    .then(response => response.data)
    .catch(error => {
       error;
    });
}
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/api/items";

export const searchItemsByText = query => {
  return fetch(`${baseUrl}?q=${query}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getItem = id => {
  return fetch(`${baseUrl}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getItemDescription = id => {
  return fetch(`${baseUrl}/${id}/description`)
    .then(handleResponse)
    .catch(handleError);
};

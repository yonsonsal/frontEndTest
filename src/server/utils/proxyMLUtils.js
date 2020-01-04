const fetch = require("node-fetch");
const { handleResponse, handleError } = require("./responseUtils");

//Default API endpoint
const DEFAULT_ML_API_BASE_URL = "https://api.mercadolibre.com/";
//ML SITE by default
const DEFAULT_ML_SITE = "MLA";

const ML_SITE = process.env.ML_SITE || DEFAULT_ML_SITE;

const API_BASE_URL = process.env.ML_API_BASE_URL || DEFAULT_ML_API_BASE_URL;

const ML_API_SEARCH_ITEMS_END_POINT = `${API_BASE_URL}/sites/${ML_SITE}/search?`;

const ML_API_ITEMS_END_POINT = `${API_BASE_URL}/items`;
const ML_API_CATEGORIES_END_POINT = `${API_BASE_URL}/categories`;

module.exports = {
  mlEndpointNames: {
    searchItemsApi: "ML_API_SEARCH_ITEMS_END_POINT",
    itemsApi: "ML_API_ITEMS_END_POINT",
    itemsDescriptionApi: "ML_API_ITEMS_DESCRIPTION_END_POINT",
    itemsCategoriesApi: "ML_API_ITEMS_CATEGORIES_END_POINT"
  },

  /**
   *
   * @param {Name of the ML API} apiName
   * @param {Param to call the API} param
   * This method returns a promise
   * which gets resolved or rejected based
   * on the result from the ML API
   */

  callMLAPI(apiName, param) {
    let url = "";
    // eslint-disable-next-line default-case
    switch (apiName) {
      case "ML_API_SEARCH_ITEMS_END_POINT":
        url = `${ML_API_SEARCH_ITEMS_END_POINT}q=${param}`;
        break;
      case "ML_API_ITEMS_END_POINT":
        url = `${ML_API_ITEMS_END_POINT}/${param}`;
        break;
      case "ML_API_ITEMS_CATEGORIES_END_POINT":
        url = `${ML_API_CATEGORIES_END_POINT}/${param}`;
        break;
      case "ML_API_ITEMS_DESCRIPTION_END_POINT":
        url = `${ML_API_ITEMS_END_POINT}/${param}/description`;
        break;
    }

    return fetch(url)
      .then(res => res.json())
      .catch(handleError);
  }
};

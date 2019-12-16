//Default API endpoint
const DEFAULT_ML_API_BASE_URL = "https://api.mercadolibre.com/";
//ML SITE by default
const DEFAULT_ML_SITE = "MLA";

const ML_SITE = process.env.ML_SITE || DEFAULT_ML_SITE;

const API_BASE_URL = process.env.ML_API_BASE_URL || DEFAULT_ML_API_BASE_URL;

const ML_API_SEARCH_ITEMS_END_POINT = `${API_BASE_URL}/sites/${ML_SITE}/search?`;

const ML_API_ITEMS_END_POINT = `${API_BASE_URL}/items`;

module.exports = {
  /*
   ** This method returns a promise
   ** which gets resolved or rejected based
   ** on the result from the API
   */
  make_ML_API_call(apiName, param) {
    let url = "";
    switch (apiName) {
      case "ML_API_SEARCH_ITEMS_END_POINT":
        url = ML_API_SEARCH_ITEMS_END_POINT;
        break;
      case "ML_API_ITEMS_END_POINT":
        url = `${ML_API_ITEMS_END_POINT}/${param}`;
        break;
      case "ML_API_ITEMS_DESCRIPTION_END_POINT":
        url = `${ML_API_ITEMS_END_POINT}/${param}/description`;
        break;
    }

    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, res, body) => {
        if (err) reject(err);
        resolve(body);
      });
    });
  },

  /**
   *
   * @param {Taguea el json devuelto con el author} json
   */
  tagAuthor(json) {
    const author = { name: "Ignacio", lastName: "Talavera" };
    return { ...author, json };
  },

  sortArraybyId(ids, data) {
    let result = [];
    data.forEach(function(a) {
      result[ids.indexOf(a.id)] = a;
    });
    return result;
  }
};

const { from, of, forkJoin } = require("rxjs");
const { map, mergeMap, toArray } = require("rxjs/operators");
const { mlEndpointNames, callMLAPI } = require("./proxyMLUtils");

sortArraybyId = (ids, data) => {
  let result = [];
  data.forEach(function(a) {
    result[ids.indexOf(a.id)] = a;
  });
  return result;
};
/**
 *
 * @param { filters array from JSON query} filters
 * returns String array with name of the category of the filter
 */

const flatCategories = searchResponse => {
  let pluckedCategoryArray = [];

  if (searchResponse.filters.length > 0) {
    pluckedCategoryArray = searchResponse.filters
      .filter(_filter => _filter.id == "category")[0]
      .values[0].path_from_root.map(path => path.name);
  }
  /*
  else {
    if (searchResponse.available_filters.length > 0) {
      pluckedCategoryArray = searchResponse.available_filters
        .filter(_filter => _filter.id == "category")[0]
        .values.map(path => path.name);
    }
  }*/

  return pluckedCategoryArray;
};

/**
 *
 * @param {ItemId result of a Request from ML SearchAPI} itemId
 */
const getObservableItem = itemId => {
  return from(callMLAPI(mlEndpointNames.itemsApi, itemId));
  //return from(fetch(`${itemURL}/${itemId}`).then(response => response.json()));
};

const getObservableItemDescription = itemId => {
  return from(callMLAPI(mlEndpointNames.itemsDescriptionApi, itemId));
  //return from(fetch(`${itemURL}/${itemId}`).then(response => response.json()));
};

const buildCurrencyfromPrice = price => {
  const _amount = Math.floor(price / 1000);
  const _decimal = price % 1000;
  const amount = _amount == 0 ? _decimal : _amount;
  const decimals = _decimal == price ? 0 : _decimal;

  return { amount: amount, decimals: decimals };
  // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

/**
 *
 * @param {Item result of getObservableItem method} item
 * returns an item with the following structure
 * {
        "id": String,
        "title": String,
        "price": {
        "currency": String,
        "amount": Number,
        "decimals": Number
        },
        “picture”: String,
        "condition": String,
        "free_shipping": Boolean
      }
 */
const mapItemForSeachResult = item => {
  const { price, currency_id } = item;
  const { amount, decimals } = buildCurrencyfromPrice(price);
  const { id, title, condition } = item;
  const {
    shipping: { free_shipping }
  } = item;

  let _price = {
    currency: currency_id,
    amount: amount,
    decimals: decimals
  };
  return {
    id: id,
    title: title,
    price: _price,
    picture: item.pictures[0].url,
    condition: condition,
    free_shipping: free_shipping
  };
};

mapItemForResult = ({ item, itemDescription }) => {
  const _item = mapItemForSeachResult(item);
  return {
    ..._item,
    description: itemDescription.plain_text,
    sold_quantity: item.sold_quantity
  };
};

/**
 *
 * @param {Array of id of Items result of ML API SearchItems } itemsIdArray
 * returns an observable fullfilled with all information of items requested
 *
 */
const transformItemIdArray = itemsIdArray => {
  return from(itemsIdArray).pipe(
    mergeMap(itemId => getObservableItem(itemId)),
    map(_item => {
      return mapItemForSeachResult(_item);
    }),
    toArray(),
    map(_array => sortArraybyId(itemsIdArray, _array))
  );
};
/**
 *
 * @param {Response from ML Search Item APIRest } searchResponse
 * returns an observable with the result of the custom API
 */
const buildSearchResponse = searchResponse => {
  const itemIdArray = searchResponse.results.map(x => x.id);
  const itemArray$ = transformItemIdArray(itemIdArray);
  const categories$ = of(flatCategories(searchResponse));

  return forkJoin({
    categories: categories$,
    items: itemArray$
  });
};

const getItemResponse = itemId => {
  const itemReq$ = getObservableItem(itemId);
  const itemDescriptionReq$ = getObservableItemDescription(itemId);
  const itemResponse$ = forkJoin({
    item: itemReq$,
    itemDescription: itemDescriptionReq$
  }).pipe(
    map(joinedItem => {
      return mapItemForResult(joinedItem);
    })
  );
  return itemResponse$;
};
const handleError = error => {
  console.error("API call failed. " + error);
  throw error;
};

/**
 *
 * @param {Taguea el json devuelto con el author} json
 */
const tagAuthor = json => {
  const _author = { author: { name: "Ignacio", lastName: "Talavera" } };
  return { ..._author, ...json };
};

const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};
const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.render("error", { error: err });
};

module.exports = {
  buildSearchResponse: buildSearchResponse,
  tagAuthor: tagAuthor,
  logErrors: logErrors,
  errorHandler: errorHandler,
  getObservableItem: getObservableItem,
  getItemResponse: getItemResponse
};

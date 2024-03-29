const { from, of, forkJoin } = require("rxjs");
const { map, mergeMap, toArray, tap } = require("rxjs/operators");
const { mlEndpointNames, callMLAPI } = require("./proxyMLUtils");
const { ErrorHandler } = require("./error-handler");

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
  let itemCategories$, firstItem, categoriesResult$;

  if (searchResponse.filters.length > 0) {
    pluckedCategoryArray = searchResponse.filters
      .filter(_filter => _filter.id == "category")[0]
      .values[0].path_from_root.map(path => path.name);
    categoriesResult$ = of(pluckedCategoryArray);
  } else {
    //The search result doesn't contain filters array
    //obtain the array categories from api categories of first item
    if (searchResponse.available_filters.length > 0) {
      firstItem = searchResponse.results[0];
      categoriesResult$ = getObservableItemCategory(firstItem.category_id).pipe(
        map(_item => _item.path_from_root.map(x => x.name))
      );
    }
  }

  /*
  else {
    if (searchResponse.available_filters.length > 0) {
      pluckedCategoryArray = searchResponse.available_filters
        .filter(_filter => _filter.id == "category")[0]
        .values.map(path => path.name);
    }
  }*/

  return categoriesResult$;
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
const getObservableItemCategory = categoryId => {
  return from(callMLAPI(mlEndpointNames.itemsCategoriesApi, categoryId));
  //return from(fetch(`${itemURL}/${itemId}`).then(response => response.json()));
};

const buildCurrencyfromPrice = price => {
  const _amount = Math.floor(price / 1000);
  const _decimal = Math.floor(price % 1000);
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
    free_shipping: free_shipping,
    state_name: item.seller_address
      ? item.seller_address.state.name
      : "Capital Federal"
  };
};

// eslint-disable-next-line no-undef
mapItemForResult = ({ categories, item, itemDescription }) => {
  const _item = mapItemForSeachResult(item);
  return {
    ..._item,
    description: itemDescription.plain_text,
    sold_quantity: item.sold_quantity,
    categories: categories
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
  const categories$ = flatCategories(searchResponse); //of(flatCategories(searchResponse));

  return forkJoin({
    categories: categories$,
    items: itemArray$
  });
};

//TODO usar tap para tirar exception
const getItemResponse = itemId => {
  const itemReq$ = getObservableItem(itemId);

  //TODO inner forkjoin to avoid itemReq
  const itemCategories$ = itemReq$.pipe(
    tap(x => {
      handleObservableResponse(x);
    }),
    mergeMap(item => getObservableItemCategory(item.category_id)),
    map(_item => _item.path_from_root.map(x => x.name))
  );

  //itemCategories$.subscribe(x => console.log("Item Categories=>", x));
  //_f$.subscribe(x => console.log("Item forkJoin Categories=>", x));

  const itemDescriptionReq$ = getObservableItemDescription(itemId);
  const itemResponse$ = forkJoin({
    categories: itemCategories$,
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

const handleObservableResponse = response => {
  if (response.status !== "active") {
    throw new ErrorHandler(response.status, response.message);
  }
};

const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};
const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.render("error", { error: err });
};
function handleResponse(response) {
  console.log(" handleResponse response =", response);
  if (response.ok) return response.json();
  else {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.

    const error = response.json();
    throw ErrorHandler(error.status, error.message);

    // throw new Error(error);
  }
}

module.exports = {
  buildSearchResponse: buildSearchResponse,
  tagAuthor: tagAuthor,
  logErrors: logErrors,
  errorHandler: errorHandler,
  getObservableItem: getObservableItem,
  getItemResponse: getItemResponse,
  handleResponse: handleResponse
};

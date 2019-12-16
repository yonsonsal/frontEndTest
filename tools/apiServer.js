const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { from, of, forkJoin } = require("rxjs");
const { map, flatMap, mergeMap, toArray } = require("rxjs/operators");
const { sortArraybyId } = require("./utils/apiServerUtils");
const {
  buildSearchResponse,
  tagAuthor,
  logErrors,
  errorHandler
} = require("./utils/responseUtils");
const { mlEndpointNames, callMLAPI } = require("./utils/proxyMLUtils");

const app = express();
app.use(cors());
app.use(logErrors);
app.use(errorHandler);

var port = process.env.PORT || 3001;

const itemsRouter = express.Router();

const searchURL = "https://api.mercadolibre.com/sites/MLA/search?";
const itemURL = "https://api.mercadolibre.com/items";

/**
 *
 * @param { filters array from JSON query} filters
 * returns String array with name of the category of the filter
 */

const flatCategories = filters => {
  const pluckedCategoryArray = filters
    .filter(_filter => _filter.id == "category")[0]
    .values[0].path_from_root.map(path => path.name);
  return pluckedCategoryArray;
};

itemsRouter.get("/items", (req, res) => {
  const { query } = req;
  const queryStr = "q=" + query.q;
  const _searchURL = searchURL + queryStr;

  const _requestMLAPI$ = from(fetch(_searchURL)).pipe(
    flatMap(response => response.json())
  );

  const requestMLAPI$ = from(
    callMLAPI(mlEndpointNames.searchItemsApi, query.q)
  );

  const fetchResults2$ = requestMLAPI$.pipe(
    flatMap(x => buildSearchResponse(x))
  );

  fetchResults2$.pipe(map(res => tagAuthor(res))).subscribe(x => res.json(x));
});
app.use("/api", itemsRouter);
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(port, () => {
  console.log("Listening  server in port" + port);
});

const transformItemsArray = itemArray => {
  const itemObservableArray = from(itemArray);

  return itemObservableArray.pipe(
    mergeMap(item =>
      from(fetch(`${itemURL}/${item.id}`).then(response => response.json()))
    ),
    map(_item => {
      return mapItem(_item);
    }),
    toArray()
  );
};

const mapItem = item => {
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

function buildCurrencyfromPrice(price) {
  const _amount = Math.floor(price / 1000);
  const _decimal = price % 1000;
  const amount = _amount == 0 ? _decimal : _amount;
  const decimals = _decimal == price ? 0 : _decimal;

  return { amount: amount, decimals: decimals };
  // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

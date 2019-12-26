const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { from, of, forkJoin } = require("rxjs");
const { map, flatMap, mergeMap, toArray } = require("rxjs/operators");
const { handleError, ErrorHandler } = require("./utils/error-handler");

const {
  buildSearchResponse,
  getItemResponse,
  tagAuthor,
  logErrors,
  errorHandler
} = require("./utils/responseUtils");
const { mlEndpointNames, callMLAPI } = require("./utils/proxyMLUtils");

const app = express();
app.use(cors());
//app.use(logErrors);
//app.use(errorHandler);

//Error managment
app.use((err, req, res, next) => {
  handleError(err, res);
});

var port = process.env.PORT || 3001;

const itemsRouter = express.Router();

const searchURL = "https://api.mercadolibre.com/sites/MLA/search?";
const itemURL = "https://api.mercadolibre.com/items";

itemsRouter.get("/items", (req, res) => {
  const { query } = req;
  const queryStr = "q=" + query.q;
  const _searchURL = searchURL + queryStr;

  const requestMLAPI$ = from(
    callMLAPI(mlEndpointNames.searchItemsApi, query.q)
  );

  const fetchResults2$ = requestMLAPI$.pipe(
    flatMap(x => buildSearchResponse(x))
  );

  fetchResults2$.pipe(map(res => tagAuthor(res))).subscribe(x => res.json(x));
});

itemsRouter.get("/items/:id", (req, res) => {
  const id = req.params.id;
  getItemResponse(id)
    .pipe(map(res => tagAuthor(res)))
    .subscribe(
      x => res.json(x),
      err => {
        console.err("Internal server error ", err);
        throw new ErrorHandler(500, "HTTP Error " + err);
      } // throwconsole.log("HTTP Error", err)
    );
});
app.use("/api", itemsRouter);
//TODO Welcome api page
app.get("/", (req, res) => {
  res.send("Welcome to my ML-API");
});

app.listen(port, () => {
  console.log("Listening  server in port" + port);
});

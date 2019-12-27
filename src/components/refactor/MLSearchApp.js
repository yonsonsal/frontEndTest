import React from "react";
import SearchResultRoute from "./SearchResultRoute";
import { Route, Switch } from "react-router-dom";
import ItemDetailRoute from "./ItemDetailRoute";
import SearchBoxHeader from "./SearchBoxHeader";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MLSearchApp() {
  return (
    <div className="main-div">
      <SearchBoxHeader />
      <div className="container">
        <Switch>
          <Route exact path="/items/" component={SearchResultRoute} />
          <Route path="/items/:id" component={ItemDetailRoute} />
        </Switch>
      </div>
    </div>
  );
}

export default MLSearchApp;

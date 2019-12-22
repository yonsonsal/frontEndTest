import React from "react";
import HomePage from "./HomePage";
import SearchResult from "./SearchResult";
import Header from "./common/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import SearchBox from "./SearchBox";
import SearchBoxHeader from "./SearchBoxHeader";

function MLSearchApp() {
  return (
    <div className="container">
      <SearchBoxHeader />
      <div>
        {" "}
        Content
        <Switch>
          <Route exact path="/items/" component={SearchResult} />
          <Route path="/items/:id" component={ItemDetail} />
        </Switch>
      </div>
    </div>
  );
}

export default MLSearchApp;

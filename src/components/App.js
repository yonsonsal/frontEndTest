import React from "react";
import HomePage from "./HomePage";
import SearchResult from "./SearchResult";
import Header from "./common/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import SearchBox from "./SearchBox";

function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/" exact component={SearchBox} />
        <Route path="/items/" exact component={SearchResult} />
        <Route path="/items/:id" component={ItemDetail} />
      </Switch>
    </div>
  );
}

export default App;

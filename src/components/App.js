import React from "react";
import HomePage from "./HomePage";
import SearchResult from "./SearchResult";
import Header from "./common/Header";
import { Route, Switch } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import SearchBox from "./SearchBox";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={SearchBox} />
        <Route path="/items/" exact component={SearchBox} />
        <Route path="/items/:id" exact component={SearchBox} />
      </Switch>
    </div>
  );
}

export default App;

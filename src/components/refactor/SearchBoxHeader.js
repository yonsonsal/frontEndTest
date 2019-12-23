import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Search from "./Search";
import BreadCum from "./BreadCum";
import SearchResultRoute from "./SearchResultRoute";
import { from } from "rxjs";
import { take, map, toArray, mergeMap, flatMap } from "rxjs/operators";
import queryString from "query-string";
import Logo_ML from "../../assets/Logo_ML.png"; // with import

const SearchBoxHeader = props => {
  // _searchQ.search && _searchQ.search.length > 0 ? _searchQ.search : ""

  const searchMethod = searchValue => {
    /*
    setLoading(true);
    setErrorMessage(null);
    searchItemsByText(searchValue).then(jsonResponse => {
      setItems(jsonResponse.items.slice(0, 4));
      setCategories(jsonResponse.categories);
      setLoading(false); 
    });*/
    props.history.push("/items?search=" + searchValue);
  };

  return (
    <div className="App">
      <div className="yellow-header">
        <div className="container">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-1">
              <Link to="/">
                <img src={Logo_ML} />
              </Link>
            </div>
            <div className="col-9">
              <Search search={searchMethod} />
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SearchBoxHeader);

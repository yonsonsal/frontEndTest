import React, { useState, useEffect } from "react";
import Item from "./Item";
import { getItem, searchItemsByText } from "../api/itemApi";
import Search from "./Search";
import SearchResult from "./SearchResult";
import { from } from "rxjs";
import { take, map, toArray, mergeMap, flatMap } from "rxjs/operators";
import queryString from "query-string";
import Logo_ML from "../assets/Logo_ML.png"; // with import

const SearchBox = props => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const {
    location: { search }
  } = props;
  const _searchQ = queryString.parse(search);

  const [initialSearchValue, setInitialSearchValue] = useState(
    _searchQ.search && _searchQ.search.length > 0 ? _searchQ.search : ""
  );

  useEffect(() => {
    if (_searchQ.search && _searchQ.search.length > 0) {
      setInitialSearchValue(_searchQ.search);
      searchMethod(_searchQ.search);
    }

    setLoading(false);
  }, [props.location.search]);

  const searchMethod = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    searchItemsByText(searchValue).then(jsonResponse => {
      setItems(jsonResponse.items.slice(0, 4));
      setCategories(jsonResponse.categories);
      setLoading(false);
    });
  };

  function debug(args) {
    debugger;
    return true;
  }
  return (
    <div className="App">
      <div className="yellow-header">
        <div className="container">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-1">
              <img src={Logo_ML} />
            </div>
            <div className="col-9">
              <Search
                search={searchMethod}
                initialSearchValue={initialSearchValue}
              />
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            {loading && !errorMessage ? (
              <span>loading...</span>
            ) : errorMessage ? (
              <div className="errorMessage">{errorMessage}</div>
            ) : (
              <SearchResult
                items={items}
                categories={categories}
              ></SearchResult>
            )}
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

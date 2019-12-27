import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Search from "./Search";
import queryString from "query-string";
import Logo_ML from "../assets/Logo_ML.png"; // with import

const SearchBoxHeader = props => {
  const [initialValue, setInitialValue] = useState("");
  // _searchQ.search && _searchQ.search.length > 0 ? _searchQ.search : ""

  const getInitialSearchValue = () => {
    const _searchQ =
      props.location && props.location.search
        ? queryString.parse(props.location.search)
        : { search: "" };
    return _searchQ.search;
  };
  useEffect(() => {
    const _searchQ =
      props.location && props.location.search
        ? queryString.parse(props.location.search)
        : { search: "" };
    setInitialValue(_searchQ.search);
    console.log("initialSearchValue =>", _searchQ.search);
  }, [props.location]);

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
        <div className="main container">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-1">
              <Link to="/">
                <img src={Logo_ML} />
              </Link>
            </div>
            <div className="col-9">
              <Search
                initialSearchValue={getInitialSearchValue()}
                search={searchMethod}
              />
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SearchBoxHeader);

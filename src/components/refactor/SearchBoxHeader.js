import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import Item from "../Item";
import { getItem, searchItemsByText } from "../../api/itemApi";
import Search from "./Search";
import BreadCum from "./BreadCum";
import SearchResultRoute from "./SearchResultRoute";
import { from } from "rxjs";
import { take, map, toArray, mergeMap, flatMap } from "rxjs/operators";
import queryString from "query-string";
import Logo_ML from "../../assets/Logo_ML.png"; // with import

const SearchBoxHeader = props => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  /* const {
    location: { search }
  } = props;
  const _searchQ = queryString.parse(search);*/

  const [initialSearchValue, setInitialSearchValue] = useState();
  // _searchQ.search && _searchQ.search.length > 0 ? _searchQ.search : ""

  useEffect(() => {
    /*  if (_searchQ.search && _searchQ.search.length > 0) {
      setInitialSearchValue(_searchQ.search);
      searchMethod(_searchQ.search);
    }
*/
    setLoading(false);
  }, [props.location]);

  const searchMethod = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    searchItemsByText(searchValue).then(jsonResponse => {
      setItems(jsonResponse.items.slice(0, 4));
      setCategories(jsonResponse.categories);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <div className="yellow-header">
        <div className="main">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-1">
              <img src={Logo_ML} />
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

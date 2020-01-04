import React, { useState, useEffect } from "react";
import { searchItemsByText } from "../api/itemApi";
import { withRouter } from "react-router";
import queryString from "query-string";
import ItemResult from "./ItemResult";
import BreadCum from "./BreadCum";
import Loading from "./Loading";

const SearchResultRoute = props => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const {
    location: { search }
  } = props;
  const _searchQ = queryString.parse(search);
  useEffect(() => {
    console.log("SearchResult props =", props);
    if (_searchQ.search && _searchQ.search.length > 0) {
      //TODO set te initial value of the input of SearchBoxHeader component
      //setInitialSearchValue(_searchQ.search);
      searchMethod(_searchQ.search);
    }
  }, [props, _searchQ.search]);

  /**
   * Search Method
   * @param {inputQuery} searchValue
   */
  const searchMethod = searchValue => {
    setLoading(true);
    //setErrorMessage(null);
    searchItemsByText(searchValue).then(jsonResponse => {
      setItems(jsonResponse.items.slice(0, 4));
      setCategories(jsonResponse.categories);
      setLoading(false);
    });
  };

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <section id="results-section" className="content-result mx-md-5">
          <BreadCum categories={categories}></BreadCum>
          <ol id="searchResults" className="section search-results list-view">
            {items &&
              items.map((item, index) => (
                <React.Fragment key={index}>
                  <li className="results-item">
                    <ItemResult item={item} key={`item-${index}`}></ItemResult>
                  </li>
                  <div className="line"></div>
                </React.Fragment>
              ))}
          </ol>
        </section>
      )}
    </>
  );
};

export default withRouter(SearchResultRoute);

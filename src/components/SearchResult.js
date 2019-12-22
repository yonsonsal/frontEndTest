import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import ItemResult from "./ItemResult";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import "../Search.css";
import BreadCum from "./BreadCum";

const SearchResult = props => {
  const { location, items, categories } = props;
  useEffect(() => {
    console.log("SearchResult props =", props);
    if (!items && location.search.length > 0) {
    }
  }, []);

  return (
    <section id="results-section" className="results">
      <BreadCum categories={categories}></BreadCum>
      <ol id="searchResults" className="section search-results list-view">
        {items &&
          items.map(item => (
            <>
              <li className="results-item" key={item.id}>
                <ItemResult item={item}></ItemResult>
              </li>
              <div className="line"></div>
            </>
          ))}
      </ol>
    </section>
  );
};

export default SearchResult;

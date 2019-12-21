import React, { useState, useEffect } from "react";

import ItemResult from "./ItemResult";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import "../Search.css";

const SearchResult = ({ location, items, categories }) => {
  useEffect(() => {
    console.log("SearchResult location =", location);
    if (!items && location.search.length > 0) {
    }
  }, []);

  return (
    <section id="results-section" className="results">
      <div className="container breadCum category">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {categories &&
              categories.map((category, index) => (
                <li
                  className={
                    index == category.length - 1
                      ? "breadcrumb-item active "
                      : "breadcrumb-item"
                  }
                  key={index}
                >
                  {category}
                </li>
              ))}
          </ol>
        </nav>
      </div>
      <ol id="searchResults" className="section search-results list-view">
        {items &&
          items.map(item => (
            <>
              <li className="results-item" key={item.id}>
                <ItemResult item={item} key={item.id}></ItemResult>
              </li>
              <div className="line"></div>
            </>
          ))}
      </ol>
    </section>
  );
};

export default SearchResult;

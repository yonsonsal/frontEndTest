import React from "react";
import ItemResult from "./ItemResult";
import "../App.css";
import "../Search.css";

const SearchResult = ({ items, categories }) => {
  return (
    <section id="results-section" className="results">
      <div className="container breadCum category">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {categories.map((category, index) => (
              <li className="breadcrumb-item active" aria-current="page">
                {category}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <ol id="searchResults" className="section search-results list-view">
        {items.map(item => (
          <li className="results-item ">
            <ItemResult item={item}></ItemResult>
          </li>
        ))}
        ;
      </ol>
    </section>
  );
};

export default SearchResult;

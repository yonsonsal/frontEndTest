import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import Search_icon from "../assets/ic_Search.png";

const Search = props => {
  const [searchValue, setSearchValue] = useState(
    props.initialSearchValue ? props.initialSearchValue : ""
  );

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      <div className="input-group search-input">
        <input
          type="text"
          className="form-control"
          placeholder="Nunca dejes de buscar"
          value={searchValue}
          onChange={handleSearchInputChanges}
        />
        <div className="input-group-append">
          <button
            className="input-group-text"
            type="submit"
            onClick={callSearchFunction}
          >
            <img src={Search_icon} />
          </button>
        </div>
      </div>
    </form>

    /*
    <div className="container">
      <form className="search">
        <div className="input-group p-5">
          <input
            type="text"
            className="form-control"
            placeholder="Nunca dejes de buscar"
            value={searchValue}
            onChange={handleSearchInputChanges}
          />
          <div className="input-group-append">
            <button
              className="btn btn-secondary"
              onClick={callSearchFunction}
              type="submit"
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
    */
  );
};

export default Search;

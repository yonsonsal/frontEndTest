import React, { useState, useEffect } from "react";
import "../App.css";
import Item from "./Item";
import { getItem, searchItemsByText } from "../api/itemApi";
import Search from "./Search";
import { from } from "rxjs";
import { take, map, toArray, mergeMap, flatMap } from "rxjs/operators";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=f9f0b07e"; // you should replace this with yours

const SearchBox = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const searchPromise = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    searchItemsByText(searchValue).then(jsonResponse => {
      setItems(jsonResponse.items.slice(0, 4));
      setCategories(jsonResponse.categories);
      setLoading(false);
    });
    /* fetch(`http://localhost:3001/api/items?q==${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
        setItems(jsonResponse.slice(0, 4));
        setLoading(false);
      });*/
  };

  const search$ = searchValue => {
    const url = `http://localhost:3001/api/items?q=${searchValue}`;
    setLoading(true);
    setErrorMessage(null);

    //observable from promise first 4 items
    const fetch$ = from(fetch(url)).pipe(mergeMap(response => response.json()));

    fetch$.pipe(take(4)).subscribe(_items => {
      console.log("ITEMS =", _items);
      setItems(_items);
      setLoading(false);
    });

    // (jsonResponse => {
    //   setItems(jsonResponse);
    //   setLoading(false);
    // });
  };

  function debug(args) {
    debugger;
    return true;
  }
  return (
    <div className="App">
      <Search search={searchPromise} />
      <div className="items">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          items.map((item, index) => (
            <Item key={`${index}-${item.title}`} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBox;

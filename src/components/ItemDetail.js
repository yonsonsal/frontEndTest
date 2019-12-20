import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import "../Search.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { getItem } from "../api/itemApi";

const ItemDetail = props => {
  const [item, setItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    const id = props.match.params.id; // from the path `/items/:id`
    async function loadItem(_id) {
      if (_id) {
        await getItem(_id).then(_item => setItem(_item));
        setIsLoaded(true);
      }
    }
    loadItem(id);
  }, [props.match.params.id]);

  return (
    <> </> &&
    isLoaded && (
      <div className="row">
        <div className="col-7">
          <div className="image-detail">
            <img width="680px" alt={item.title} src={item.picture} />
          </div>

          <div className="col-3">
            <div className="container item-detail-info-container">
              <div className="price-container">
                <div className="item-price">
                  <span className="price-symbol">$</span>
                  <span className="price-fraction">
                    {item.price.amount}.{item.price.decimals}
                  </span>
                </div>
              </div>
              <h2 className="item-title">
                <span className="main-title">{item.title}</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="col-4">col-4</div>
        <div></div>
        <p>({item.title})</p>
      </div>
    )
  );
};

export default ItemDetail;

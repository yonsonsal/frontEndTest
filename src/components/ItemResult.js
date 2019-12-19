import React from "react";
import { Link } from "react-router-dom";

const ItemResult = ({ item }) => {
  return (
    <div className="row-item item" id={item.id}>
      <div className="item-image">
        <div className="image-content">
          <Link to={"/items/" + item.id}>
            <img width="180" height="180" alt={item.title} src={item.picture} />
          </Link>
        </div>
      </div>

      <div className="item-info-container">
        <div className="price-container">
          <div className="item-price">
            <span className="price-symbol">$</span>
            <span className="price-fraction">
              {item.price.amount}.{item.price.decimals}
            </span>
            {item.free_shipping ? (
              <span className="item-free-shipping-container">
                {" "}
                <img className="item-free-shipping-image"></img>
              </span>
            ) : (
              <span className="item-shipping"></span>
            )}
          </div>
        </div>
        <h2 className="item-title">
          <Link to={"/items/" + item.id}>
            <span className="main-title">{item.title}</span>
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default ItemResult;

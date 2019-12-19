import "../App.css";
import "../Search.css";
import React, { useState, useEffect } from "react";
import { getItem } from "../api/itemApi";

const ItemDetail = props => {
  const [item, setItem] = useState({});

  useEffect(() => {
    const id = props.match.params.id; // from the path `/courses/:slug`
    if (id) {
      getItem(id).then(_item => setItem(_item));
    }
  }, []);

  const picture = item.picture;
  return (
    <div className="row">
      <div className="col-7">
        <div className="image-detail">
          <img width="680px" alt={`Item: ${item.title}`} src={picture} />
        </div>

        <div className="col-3">
          <div className="container item-detail-info-container">
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
      </div>
      <div class="col-4">col-4</div>
      <h2>$ {item.price}</h2>
      <div></div>
      <p>({item.title})</p>
    </div>
  );
};

export default ItemDetail;

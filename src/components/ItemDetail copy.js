import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import "../Search.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import BreadCum from "./BreadCum";
import { getItem } from "../api/itemApi";
import "bootstrap/dist/css/bootstrap.css";

const ItemDetail = props => {
  const [item, setItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    const id = props.itemId; //props.match && props.match.params.id ?props.match.params.id:; // from the path `/items/:id`
    async function loadItem(_id) {
      if (_id) {
        await getItem(_id).then(_item => setItem(_item));
        setIsLoaded(true);
      }
    }
    loadItem(id);
  }, [props.itemId]);

  return (
    /**<div>ITEMDETAIL {isLoaded && item.title}</div>*/
    <>
      {item ? <BreadCum categories={item.categories}></BreadCum> : <></>}
      {item && (
        <>
          <div className="item-detail-background">
            <div className="row row-item-detail" id={item.id}>
              <div className="col-1 "></div>
              <div className="col-7">
                <div
                  className="item-picture-detail"
                  style={{ backgroundImage: "url(" + item.picture + ")" }}
                ></div>
              </div>
              <div className="col-4">
                <div className="item-detail-info">
                  <div className="item-detail-sold-info">
                    {item.condition} - {item.sold_quantity} vendidos
                  </div>
                  <div className="item-detail-title">{item.title}</div>
                  <div className="item-price-detail">
                    <span className="price-symbol">$</span>
                    <span className="price-fraction">
                      {item.price.amount}.{item.price.decimals}
                    </span>
                  </div>
                </div>
                <div className="item-detail-buy btn btn-primary">Comprar</div>
              </div>
            </div>

            <div className="row item-detail-footer-description-label">
              <div className="col-1"></div>
              <div className="col-4 footer-item-detail-description-label">
                Descripción del producto
              </div>
              <div className="col-7"></div>
            </div>
            <div className="row row-item-detail-footer-description">
              <div className="col-1"></div>
              <div className="col-7 footer-item-detail-description">
                {item.description}
              </div>
              <div className="col-4"></div>
            </div>
          </div>
        </>
      )}
      <div></div>
    </>

    /*isLoaded && <BreadCum categories={item.categories}></BreadCum> && <></> && (
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
    )*/
  );
};

export default ItemDetail;

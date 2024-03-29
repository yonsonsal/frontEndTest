import React, { useState, useLayoutEffect } from "react";
import BreadCum from "./BreadCum";
import ErrorMessageDiv from "./ErrorMessage";
import { getItem } from "../api/itemApi";

import Loading from "./Loading";

const ItemDetail = props => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useLayoutEffect(() => {
    const id = props.match && props.match.params.id ? props.match.params.id : 0; // from the path `/items/:id`
    async function loadItem(_id) {
      if (_id) {
        try {
          setLoading(true);
          await getItem(_id).then(_item => setItem(_item));
          setLoading(false);
          setErrorMessage(null);
        } catch (e) {
          setLoading(false);
          console.error("typeof e=>", typeof e);
          console.error("useLayoutEffect Error  e=>", e);
          console.error("useLayoutEffect Error  e.message=>", e.message);

          setErrorMessage(JSON.parse(e.message));
        }
      }
    }
    loadItem(id);
  }, [props.itemId]);

  const soldQuantityText = item => {
    const sell_str =
      item.sold_quantity === 0
        ? "Niguno vendido"
        : item.sold_quantity === 1
        ? "1 vendido"
        : item.sold_quantity + " vendidos";
    return sell_str;
  };
  return (
    /**<div>ITEMDETAIL {isLoaded && item.title}</div>*/
    <>
      {loading && !errorMessage ? (
        <Loading></Loading>
      ) : errorMessage ? (
        <ErrorMessageDiv></ErrorMessageDiv>
      ) : (
        <section id="item-detail-section" className="content-result mx-md-5">
          {item ? <BreadCum categories={item.categories}></BreadCum> : <></>}
          {item && (
            <div className="row-item-detail">
              <div className="row" style={{ paddingTop: "16px" }}>
                <div className="col-md-1"></div>
                <div className="col-md-6 col-10 mx-auto">
                  <img
                    className="img-fluid"
                    alt={item.title}
                    src={item.picture}
                  />
                </div>
                <div className="col-md-5 col-10 mx-auto">
                  <div
                    className="d-flex flex-column"
                    style={{ paddingRight: "15px" }}
                  >
                    <div className="item-detail-sold-info pt-3 mb-2">
                      {item.condition} {" - " + soldQuantityText(item)}
                    </div>
                    <div className="item-detail-title">{item.title}</div>
                    <div className="item-price-detail">
                      <span className="price-symbol">$</span>
                      <span className="price-fraction">
                        {item.price.amount}
                        {item.price.decimals > 0
                          ? "." + item.price.decimals
                          : ""}
                      </span>
                    </div>
                    <div className="d-flex">
                      <span className="btn btn-primary btn-buy-item">
                        Comprar
                      </span>
                      <div style={{ width: "32px" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="d-flex flex-column item-detail-description-label-container">
                    <div className="item-detail-description-label">
                      Descripción del producto
                    </div>
                    <div className="item-detail-description">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
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

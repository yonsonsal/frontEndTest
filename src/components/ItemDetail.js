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
    <div className="item">
      <h2>$ {item.price}</h2>
      <div>
        <img width="680px" alt={`Item: ${item.title}`} src={picture} />
      </div>
      <p>({item.title})</p>
    </div>
  );
};

export default ItemDetail;

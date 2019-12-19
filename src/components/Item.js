import React from "react";

const Item = ({ item }) => {
  const picture = item.picture;
  return (
    <div className="item">
      <h2>
        $ {item.price.amount}.{item.price.decimals}
      </h2>
      <div>
        <img width="38px" alt={`Item: ${item.title}`} src={picture} />
      </div>
      <p>({item.title})</p>
    </div>
  );
};

export default Item;

import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const BreadCum = props => {
  return (
    <div className="container breadCum category">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {props.categories &&
            props.categories.map((category, index) => (
              <li
                className={
                  index == category.length - 1
                    ? "breadcrumb-item active "
                    : "breadcrumb-item"
                }
                key={index}
              >
                {category}
              </li>
            ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCum;

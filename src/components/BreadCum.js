import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const BreadCum = props => {
  return (
    <div className="row">
      <div className="col-auto">
        <div className="breadCum category">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {props.categories &&
                props.categories.map((category, index) => (
                  <li
                    className={
                      index === props.categories.length - 1
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
      </div>
      <div className="col-6"></div>
    </div>
  );
};

export default BreadCum;

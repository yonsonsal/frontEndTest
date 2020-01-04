import React from "react";
import { Link } from "react-router-dom";

const ErrorMessageDiv = props => {
  return (
    <div class="vip-error-screen not-found">
      <span class="ch-icon-attention">
        <i class="far fa-exclamation-triangle"></i>
      </span>

      <p class="error-title">Parece que la página no existe</p>
      <Link to="/" className="ch-btn-action">
        {" "}
        Ir a la Página principal
      </Link>
    </div>
  );
};

export default ErrorMessageDiv;

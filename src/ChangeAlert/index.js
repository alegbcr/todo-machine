import React from "react";
import { useStorageListener } from "./useStorageListener";

import "./ChangeAlert.css";

const ChangeAlert = ({ sincronize }) => {
  const { show, toggleShow } = useStorageListener(sincronize);
  if (show) {
    return (
      <div className="container-bg">
        <div className="changeAlert-container">
          <p>
            Parece que haz cambiado tus TODOs en otra pestaña o ventana del
            navegador
          </p>
          <button
            className="changeButtonAlert"
            onClick={() => toggleShow(false)}
          >
            Refrezcar
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export { ChangeAlert };

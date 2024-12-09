import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children, errorMessage }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;

import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

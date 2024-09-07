import React from 'react';

const Modal = ({ isVisible, onClose, onConfirm, message }) => {
    if (!isVisible) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <p>{message}</p>
                <button onClick={onConfirm}>بله</button>
                <button onClick={onClose}>خیر</button>
            </div>
        </div>
    );
};

export default Modal;
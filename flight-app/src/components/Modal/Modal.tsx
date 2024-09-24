import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg relative max-w-lg w-full">
        <button
          onClick={onClose}
          className="font-bold absolute top-4 right-4 text-gray-500 hover:text-red-700"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;

import React from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    imageSrc: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-4xl max-h-screen mx-auto" style={{ width: '95%' }}>
                <div className="flex justify-between items-center mb-4 px-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-4xl">
                        &times;
                    </button>
                </div>
                <hr className='my-2' />
                <div className='md:p-6 p-4'>
                    <img src={imageSrc} alt={title} className="w-full h-auto object-contain" />
                </div>
            </div>
        </div>
    );
};

export default Modal;

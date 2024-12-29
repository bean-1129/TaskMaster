import React from "react";

const FlashCard = ({ message, type, onClose }) => {
    const colors = {
        success: "bg-green-100 text-green-700 border-green-500",
        error: "bg-red-100 text-red-700 border-red-500",
        info: "bg-blue-100 text-blue-700 border-blue-500",
        warning: "bg-yellow-100 text-yellow-700 border-yellow-500",
    };

    return (
        <div
            className={`fixed top-4 right-4 border-l-4 p-4 rounded shadow-lg ${colors[type]}`}
            style={{ zIndex: 1000 }}
        >
            <div className="flex items-center justify-between">
                <p>{message}</p>
                <button
                    onClick={onClose}
                    className="ml-4 text-gray-600 hover:text-gray-900"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default FlashCard;

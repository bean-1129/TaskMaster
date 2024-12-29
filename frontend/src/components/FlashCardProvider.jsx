import React, { createContext, useContext, useState } from "react";
import FlashCard from "./FlashCard";

const FlashCardContext = createContext();

export const useFlashCard = () => useContext(FlashCardContext);

const FlashCardProvider = ({ children }) => {
    const [flashCard, setFlashCard] = useState(null);

    const showFlashCard = (message, type = "info") => {
        setFlashCard({ message, type });
        setTimeout(() => setFlashCard(null), 3000); 
    };

    return (
        <FlashCardContext.Provider value={{ showFlashCard }}>
            {children}
            {flashCard && (
                <FlashCard
                    message={flashCard.message}
                    type={flashCard.type}
                    onClose={() => setFlashCard(null)}
                />
            )}
        </FlashCardContext.Provider>
    );
};

export default FlashCardProvider;

import React from "react";
import FlashCard from "./FlashCard";

interface FlashCard {
  id: string;
  question: string;
  answer: string;
  options: string[];
}
  
  interface FlashCardListProps {
    flashcards: FlashCard[];
  }


const FlashCardList: React.FC<FlashCardListProps> = ({ flashcards }) => {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => {
        return <FlashCard flashcard={flashcard} key={flashcard.id}></FlashCard>;
      })}
    </div>
  );
};

export default FlashCardList;

import React, { useState, useEffect, useRef } from "react";

interface FlashCardProps {
  flashcard: {
    id: number;
    question: string;
    answer: string;
    options: string[];
  };
}

const FlashCard: React.FC<FlashCardProps> = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState(100);
  const frontEl = useRef<HTMLDivElement>(null);
  const backEl = useRef<HTMLDivElement>(null);
  function setMaxHeight() {
    const frontHeight = frontEl.current!.getBoundingClientRect().height;
    const backHeight = backEl.current!.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 150));
  }
  useEffect(setMaxHeight, [
    flashcard.question,
    flashcard.answer,
    flashcard.options,
  ]);
  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => {
      window.removeEventListener("resize", setMaxHeight);
    };
  }, []);
  return (
    <div
      style={{ height }}
      className={`card ${flip && "flip"}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option) => {
            return (
              <div className="flashcard-option" key={option}>
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {flashcard.answer}
      </div>
    </div>
  );
};

export default FlashCard;

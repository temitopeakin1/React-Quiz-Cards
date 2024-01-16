import React, { FormEvent, useEffect, useRef, useState } from "react";
import FlashCardList from "./FlashCardList";
import axios from "axios";

function App() {
  const categoryEl = useRef<HTMLSelectElement>(null);
  const amountEl = useRef<HTMLInputElement>(null);
  const [flashCards, setFlashCards] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res: any) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  function decodeString(str: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current?.value,
          category: categoryEl.current?.value,
        },
      })
      .then((res: any) => {
        setFlashCards(
          res.data.results.map((questionItem: any, index: number) => {
            const answer = questionItem.correct_answer;
            const options = [
              ...questionItem.incorrect_answers.map((a: string) =>
                decodeString(a)
              ),
              answer,
            ].sort(() => Math.random() - 0.5);
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer,
              options,
            };
          })
        );
      });
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="header">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category: { id: number; name: string }) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id={"amount"}
            min={"1"}
            step={"1"}
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Initiate</button>
        </div>
        <div className="form-group">
          <p>*Just for fun, Enjoy*</p>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashcards={flashCards} />
      </div>
    </>
  );
}

export default App;

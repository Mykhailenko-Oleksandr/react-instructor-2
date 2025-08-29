// src/components/App.tsx
import { useState } from "react";
import Product from "../modules-2/Product";
import Book from "../modules-2/Book";
import Button from "../modules-2/Button";
import ClickCounter from "../modules-2/ClickCounter";

interface Values {
  x: number;
  y: number;
}

export default function App() {
  const [clicks, setClicks] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<Values>({ x: 0, y: 0 });

  const handleClickFirst = (event: React.MouseEvent<HTMLButtonElement>) => {
    setClicks(clicks + 1);
    console.log("Clicked!", event);
    console.log("Target:", event.target); // сам <button>
  };

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  const toggleMessage = () => {
    setIsOpen(!isOpen);
  };

  const updateValue = (key: keyof Values) => {
    setValues({
      ...values,
      [key]: values[key] + 1,
    });
  };

  return (
    <>
      <h1>Best selling</h1>
      <Product
        name="Tacos With Lime"
        imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
        price={10.99}
        type="success"
      />
      <Product
        name="Fries and Burger"
        imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
        price={14.29}
      />
      <Book />
      <Button variant="primary" text="Login" />
      <Button variant="secondary" text="Follow" />
      <button onClick={handleClickFirst}>Current: {clicks}</button>
      <button onClick={toggleMessage}>
        {isOpen ? "Hide message" : "Show message"}
      </button>
      <ClickCounter value={clicks} onUpdate={handleClick} />
      <ClickCounter value={clicks} onUpdate={handleClick} />
      {isOpen && <p>🎉 Surprise! You toggled me.</p>}
      <div>
        <p>
          x: {values.x}, y: {values.y}
        </p>
        <button onClick={() => updateValue("x")}>Update x</button>
        <button onClick={() => updateValue("y")}>Update y</button>
      </div>
    </>
  );
}

import { FaBook } from "react-icons/fa";
import css from "./Book.module.css";

interface Book {
  id: string;
  name: string;
}

const books: Book[] = [
  { id: "id-1", name: "JS for beginners" },
  { id: "id-2", name: "React basics" },
  { id: "id-3", name: "React Query overview" },
];

export default function Book() {
  return (
    <>
      <h1>Books of the week</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <FaBook className={css.icon} />
            {book.name}
          </li>
        ))}
      </ul>
    </>
  );
}

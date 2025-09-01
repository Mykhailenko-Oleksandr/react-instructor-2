import { useState } from "react";
import SearchForm from "./SearchForm";
import ArticleList from "./ArticleList";
import { type Article } from "./types/article";
// 1. Імпортуємо HTTP-функцію
import { fetchArticles } from "./services/articleService";
import Timer from "./Timer";
import Modal from "./Modal";

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      // 2. Використовуємо HTTP-функцію
      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
      <hr />
      <Timer />
      <hr />
      <div>
        <h1>Main content of the page</h1>
        <button onClick={openModal}>Open modal</button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <h2>Custom Modal Content</h2>
            <p>This is a reusable modal with dynamic content.</p>
          </Modal>
        )}
      </div>
    </>
  );
}

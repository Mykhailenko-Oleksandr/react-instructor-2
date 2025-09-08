import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchForm from "./SearchForm";
import ArticleList from "./ArticlList";
import { fetchArticles } from "./services/articleService";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";
import OrderForm from "./OrderForm";

export default function App() {
  const [topic, setTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["articles", topic, currentPage],
    queryFn: () => fetchArticles(topic, currentPage),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.nbPages ?? 0;

  const handleSearch = async (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      <p>
        Current page {currentPage} | Total pages {totalPages}
      </p>
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {data && data.hits.length > 0 && <ArticleList items={data.hits} />}
      <hr />
      <hr />
      <hr />
      <SearchForm onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {data && data.hits.length > 0 && <ArticleList items={data.hits} />}
      <hr />
      <hr />
      <hr />
      <OrderForm />
    </>
  );
}

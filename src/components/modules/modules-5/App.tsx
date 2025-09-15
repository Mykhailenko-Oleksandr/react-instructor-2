// 1. Імпортуємо хук useQueryClient
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import SortFilter from "./SortFilter";
import type { SortOption, Todo } from "./types";
import { useDebouncedCallback } from "use-debounce";
import { useWindowWidth } from "./hooks/useWindowWidth";
import { useFetchPosts } from "./hooks/useFetchPosts";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("created");
  const [text, setText] = useState("hello");
  const [searchQuery, setSearchQuery] = useState("");
  const windowWidth = useWindowWidth();

  const { data: posts, isFetching } = useFetchPosts(searchQuery);

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    300
  );

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    1000
  );

  useEffect(() => {
    console.log(`Make HTTP request with: ${text}`);
  }, [text]);

  // 2. Отримуємо посилання на квері-клієнт що створювали у main.tsx
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo: Todo) => {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        newTodo
      );
      return res.data;
    },
    onSuccess: () => {
      // 3. Коли мутація успішно виконується,
      // інвалідовуємо всі запити з ключем "todos"
      // для оновлення списку завдань
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleCreateTodo = () => {
    mutation.mutate({
      title: "My new todo",
      completed: false,
    });
  };

  return (
    <>
      <button onClick={handleCreateTodo}>Create Todo</button>
      {mutation.isPending && <div>Adding todo...</div>}
      {mutation.isError && <div>An error occurred</div>}
      {mutation.isSuccess && <div>Todo added!</div>}
      <br />
      <hr />
      <hr />
      <br />
      <SearchBox value={searchText} onSearch={setSearchText} />
      <p>Searching for: {searchText}</p>
      <SortFilter value={sortBy} onSelect={setSortBy} />
      <p>Sorting by: {sortBy}</p>
      <br />
      <hr />
      <hr />
      <br />
      <input type="text" defaultValue={text} onChange={handleChange} />
      <p>Text value: {text}</p>
      <br />
      <hr />
      <hr />
      <br />
      <input
        type="text"
        defaultValue={searchQuery}
        onChange={updateSearchQuery}
        placeholder="Search posts"
      />
      {isFetching && <div>Loading posts...</div>}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
      <br />
      <hr />
      <hr />
      <br />
      <p>Current window width: {windowWidth}px</p>
    </>
  );
}

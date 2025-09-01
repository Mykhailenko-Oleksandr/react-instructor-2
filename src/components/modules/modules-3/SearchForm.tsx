interface SearchFormProps {
  onSubmit: (topic: string) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const handleSubmit = (formData: FormData) => {
    const topic = formData.get("topic") as string;

    // Якщо текстове поле порожнє, виводимо повідомлення
    // і припиняємо виконання функції.
    if (topic === "") {
      alert("Please enter search topic!");
      return;
    }

    // У протилежному випадку викликаємо пропс
    // і передаємо йому значення поля
    onSubmit(topic);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="topic" />
      <button type="submit">Search</button>
    </form>
  );
}

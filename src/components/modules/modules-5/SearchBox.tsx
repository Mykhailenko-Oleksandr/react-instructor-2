interface SearchBoxProps {
  value: string;
  onSearch: (newValue: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return <input value={value} onChange={handleChange} />;
}

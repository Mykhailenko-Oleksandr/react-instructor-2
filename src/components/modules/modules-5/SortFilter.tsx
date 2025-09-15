import type { SortOption } from "./types";

interface SortFilterProps {
  value: SortOption;
  onSelect: (option: SortOption) => void;
}

export default function SortFilter({ value, onSelect }: SortFilterProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value as SortOption);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="created">Date created</option>
      <option value="updated">Date updated</option>
    </select>
  );
}

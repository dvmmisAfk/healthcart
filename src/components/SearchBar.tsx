import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for courses..."
          className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-lg focus:border-indigo-600 focus:outline-none focus:ring focus:ring-indigo-100"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <button
          type="submit"
          className="absolute right-2.5 top-2 bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
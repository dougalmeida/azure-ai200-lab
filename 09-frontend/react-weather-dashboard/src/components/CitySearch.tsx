import { useState } from 'react';

interface Props {
  onSearch: (city: string) => void;
}

function CitySearch({ onSearch }: Props) {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim()) onSearch(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search city..."
        style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}
      >
        Search
      </button>
    </div>
  );
}

export default CitySearch;
import { useState } from 'react';

interface SearchBarProps {
  size?: 'large' | 'small';
  placeholder?: string;
}

export default function SearchBar({
  size = 'small',
  placeholder = 'Cari artikel bantuan...',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const isLarge = size === 'large';

  return (
    <form onSubmit={handleSubmit} className={isLarge ? 'w-full max-w-2xl' : 'w-full'}>
      <div className="relative">
        {/* Search icon */}
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none ${isLarge ? 'left-5' : 'left-3'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width={isLarge ? 22 : 16} height={isLarge ? 22 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all
            ${isLarge
              ? 'pl-14 pr-6 py-4 text-lg rounded-2xl'
              : 'pl-10 pr-4 py-2.5 text-sm'
            }`}
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors ${isLarge ? 'right-5' : 'right-3'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={isLarge ? 20 : 14} height={isLarge ? 20 : 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}

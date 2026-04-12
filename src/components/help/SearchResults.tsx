import { useState, useEffect } from 'react';

interface ArticleSummary {
  title: string;
  description: string;
  slug: string;
  module: string;
  subcategory: string;
  tags: string[];
  updatedAt: string;
}

interface ModuleInfo {
  id: string;
  title: string;
  color: string;
}

interface SearchResultsProps {
  articles: ArticleSummary[];
  modules: ModuleInfo[];
}

export default function SearchResults({ articles, modules }: SearchResultsProps) {
  const [results, setResults] = useState<ArticleSummary[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setQuery(q);

    if (q) {
      const lower = q.toLowerCase();
      const filtered = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(lower) ||
          a.description.toLowerCase().includes(lower) ||
          a.tags?.some((t) => t.toLowerCase().includes(lower)) ||
          a.module.toLowerCase().includes(lower) ||
          a.subcategory.toLowerCase().includes(lower)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [articles]);

  const getModule = (id: string) => modules.find((m) => m.id === id);

  if (!query) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">Masukkan kata kunci untuk mencari artikel.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">?</div>
        <h3 className="text-lg font-semibold mb-2">Tidak ada hasil untuk "{query}"</h3>
        <p className="text-muted-foreground">
          Coba gunakan kata kunci lain atau jelajahi modul di halaman utama.
        </p>
        <a
          href="/"
          className="inline-block mt-4 text-sm font-medium text-brand hover:underline"
        >
          Kembali ke halaman utama
        </a>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        Ditemukan {results.length} hasil untuk "{query}"
      </p>
      <div className="space-y-3">
        {results.map((article) => {
          const mod = getModule(article.module);
          return (
            <a
              key={`${article.module}-${article.subcategory}-${article.slug}`}
              href={`/${article.module}/${article.subcategory}/${article.slug}`}
              className="block p-4 border border-border rounded-xl hover:border-brand/30 hover:bg-secondary/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: mod?.color || '#666' }}
                >
                  {mod?.title || article.module}
                </span>
                <span className="text-xs text-muted-foreground">
                  {article.subcategory}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{article.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {article.description}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

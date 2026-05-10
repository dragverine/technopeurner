import modulesData from '@/data/help-center/modules.json';

// ==================== Types ====================

export interface SubCategory {
  id: string;
  title: string;
  description: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  color: string;
  subcategories: SubCategory[];
}

export interface ArticleImage {
  src: string;
  alt: string;
}

export interface ArticleContentBlock {
  type: 'text' | 'step' | 'info' | 'warning' | 'image' | 'heading' | 'card' | 'collapsible' | 'timeline';
  title?: string;
  body?: string;
  level?: number; // for heading (1-4)
  stepNumber?: number;
  image?: ArticleImage;
  src?: string;
  alt?: string;
  caption?: string;
  items?: Array<{
    title?: string;
    body?: string;
    image?: ArticleImage;
  }>; // for card grid, collapsible items, timeline items
  icon?: string; // emoji or icon identifier
}

export interface Article {
  title: string;
  description: string;
  slug: string;
  module: string;
  subcategory: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  content: ArticleContentBlock[];
  relatedArticles?: string[];
}

export interface ArticleSummary {
  title: string;
  description: string;
  slug: string;
  module: string;
  subcategory: string;
  tags: string[];
  updatedAt: string;
}

// ==================== Module Functions ====================

export function getModules(): Module[] {
  return modulesData.modules as Module[];
}

export function getModule(id: string): Module | undefined {
  return getModules().find(m => m.id === id);
}

export function getSubcategory(moduleId: string, subcategoryId: string): SubCategory | undefined {
  const mod = getModule(moduleId);
  return mod?.subcategories.find(s => s.id === subcategoryId);
}

// ==================== Article Functions ====================

const articleFiles = import.meta.glob<Article>(
  '/src/data/help-center/articles/**/*.json',
  { eager: true, import: 'default' }
);

function loadAllArticles(): Article[] {
  return Object.entries(articleFiles).map(([path, data]) => {
    const parts = path
      .replace('/src/data/help-center/articles/', '')
      .replace('.json', '')
      .split('/');
    const [moduleId, subcategoryId, slug] = parts;
    return {
      ...data,
      module: data.module || moduleId,
      subcategory: data.subcategory || subcategoryId,
      slug: data.slug || slug,
    };
  });
}

export function getAllArticles(): Article[] {
  return loadAllArticles();
}

export function getArticlesByModule(moduleId: string): Article[] {
  return loadAllArticles().filter(a => a.module === moduleId);
}

export function getArticlesBySubcategory(moduleId: string, subcategoryId: string): Article[] {
  return loadAllArticles().filter(
    a => a.module === moduleId && a.subcategory === subcategoryId
  );
}

export function getArticle(moduleId: string, subcategoryId: string, slug: string): Article | undefined {
  return loadAllArticles().find(
    a => a.module === moduleId && a.subcategory === subcategoryId && a.slug === slug
  );
}

export function getArticleCount(moduleId: string): number {
  return getArticlesByModule(moduleId).length;
}

export function getSubcategoryArticleCount(moduleId: string, subcategoryId: string): number {
  return getArticlesBySubcategory(moduleId, subcategoryId).length;
}

export function getAllArticleSummaries(): ArticleSummary[] {
  return loadAllArticles().map(a => ({
    title: a.title,
    description: a.description,
    slug: a.slug,
    module: a.module,
    subcategory: a.subcategory,
    tags: a.tags || [],
    updatedAt: a.updatedAt || a.createdAt || '',
  }));
}

// ==================== Module Icons (SVG) ====================

export const moduleIcons: Record<string, string> = {
  erp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
  crm: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  pos: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  hr: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  finance: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  ai: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>'
};

export function getModuleIcon(moduleId: string): string {
  return moduleIcons[moduleId] || '';
}

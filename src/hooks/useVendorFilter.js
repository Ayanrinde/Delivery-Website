import { useState, useMemo } from 'react';
import { VENDORS } from '@/data';

/**
 * Handles search + category filtering of the vendor list.
 * @returns {{ filtered, search, setSearch, category, setCategory, isLoading }}
 */
export function useVendorFilter() {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return VENDORS.filter((v) => {
      const matchCat    = category === 'All' || v.category === category;
      const matchSearch = !q ||
        v.name.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return { filtered, search, setSearch, category, setCategory };
}

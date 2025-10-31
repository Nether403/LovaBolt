import { useState, useMemo, useCallback } from 'react';

/**
 * Hook for managing search and filter state with memoized filtering logic
 *
 * @template T - The type of items being filtered
 * @param items - Array of items to filter
 * @param searchFields - Array of field names to search within
 * @param getItemTags - Optional function to extract tags from an item
 * @returns Object containing filter state and filtered results
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSearchFilter<T extends Record<string, any>>(
  items: T[],
  searchFields: (keyof T)[],
  getItemTags?: (item: T) => string[]
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  /**
   * Filter items based on search query and selected tags
   * Memoized for performance with large datasets
   */
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        return searchFields.some((field) => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          return false;
        });
      });
    }

    // Apply tag filter
    if (selectedTags.length > 0 && getItemTags) {
      filtered = filtered.filter((item) => {
        const itemTags = getItemTags(item);
        return selectedTags.some((selectedTag) =>
          itemTags.some((itemTag) => itemTag.toLowerCase().includes(selectedTag.toLowerCase()))
        );
      });
    }

    return filtered;
  }, [items, searchQuery, selectedTags, searchFields, getItemTags]);

  /**
   * Toggle a tag in the selected tags array
   */
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  /**
   * Clear all filters (search query and tags)
   */
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
  }, []);

  /**
   * Clear only the search query
   */
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  /**
   * Clear only the selected tags
   */
  const clearTags = useCallback(() => {
    setSelectedTags([]);
  }, []);

  return {
    // State
    searchQuery,
    selectedTags,

    // Setters
    setSearchQuery,
    setSelectedTags,
    toggleTag,

    // Clear functions
    clearFilters,
    clearSearch,
    clearTags,

    // Results
    filteredItems,
    resultCount: filteredItems.length,

    // Status
    isFiltering: searchQuery.trim() !== '' || selectedTags.length > 0,
  };
}

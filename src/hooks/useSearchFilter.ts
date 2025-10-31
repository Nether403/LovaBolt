import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook for managing search and filter state with memoized filtering logic
 *
 * Provides a complete search and filter solution with:
 * - Text-based search across multiple fields
 * - Tag-based filtering with multi-select support
 * - Memoized filtering for optimal performance with large datasets
 * - Utility functions for clearing filters
 *
 * @template T - The type of items being filtered (must be an object with string keys)
 * @param items - Array of items to filter
 * @param searchFields - Array of field names to search within (must be keys of T)
 * @param getItemTags - Optional function to extract tags from an item for tag filtering
 *
 * @returns Object containing:
 *   - searchQuery: Current search query string
 *   - selectedTags: Array of currently selected tag filters
 *   - setSearchQuery: Function to update search query
 *   - setSelectedTags: Function to update selected tags
 *   - toggleTag: Function to toggle a single tag on/off
 *   - clearFilters: Function to clear all filters
 *   - clearSearch: Function to clear only search query
 *   - clearTags: Function to clear only selected tags
 *   - filteredItems: Array of items matching current filters
 *   - resultCount: Number of items matching current filters
 *   - isFiltering: Boolean indicating if any filters are active
 *
 * @example
 * ```tsx
 * const {
 *   searchQuery,
 *   setSearchQuery,
 *   selectedTags,
 *   toggleTag,
 *   filteredItems,
 *   resultCount
 * } = useSearchFilter(
 *   backgroundOptions,
 *   ['title', 'description'],
 *   (item) => item.tags
 * );
 *
 * return (
 *   <div>
 *     <input
 *       value={searchQuery}
 *       onChange={(e) => setSearchQuery(e.target.value)}
 *       placeholder="Search..."
 *     />
 *     <p>{resultCount} results</p>
 *     {filteredItems.map(item => <Card key={item.id} {...item} />)}
 *   </div>
 * );
 * ```
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
   * Filters items based on search query and selected tags
   *
   * Applies both text search and tag filtering with AND logic:
   * - Items must match the search query (if present)
   * - Items must have at least one of the selected tags (if any tags selected)
   *
   * Memoized for optimal performance with large datasets (e.g., 93 React-Bits components).
   * Only recalculates when items, search query, or selected tags change.
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
   * Toggles a tag in the selected tags array
   *
   * If the tag is currently selected, it will be removed.
   * If the tag is not selected, it will be added.
   *
   * @param tag - The tag string to toggle
   */
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  /**
   * Clears all active filters
   *
   * Resets both search query and selected tags to their initial empty states,
   * effectively showing all items again.
   */
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
  }, []);

  /**
   * Clears only the search query
   *
   * Resets the search query to an empty string while preserving selected tags.
   */
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  /**
   * Clears only the selected tags
   *
   * Resets selected tags to an empty array while preserving the search query.
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

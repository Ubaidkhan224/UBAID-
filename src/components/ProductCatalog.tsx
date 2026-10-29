import React, { useMemo } from 'react';
import { Search, SlidersHorizontal, Settings2, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/products';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    setIsEditorOpen,
  } = useShop();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.spec.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort order
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.pricePKR - b.pricePKR);
        break;
      case 'price-desc':
        result.sort((a, b) => b.pricePKR - a.pricePKR);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <section id="products-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls Bar: Category Title, Search Input, and Sorters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-700">
                Official Equipment Inventory
              </span>
              <span className="text-zinc-300">·</span>
              <span className="text-xs text-zinc-500 font-mono font-medium">
                {filteredProducts.length} items shown
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 font-heading tracking-tight mt-1">
              {activeCategoryObj.name}
            </h2>
          </div>

          {/* Filter, Search & Sort Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bats, gloves, kits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-lime-500 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-zinc-800 focus:outline-none cursor-pointer font-medium"
              >
                <option value="featured">Featured Sort</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Product Name</option>
              </select>
            </div>

            {/* In-app price and catalog editor trigger */}
            <button
              onClick={() => setIsEditorOpen(true)}
              className="px-3.5 py-2 text-xs font-bold text-lime-900 hover:text-zinc-950 bg-lime-100 hover:bg-lime-200 border border-lime-300 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Edit sample product names & PKR prices"
            >
              <Settings2 className="w-3.5 h-3.5 text-lime-700" />
              <span className="hidden sm:inline">Edit Prices & Gear</span>
              <span className="sm:hidden">Edit</span>
            </button>
          </div>
        </div>

        {/* Active search indicator */}
        {searchQuery && (
          <div className="mt-4 flex items-center justify-between bg-lime-50 border border-lime-200 p-2.5 rounded-xl text-xs text-zinc-700">
            <span>
              Searching for: <strong className="text-zinc-950">"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-lime-700 hover:text-lime-900 font-bold"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="mt-12 text-center py-16 px-4 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-200 flex items-center justify-center text-3xl">
              🏏
            </div>
            <h3 className="text-lg font-bold text-zinc-900 uppercase font-heading">
              No Cricket Gear Found
            </h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto mt-1 mb-6">
              We couldn't find any products matching your search criteria. Try a different term or clear your filters.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-black text-zinc-950 bg-lime-400 hover:bg-lime-500 rounded-xl flex items-center gap-2 border border-lime-500"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

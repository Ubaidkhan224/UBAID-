import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';

export const CategoryNav: React.FC = () => {
  const { selectedCategory, setSelectedCategory, products } = useShop();

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <div className="py-6 border-b border-zinc-200 bg-zinc-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-zinc-950 font-heading tracking-wide">
              Featured <span className="text-lime-600">Categories</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5 font-medium">
              Select category to filter cricket equipment
            </p>
          </div>
        </div>

        {/* Category Pills / Segmented Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat.id);
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                  isSelected
                    ? 'bg-lime-400 text-zinc-950 border-lime-500 shadow-sm'
                    : 'bg-white text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 border-zinc-200 shadow-xs'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    isSelected ? 'bg-zinc-950 text-lime-400' : 'bg-zinc-100 text-zinc-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

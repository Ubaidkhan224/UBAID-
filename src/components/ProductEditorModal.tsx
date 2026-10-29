import React, { useState } from 'react';
import { X, Plus, Trash2, Save, RotateCcw, Edit2, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../data/products';
import { formatPKR } from '../utils/formatters';

export const ProductEditorModal: React.FC = () => {
  const {
    products,
    updateProduct,
    addNewProduct,
    deleteProduct,
    resetCatalogToDefaults,
    isEditorOpen,
    setIsEditorOpen,
  } = useShop();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [editCategory, setEditCategory] = useState<'bats' | 'gloves' | 'balls' | 'pads' | 'kits'>('bats');
  const [editSpec, setEditSpec] = useState('');
  const [editInStock, setEditInStock] = useState(true);

  // New product form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState(5000);
  const [newCategory, setNewCategory] = useState<'bats' | 'gloves' | 'balls' | 'pads' | 'kits'>('bats');
  const [newSpec, setNewSpec] = useState('Standard Club Specification');

  if (!isEditorOpen) return null;

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.pricePKR);
    setEditCategory(product.category);
    setEditSpec(product.spec);
    setEditInStock(product.inStock);
  };

  const saveEdit = (product: Product) => {
    if (!editName.trim() || editPrice <= 0) {
      alert('Please provide a valid product name and positive price in PKR.');
      return;
    }

    updateProduct({
      ...product,
      name: editName.trim(),
      pricePKR: Number(editPrice),
      category: editCategory,
      spec: editSpec.trim(),
      inStock: editInStock,
    });

    setEditingId(null);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || newPrice <= 0) return;

    const newProd: Product = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      pricePKR: Number(newPrice),
      spec: newSpec.trim(),
      image: '/images/bat-lime-white.jpg',
      shortDescription: `${newName} engineered for performance cricket matches in Pakistan.`,
      features: ['High durability materials', 'Tested under Pakistani pitch conditions'],
      inStock: true,
      sizes: ['Standard Adult', 'Youth Size'],
    };

    addNewProduct(newProd);
    setNewName('');
    setNewPrice(5000);
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-2xl text-zinc-900 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-lime-700">
              Store Manager
            </span>
            <h2 className="text-lg sm:text-xl font-black uppercase text-zinc-950 font-heading">
              Edit Sample Products & PKR Prices
            </h2>
          </div>
          <button
            onClick={() => setIsEditorOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Guidance */}
        <div className="px-4 sm:px-6 py-3 bg-lime-50 border-b border-lime-200 text-xs text-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-lime-700 shrink-0" />
            <span className="font-medium">
              All edits to product names, categories, and PKR prices are updated live and saved in your browser.
            </span>
          </div>
          <button
            onClick={resetCatalogToDefaults}
            className="px-2.5 py-1 text-[11px] font-bold text-zinc-700 hover:text-zinc-950 bg-white border border-zinc-300 hover:bg-zinc-100 rounded-lg flex items-center gap-1 shrink-0"
            title="Reset catalog back to initial default items"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Defaults</span>
          </button>
        </div>

        {/* Content area: Table of products */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-white">
          
          {/* Add New Product Accordion Button */}
          <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
            <span className="text-xs font-bold uppercase text-zinc-500">
              Total Products in Store ({products.length})
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-1.5 bg-lime-400 hover:bg-lime-500 text-zinc-950 text-xs font-black rounded-lg flex items-center gap-1.5 cursor-pointer border border-lime-500 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Cancel New Item' : 'Add New Product'}</span>
            </button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <form onSubmit={handleCreateNew} className="p-4 bg-zinc-50 border border-lime-300 rounded-xl space-y-3">
              <h4 className="text-xs font-bold uppercase text-lime-800">Add New Cricket Item</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sialkot Master Bat"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 font-medium"
                  >
                    <option value="bats">Cricket Bats</option>
                    <option value="gloves">Batting Gloves</option>
                    <option value="balls">Match Balls</option>
                    <option value="pads">Pads & Protective</option>
                    <option value="kits">Kits & Bags</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-lime-400 hover:bg-lime-500 text-zinc-950 text-xs font-black rounded-lg border border-lime-500"
                >
                  Save Product to Store
                </button>
              </div>
            </form>
          )}

          {/* List of Products */}
          <div className="space-y-2">
            {products.map((p) => {
              const isEditing = editingId === p.id;

              return (
                <div
                  key={p.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isEditing
                      ? 'bg-lime-50/50 border-lime-500 shadow-sm'
                      : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6">
                          <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Product Name</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-white border border-zinc-300 rounded px-2 py-1 text-xs text-zinc-900"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Price in PKR</label>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-full bg-white border border-zinc-300 rounded px-2 py-1 text-xs text-zinc-900 font-mono font-bold"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Category</label>
                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value as any)}
                            className="w-full bg-white border border-zinc-300 rounded px-2 py-1 text-xs text-zinc-900"
                          >
                            <option value="bats">Bats</option>
                            <option value="gloves">Gloves</option>
                            <option value="balls">Balls</option>
                            <option value="pads">Pads</option>
                            <option value="kits">Kits</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-9">
                          <label className="block text-[10px] font-bold text-zinc-500 mb-0.5">Brief Specs</label>
                          <input
                            type="text"
                            value={editSpec}
                            onChange={(e) => setEditSpec(e.target.value)}
                            className="w-full bg-white border border-zinc-300 rounded px-2 py-1 text-xs text-zinc-900"
                          />
                        </div>

                        <div className="sm:col-span-3 flex items-center gap-2 pt-3">
                          <input
                            type="checkbox"
                            id={`instock-${p.id}`}
                            checked={editInStock}
                            onChange={(e) => setEditInStock(e.target.checked)}
                            className="rounded text-lime-600 focus:ring-0"
                          />
                          <label htmlFor={`instock-${p.id}`} className="text-xs font-semibold text-zinc-800">
                            In Stock
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-zinc-200 text-xs font-semibold text-zinc-700 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => saveEdit(p)}
                          className="px-4 py-1 bg-lime-400 hover:bg-lime-500 text-zinc-950 text-xs font-black rounded flex items-center gap-1.5 border border-lime-500"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded bg-zinc-100 shrink-0 border border-zinc-200"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 line-clamp-1">
                            {p.name}
                          </h4>
                          <span className="text-[11px] text-zinc-500 font-mono">
                            Category: <span className="uppercase text-lime-700 font-bold">{p.category}</span> · {p.spec}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-sm font-mono font-black text-zinc-950 block tabular-nums">
                            {formatPKR(p.pricePKR)}
                          </span>
                          <span className={`text-[10px] font-bold ${p.inStock ? 'text-lime-700' : 'text-zinc-400'}`}>
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => startEdit(p)}
                            className="p-1.5 text-zinc-600 hover:text-zinc-950 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors"
                            title="Edit this item"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${p.name}" from store catalog?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-zinc-400 hover:text-red-600 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors"
                            title="Delete item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-medium">
            Changes take effect across the entire website instantly.
          </span>
          <button
            onClick={() => setIsEditorOpen(false)}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl"
          >
            Close Manager
          </button>
        </div>

      </div>
    </div>
  );
};

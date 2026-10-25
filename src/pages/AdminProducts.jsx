import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Button, Input, Select, Textarea, Card, Badge, Modal, EmptyState } from '../components/ui';
import { formatCurrency } from '../lib/data';
import { Plus, Edit3, Trash2, Search, Tag, Layers, AlertCircle } from 'lucide-react';

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Unstitched',
    sub_category: 'Festive',
    price: '',
    sale_price: '',
    sku: '',
    stock_quantity: '',
    sizes: 'XS, S, M, L, XL',
    colors: 'Obsidian, Gold',
    description: '',
    is_featured: false
  });

  const categories = ['All', 'Unstitched', 'Ready to Wear', 'Men and Kids', 'Home & Fragrances'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      category: 'Unstitched',
      sub_category: 'Festive',
      price: '',
      sale_price: '',
      sku: `FF-${Math.floor(1000 + Math.random() * 9000)}`,
      stock_quantity: '50',
      sizes: 'Unstitched (Standard 8M)',
      colors: 'Crimson Red, Gold',
      description: '',
      is_featured: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      sub_category: product.sub_category,
      price: product.price,
      sale_price: product.sale_price || '',
      sku: product.sku,
      stock_quantity: product.stock_quantity,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes,
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : product.colors,
      description: product.description,
      is_featured: product.is_featured || false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      sale_price: formData.sale_price ? Number(formData.sale_price) : Number(formData.price),
      stock_quantity: Number(formData.stock_quantity),
      sizes: formData.sizes.split(',').map((s) => s.trim()),
      colors: formData.colors.split(',').map((c) => c.trim()),
      images: [formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')]
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-ink">Product Management</h1>
          <p className="text-ink-muted text-sm font-mono mt-1">Full CRUD for catalog items, pricing, SKUs, and stock matrices.</p>
        </div>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus size={16} /> Add New Product
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            placeholder="Search by title or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-paper-surface border border-line text-ink pl-12 pr-4 py-3.5 rounded-[2px] font-body text-sm outline-none focus:border-brand"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 font-mono text-xs rounded-[2px] whitespace-nowrap cursor-pointer transition-colors ${
                categoryFilter === cat ? 'bg-brand text-ink font-bold' : 'bg-paper-surface border border-line text-ink-muted hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      {filteredProducts.length === 0 ? (
        <EmptyState title="No products found" description="Try adjusting your search filters or add a new product to the catalog." />
      ) : (
        <div className="bg-paper-surface border border-line rounded-[4px] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line bg-paper font-mono text-xs text-ink-muted uppercase tracking-wider">
                <th className="p-4">SKU / Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line font-body text-sm">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-soft transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-ink">{p.title}</span>
                      <span className="font-mono text-xs text-brand">{p.sku}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-ink text-xs">{p.category}</span>
                      <span className="text-ink-muted text-[10px] font-mono">{p.sub_category}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs">
                    <div className="flex flex-col">
                      <span className="text-ink font-bold">{formatCurrency(p.sale_price || p.price)}</span>
                      {p.sale_price && p.sale_price < p.price && (
                        <span className="text-ink-muted line-through text-[10px]">{formatCurrency(p.price)}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs">
                    <span className={`px-2 py-1 rounded-[2px] ${p.stock_quantity < 20 ? 'bg-red-500/20 text-red-400' : 'bg-soft text-ink'}`}>
                      {p.stock_quantity} units
                    </span>
                  </td>
                  <td className="p-4">
                    {p.is_featured ? <Badge variant="brand">Featured</Badge> : <span className="text-ink-muted text-xs">—</span>}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-2 text-ink-muted hover:text-ink bg-paper border border-line rounded-[2px] transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 text-red-400 hover:text-white bg-paper border border-line rounded-[2px] hover:bg-red-600 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Product Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Velvet Royale Ensemble"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Unstitched">Unstitched</option>
              <option value="Ready to Wear">Ready to Wear</option>
              <option value="Men and Kids">Men and Kids</option>
              <option value="Home & Fragrances">Home & Fragrances</option>
            </Select>

            <Input
              label="Sub Category"
              required
              value={formData.sub_category}
              onChange={(e) => setFormData({ ...formData, sub_category: e.target.value })}
              placeholder="e.g. Festive, Lawn, Pret"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Regular Price (PKR)"
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="15000"
            />
            <Input
              label="Sale Price (PKR)"
              type="number"
              value={formData.sale_price}
              onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
              placeholder="12000"
            />
            <Input
              label="Stock Quantity"
              type="number"
              required
              value={formData.stock_quantity}
              onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
              placeholder="50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="SKU Code"
              required
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="FF-UNS-001"
            />
            <Input
              label="Sizes (comma separated)"
              required
              value={formData.sizes}
              onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              placeholder="XS, S, M, L, XL"
            />
          </div>

          <Input
            label="Colors (comma separated)"
            required
            value={formData.colors}
            onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
            placeholder="Crimson Red, Antique Gold"
          />

          <Textarea
            label="Description"
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Fabric details, embroidery specifications, washing instructions..."
          />

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="w-4 h-4 accent-brand"
            />
            <label htmlFor="is_featured" className="font-mono text-xs uppercase text-ink cursor-pointer">
              Mark as Featured Product on Homepage
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-line mt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

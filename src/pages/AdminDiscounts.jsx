import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Button, Input, Select, Card, Badge, Modal, EmptyState } from '../components/ui';
import { Plus, Tag, Trash2, Edit3, Percent } from 'lucide-react';

export default function AdminDiscounts() {
  const { discounts, addDiscount, updateDiscount, deleteDiscount } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    discount_percentage: '',
    valid_from: new Date().toISOString().split('T')[0],
    valid_to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    applicable_category: 'All',
    status: 'Active'
  });

  const categories = ['All', 'Unstitched', 'Ready to Wear', 'Men and Kids', 'Home & Fragrances'];

  const handleOpenAdd = () => {
    setEditingDiscount(null);
    setFormData({
      code: `SAVE${Math.floor(10 + Math.random() * 90)}`,
      discount_percentage: '20',
      valid_from: new Date().toISOString().split('T')[0],
      valid_to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applicable_category: 'All',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (disc) => {
    setEditingDiscount(disc);
    setFormData({
      code: disc.code,
      discount_percentage: disc.discount_percentage,
      valid_from: disc.valid_from,
      valid_to: disc.valid_to,
      applicable_category: disc.applicable_category,
      status: disc.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      discount_percentage: Number(formData.discount_percentage)
    };

    if (editingDiscount) {
      updateDiscount(editingDiscount.id, payload);
    } else {
      addDiscount(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-ink">Discounts & Promotions</h1>
          <p className="text-ink-muted text-sm font-mono mt-1">Configure seasonal sale percentages, promo codes, and homepage banners.</p>
        </div>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus size={16} /> Create Promo Code
        </Button>
      </div>

      {/* Discounts Grid */}
      {discounts.length === 0 ? (
        <EmptyState title="No active discounts" description="Create promo codes and seasonal sale percentages for your customers." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discounts.map((disc) => (
            <Card key={disc.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand/10 border border-brand/30 flex items-center justify-center font-mono font-bold text-brand">
                    <Percent size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-base font-bold text-ink">{disc.code}</span>
                    <p className="font-mono text-xs text-brand">{disc.discount_percentage}% OFF</p>
                  </div>
                </div>
                <Badge variant={disc.status === 'Active' ? 'brand' : 'muted'}>{disc.status}</Badge>
              </div>

              <div className="flex flex-col gap-2 font-mono text-xs text-ink-muted">
                <div className="flex justify-between">
                  <span>Applicable:</span>
                  <span className="text-ink">{disc.applicable_category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valid From:</span>
                  <span className="text-ink">{disc.valid_from}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valid To:</span>
                  <span className="text-ink">{disc.valid_to}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-line mt-2">
                <button
                  onClick={() => handleOpenEdit(disc)}
                  className="p-2 text-ink-muted hover:text-ink bg-paper border border-line rounded-[2px] transition-colors cursor-pointer"
                  title="Edit Discount"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => deleteDiscount(disc.id)}
                  className="p-2 text-red-400 hover:text-white bg-paper border border-line rounded-[2px] hover:bg-red-600 transition-colors cursor-pointer"
                  title="Delete Discount"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDiscount ? 'Edit Promo Code' : 'Create New Promo Code'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Promo Code"
            required
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="e.g. AURA50"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Discount Percentage (%)"
              type="number"
              required
              min="1"
              max="100"
              value={formData.discount_percentage}
              onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
              placeholder="25"
            />
            <Select
              label="Applicable Category"
              value={formData.applicable_category}
              onChange={(e) => setFormData({ ...formData, applicable_category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Valid From"
              type="date"
              required
              value={formData.valid_from}
              onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
            />
            <Input
              label="Valid To"
              type="date"
              required
              value={formData.valid_to}
              onChange={(e) => setFormData({ ...formData, valid_to: e.target.value })}
            />
          </div>

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-line mt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingDiscount ? 'Save Changes' : 'Create Promo Code'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

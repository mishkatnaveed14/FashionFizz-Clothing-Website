import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Card, Badge, Button, Modal, Input } from '../components/ui';
import { Award, Sparkles, Bookmark, Gift, ArrowRight } from 'lucide-react';

export default function UserRewards() {
  const { user, notify } = useStore();
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const rewardsList = [
    { id: 'rew-1', title: 'Rs. 1,000 Shopping Voucher', points: 1000, code: 'VOUCHER1000' },
    { id: 'rew-2', title: 'Free Global Express Shipping', points: 750, code: 'FREESHIP' },
    { id: 'rew-3', title: 'Complimentary Silk Scarf', points: 1500, code: 'SILKSCARF' },
  ];

  const lookbookInspirations = [
    { title: 'Eid Festive Opulence 2025', desc: 'Heavy tilla embroidery paired with jamawar shawls.', category: 'Festive Unstitched' },
    { title: 'Minimalist Corporate Pret', desc: 'Clean lines, raw silk tunics, and structured tailoring.', category: 'Ready to Wear' },
    { title: 'Royal Gents Grooming', desc: 'Karandi shalwar kameez with handcrafted waistcoats.', category: 'Men & Kids' }
  ];

  const handleRedeem = (reward) => {
    if (user.loyalty_points < reward.points) {
      notify('Insufficient loyalty points', 'error');
      return;
    }
    notify(`Successfully redeemed! Voucher Code: ${reward.code}`);
    setRedeemModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink mb-2">Rewards & Lookbook</h1>
        <p className="text-ink-muted text-sm font-body">Manage your loyalty points balance, redeem exclusive vouchers, and explore saved seasonal fashion styling inspirations.</p>
      </div>

      {/* Points Overview Card */}
      <Card className="bg-gradient-to-r from-paper-surface to-soft border-brand/40 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-brand text-ink rounded-[4px] flex items-center justify-center font-display font-bold text-2xl shadow-[4px_4px_0px_var(--color-chrome)]">
            <Award size={32} />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">Current Loyalty Balance</span>
            <span className="font-display text-4xl font-bold text-ink">{user ? user.loyalty_points : 0} <span className="text-brand text-lg">Pts</span></span>
            <span className="font-mono text-xs text-accent mt-1">Tier: Elite Aurum Member</span>
          </div>
        </div>

        <Button onClick={() => setRedeemModalOpen(true)} className="gap-2">
          <Gift size={16} /> Redeem Points
        </Button>
      </Card>

      {/* Available Rewards Catalog */}
      <div className="flex flex-col gap-4">
        <h3 className="font-display text-xl text-ink">Exclusive Rewards Catalog</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewardsList.map((reward) => (
            <Card key={reward.id} className="flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <Badge variant="accent">{reward.points} Points</Badge>
                <h4 className="font-display text-lg font-semibold text-ink">{reward.title}</h4>
                <p className="font-mono text-xs text-ink-muted">Use code at checkout to claim your reward privilege.</p>
              </div>
              <Button
                variant={user && user.loyalty_points >= reward.points ? 'primary' : 'outline'}
                onClick={() => {
                  setSelectedReward(reward);
                  setRedeemModalOpen(true);
                }}
              >
                Redeem Reward
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Seasonal Fashion Lookbook */}
      <div className="flex flex-col gap-4 pt-4 border-t border-line">
        <h3 className="font-display text-xl text-ink flex items-center gap-2">
          <Sparkles className="text-brand" size={20} /> Saved Fashion Styling Inspirations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lookbookInspirations.map((item, idx) => (
            <Card key={idx} className="flex flex-col gap-4">
              <div className="aspect-[4/3] bg-soft border border-line flex items-center justify-center font-display text-ink-muted text-sm">
                Aura Look #{idx + 1}
              </div>
              <div className="flex flex-col gap-1">
                <Badge variant="outline">{item.category}</Badge>
                <h4 className="font-display text-base font-semibold text-ink mt-2">{item.title}</h4>
                <p className="font-body text-xs text-ink-muted">{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Redeem Confirmation Modal */}
      <Modal isOpen={redeemModalOpen} onClose={() => setRedeemModalOpen(false)} title="Redeem Loyalty Reward">
        <div className="flex flex-col gap-6 font-body text-sm">
          <p className="text-ink-muted">
            You are about to redeem loyalty points for exclusive vouchers and perks. Once confirmed, the voucher code will be generated instantly.
          </p>

          <div className="bg-paper p-4 border border-line rounded-[2px] flex flex-col gap-2">
            <span className="font-mono text-xs text-brand uppercase">Selected Reward</span>
            <span className="font-display font-bold text-ink text-lg">{selectedReward ? selectedReward.title : rewardsList[0].title}</span>
            <span className="font-mono text-xs text-ink-muted">Cost: {selectedReward ? selectedReward.points : rewardsList[0].points} Points</span>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setRedeemModalOpen(false)}>Cancel</Button>
            <Button onClick={() => handleRedeem(selectedReward || rewardsList[0])}>Confirm Redemption</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

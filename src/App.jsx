import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStore } from './lib/store';
import { RouteLoader, IntroLoader } from './components/Loader';
import { Toaster } from './components/ui';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const CatalogUnstitched = lazy(() => import('./pages/CatalogUnstitched'));
const CatalogPret = lazy(() => import('./pages/CatalogPret'));
const CatalogMenKids = lazy(() => import('./pages/CatalogMenKids'));
const CatalogHomeFragrances = lazy(() => import('./pages/CatalogHomeFragrances'));
const SeasonalSale = lazy(() => import('./pages/SeasonalSale'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));

// User Area
const UserLayout = lazy(() => import('./components/UserLayout'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const UserOrders = lazy(() => import('./pages/UserOrders'));
const UserWishlist = lazy(() => import('./pages/UserWishlist'));
const UserRewards = lazy(() => import('./pages/UserRewards'));

// Admin Area
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/AdminProducts'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const AdminInventory = lazy(() => import('./pages/AdminInventory'));
const AdminDiscounts = lazy(() => import('./pages/AdminDiscounts'));

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-body">
      {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}
      <Toaster />
      <Navbar />
      <CartDrawer />
      <SearchModal />

      <main className="flex-grow">
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections/unstitched" element={<CatalogUnstitched />} />
            <Route path="/collections/ready-to-wear" element={<CatalogPret />} />
            <Route path="/collections/men-and-kids" element={<CatalogMenKids />} />
            <Route path="/collections/home-and-fragrances" element={<CatalogHomeFragrances />} />
            <Route path="/sale" element={<SeasonalSale />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Customer Portal */}
            <Route path="/account" element={<ProtectedRoute role="Customer"><UserLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="wishlist" element={<UserWishlist />} />
              <Route path="rewards" element={<UserRewards />} />
            </Route>

            {/* Admin Control Deck */}
            <Route path="/admin" element={<ProtectedRoute role="Admin"><AdminLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="discounts" element={<AdminDiscounts />} />
            </Route>
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

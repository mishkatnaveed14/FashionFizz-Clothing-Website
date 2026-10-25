import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_USERS, INITIAL_DISCOUNTS } from './data';

const StoreContext = createContext(null);
let toastSequence = 0;

export function StoreProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ff_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[1]; // default to customer for convenience
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ff_products');
    if (!saved) return INITIAL_PRODUCTS;
    const savedProducts = JSON.parse(saved);
    const savedIds = new Set(savedProducts.map((product) => product.id));
    return [...savedProducts, ...INITIAL_PRODUCTS.filter((product) => !savedIds.has(product.id))];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('ff_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('ff_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [discounts, setDiscounts] = useState(() => {
    const saved = localStorage.getItem('ff_discounts');
    return saved ? JSON.parse(saved) : INITIAL_DISCOUNTS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ff_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ff_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('ff_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ff_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ff_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ff_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('ff_discounts', JSON.stringify(discounts));
  }, [discounts]);

  useEffect(() => {
    localStorage.setItem('ff_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ff_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const notify = (message, type = 'success') => {
    const id = `${Date.now()}-${toastSequence++}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const login = (email, password) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      notify(`Welcome back, ${found.name}!`);
      return { success: true, user: found };
    }
    notify('Invalid email or password', 'error');
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (userData) => {
    const exists = users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) {
      notify('Email already registered', 'error');
      return { success: false, error: 'Email already exists' };
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      ...userData,
      addresses: userData.address ? [userData.address] : [],
      role: userData.role || 'Customer',
      loyalty_points: 100, // sign up bonus
      created_at: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    notify('Account created successfully! +100 Loyalty Points');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    notify('Logged out successfully');
  };

  const addProduct = (productData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...productData,
      price: Number(productData.price),
      sale_price: productData.sale_price ? Number(productData.sale_price) : Number(productData.price),
      stock_quantity: Number(productData.stock_quantity) || 10
    };
    setProducts([newProduct, ...products]);
    notify('Product added successfully');
  };

  const updateProduct = (id, productData) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...productData } : p)));
    notify('Product updated successfully');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    notify('Product removed');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o)));
    notify(`Order ${orderId} updated to ${newStatus}`);
  };

  const trackOrder = (orderId) => {
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
  };

  const addDiscount = (discountData) => {
    const newDisc = {
      id: `disc-${Date.now()}`,
      ...discountData
    };
    setDiscounts([newDisc, ...discounts]);
    notify('Discount code created');
  };

  const updateDiscount = (id, data) => {
    setDiscounts(discounts.map((d) => (d.id === id ? { ...d, ...data } : d)));
    notify('Discount updated');
  };

  const deleteDiscount = (id) => {
    setDiscounts(discounts.filter((d) => d.id !== id));
    notify('Discount removed');
  };

  const addLoyaltyPoints = (points) => {
    if (!user) return;
    const updated = { ...user, loyalty_points: (user.loyalty_points || 0) + points };
    setUser(updated);
    setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
  };

  const addToCart = (product, size, color, quantity = 1) => {
    const cartItemKey = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => `${item.product.id}-${item.size}-${item.color}` === cartItemKey);
      if (existing) {
        return prev.map((item) =>
          `${item.product.id}-${item.size}-${item.color}` === cartItemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, color, quantity }];
    });
    notify(`Added ${product.title} to cart`);
  };

  const removeFromCart = (productKey) => {
    setCart((prev) => prev.filter((item) => `${item.product.id}-${item.size}-${item.color}` !== productKey));
    notify('Item removed from cart');
  };

  const updateCartQuantity = (productKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        `${item.product.id}-${item.size}-${item.color}` === productKey ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        notify('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        notify('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      user_id: user ? user.id : 'guest',
      items: cart.map((i) => ({
        product_id: i.product.id,
        title: i.product.title,
        price: i.product.sale_price || i.product.price,
        quantity: i.quantity,
        size: i.size,
        color: i.color
      })),
      total_amount: orderData.total_amount,
      shipping_address: orderData.shipping_address,
      payment_method: orderData.payment_method,
      payment_status: 'Paid',
      order_status: 'Confirmed',
      created_at: new Date().toISOString()
    };
    setOrders([newOrder, ...orders]);
    clearCart();
    addLoyaltyPoints(50);
    notify(`Order placed successfully! ID: ${newOrder.id}`);
    return newOrder;
  };

  const value = {
    user,
    products,
    orders,
    users,
    discounts,
    cart,
    wishlist,
    toasts,
    login,
    signup,
    logout,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    trackOrder,
    addDiscount,
    updateDiscount,
    deleteDiscount,
    addLoyaltyPoints,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleWishlist,
    placeOrder,
    notify
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

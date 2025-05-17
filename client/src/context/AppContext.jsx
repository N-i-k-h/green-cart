// AppContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';
import toast from 'react-hot-toast';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.log('Authentication error', error);
    }
    return Promise.reject(error);
  }
);

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState(dummyProducts);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get('/api/seller/is-auth');
      setIsSeller(data.success);
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Seller auth error:', error);
      }
      setIsSeller(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/is-auth');
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        clearUser();
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error('User auth error:', error);
      }
      clearUser();
    }
  };

  const clearUser = () => {
    setUser(null);
    setCartItems({});
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/user/login', { email, password });
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
        toast.success('Logged in successfully');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
    return false;
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post('/api/user/register', { name, email, password });
      if (data.success) {
        setUser(data.user);
        toast.success('Registered successfully');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
    return false;
  };

  const logout = async () => {
    try {
      await axios.get('/api/user/logout');
      clearUser();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const fetchProducts = async () => {
    try {
      setProducts(dummyProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addToCart = (itemId) => {
    setCartItems(prevCartItems => {
      const cartData = structuredClone(prevCartItems);
      cartData[itemId] = (cartData[itemId] || 0) + 1;
      toast.success('Product added to cart');
      return cartData;
    });
  };

  const updateCartItem = (itemId, quantity) => {
    setCartItems(prevCartItems => {
      const cartData = structuredClone(prevCartItems);
      cartData[itemId] = quantity;
      toast.success('Product quantity updated');
      return cartData;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevCartItems => {
      const cartData = structuredClone(prevCartItems);
      if (cartData[itemId]) {
        cartData[itemId] -= 1;
        if (cartData[itemId] === 0) {
          delete cartData[itemId];
        }
      }
      toast.success('Product removed from cart');
      return cartData;
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((totalAmount, [itemId, count]) => {
      const itemInfo = products.find((product) => product._id === itemId);
      return totalAmount + (itemInfo?.offerPrice || 0) * count;
    }, 0);
  };

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    setCartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    login,
    register,
    logout,
    fetchUser,
    axios,
    orders,
    addOrder
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

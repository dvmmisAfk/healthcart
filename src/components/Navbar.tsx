import { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Heart,
  User,
  LogOut,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onCartClick: () => void;
  onLoginClick: () => void;
  onProfileClick: () => void;
  onSwastikaCureClick: () => void;
}

export default function Navbar({
  onCartClick,
  onLoginClick,
  onProfileClick,
  onSwastikaCureClick,
}: NavbarProps) {
  const { cartItems } = useCart();
  const { currentUser, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const dummyResults = ['Paracetamol', 'BP Monitor', 'Vicks Vaporub'].filter(
      item => item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(dummyResults);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    onProfileClick();
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= TOP BAR ================= */}
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white tracking-wide cursor-pointer">
              HealthCart
            </span>
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex items-center gap-8">

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search medicines & devices..."
                className="w-96 px-4 py-2 rounded-full border bg-white/90
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute right-3">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </form>

            {/* Swastika Cure */}
            <button
              onClick={onSwastikaCureClick}
              className="flex items-center gap-2 text-white/90 hover:text-white
                         transition font-medium"
            >
              <Heart className="h-5 w-5 text-pink-200" />
              <span>Swastika Cure</span>
            </button>

            {/* User */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-white/90 hover:text-white transition"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm max-w-[100px] truncate">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {currentUser.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleProfileClick}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 text-white/90 hover:text-white transition"
              >
                <User className="h-5 w-5" />
                <span className="text-sm">Login</span>
              </button>
            )}

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative text-white hover:scale-105 transition"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-red-600 text-white
                             text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* ================= SEARCH DROPDOWN ================= */}
        {searchResults.length > 0 && (
          <div className="absolute left-1/2 top-16 -translate-x-1/2
                          bg-white shadow-xl rounded-lg w-96">
            <ul className="divide-y">
              {searchResults.map((item, idx) => (
                <li
                  key={idx}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer
                             text-gray-700 hover:text-blue-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-4 py-4 space-y-4">

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-full border"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
            </form>

            <button
              onClick={onSwastikaCureClick}
              className="flex items-center gap-3 text-gray-700 w-full py-2"
            >
              <Heart className="h-5 w-5 text-pink-500" />
              Swastika Cure
            </button>

            {currentUser ? (
              <>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-3 text-gray-700 w-full py-2 border-t pt-4"
                >
                  <User className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">{currentUser.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-600 w-full py-2"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-3 text-gray-700 w-full py-2"
              >
                <User className="h-5 w-5" />
                Login
              </button>
            )}

            <button
              onClick={onCartClick}
              className="flex items-center gap-3 text-gray-700 w-full py-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Cart ({cartItems.length})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

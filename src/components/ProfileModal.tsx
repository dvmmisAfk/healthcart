import { useState } from 'react';
import { X, Package, Heart, Gift, Headphones, User, ChevronRight, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useOrders } from '../context/OrderContext';

interface ProfileModalProps {
  onClose: () => void;
}

type ActiveTab = 'profile' | 'orders' | 'wishlist' | 'coupons' | 'help';

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const { currentUser } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { orders, cancelOrder } = useOrders();
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');

  const menuItems = [
    { id: 'orders' as const, label: 'Orders', icon: Package, color: 'text-blue-500' },
    { id: 'wishlist' as const, label: 'Wishlist', icon: Heart, color: 'text-pink-500' },
    { id: 'coupons' as const, label: 'Coupons', icon: Gift, color: 'text-purple-500' },
    { id: 'help' as const, label: 'Help Center', icon: Headphones, color: 'text-green-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed': return 'bg-yellow-100 text-yellow-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {currentUser?.displayName || 'User'}
              </h2>
              <p className="text-blue-100 text-sm">{currentUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' && (
            <div className="p-4">
              {/* Welcome Card */}
              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <h3 className="font-semibold text-gray-900">
                  {currentUser?.displayName || 'User'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Welcome to HealthCart! Your health is our priority.
                </p>
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-2 gap-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition"
                  >
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                    <span className="font-medium text-gray-800">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="p-4">
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 text-blue-600 mb-4"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back
              </button>
              <h3 className="text-lg font-semibold mb-4">Your Orders</h3>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                  <p className="text-sm text-gray-400">Your orders will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{order.id}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.items.length} item(s) • ₹{order.total}
                      </div>
                      {order.status === 'placed' && (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="mt-2 text-red-500 text-sm hover:underline"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="p-4">
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 text-blue-600 mb-4"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back
              </button>
              <h3 className="text-lg font-semibold mb-4">Your Wishlist</h3>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your wishlist is empty</p>
                  <p className="text-sm text-gray-400">Save items you love here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 border rounded-xl p-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-blue-600 font-semibold">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="p-4">
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 text-blue-600 mb-4"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back
              </button>
              <h3 className="text-lg font-semibold mb-4">Your Coupons</h3>
              <div className="text-center py-8">
                <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No coupons available</p>
                <p className="text-sm text-gray-400">Check back later for exciting offers!</p>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="p-4">
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 text-blue-600 mb-4"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back
              </button>
              <h3 className="text-lg font-semibold mb-4">Help Center</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-600 mb-4">
                  Need help? Contact our support team and we'll get back to you as soon as possible.
                </p>
                <a
                  href="mailto:teamswastikacure01@gmail.com"
                  className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  <Mail className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-blue-100">teamswastikacure01@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

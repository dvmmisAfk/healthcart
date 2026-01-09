import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  /* ===================== IMAGE HELPER ===================== */

  const getCartItemImage = (name: string) => {
    const n = name.toLowerCase();

    if (n.includes('vicks')) return '/vicks.jpg';
    if (n.includes('moov')) return '/moov.jpg';
    if (n.includes('volini')) return '/volini.jpeg';

    if (n.includes('stethoscope')) return '/sethoscope.png';
    if (n.includes('scissors')) return '/scissor.png';
    if (n.includes('forceps')) return '/forcep.jpeg';
    if (n.includes('scalpel')) return '/scalpel.jpeg';

    if (n.includes('bp')) return '/bpmachine.jpg';
    if (n.includes('thermometer')) return '/thermometer.jpg';
    if (n.includes('oximeter')) return '/oximeter.jpg';

    if (n.includes('walker')) return '/walker.jpg';
    if (n.includes('crutch')) return '/crutch.jpg';
    if (n.includes('wheelchair')) return '/wheelchair.jpg';

    if (n.includes('knee')) return '/kneebrace.jpg';
    if (n.includes('elbow')) return '/elbowsupport.jpg';
    if (n.includes('wrist')) return '/wristsupport.jpg';
    if (n.includes('back')) return '/backsupport.jpg';
    if (n.includes('neck')) return '/neckcollar.jpg';

    if (n.includes('crepe')) return '/crepebandage.jpeg';
    if (n.includes('gauze')) return '/gauge.jpg';
    if (n.includes('cotton')) return '/cotton.jpg';
    if (n.includes('adhesive')) return '/adhesive.jpg';

    if (n.includes('glove')) return '/glove.png';
    if (n.includes('mask')) return '/mask.jpg';
    if (n.includes('syringe')) return '/syringe.jpg';

    if (
      n.includes('cream') ||
      n.includes('gel') ||
      n.includes('ointment') ||
      n.includes('lotion')
    ) {
      return '/lotion.png';
    }

    return '/tablet.png';
  };

  /* ===================== BILL CALCULATION ===================== */

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.18;
  const shippingCharges = cartItems.length > 0 ? 49 : 0;
  const handlingCharges = cartItems.length > 0 ? 20 : 0;

  const grandTotal = subtotal + gst + shippingCharges + handlingCharges;

  /* ===================== PAYMENT ===================== */

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Demo checkout completed successfully');
      onClose();
    } catch {
      setPaymentError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="p-6 h-full flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-16">
              Your cart is empty
            </p>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50"
                  >
                    <img
                      src={getCartItemImage(item.name)}
                      alt={item.name}
                      className="w-20 h-20 object-contain bg-white rounded-lg p-2 border"
                    />

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        ₹{item.price}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 rounded border text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="font-medium text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 rounded border text-gray-700 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Bill Summary */}
              <div className="border-t mt-6 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping Charges</span>
                  <span>₹{shippingCharges.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Handling Charges</span>
                  <span>₹{handlingCharges.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-base border-t pt-3 text-gray-900">
                  <span>Total Payable</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>

                {paymentError && (
                  <div className="mt-3 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                    {paymentError}
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full mt-4 py-3 rounded-lg font-semibold text-white transition ${
                    isProcessing
                      ? 'bg-gray-400'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

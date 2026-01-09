import { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ThankYouModalProps {
  productName: string;
  onClose: () => void;
}

export default function ThankYouModal({ productName, onClose }: ThankYouModalProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 relative p-6 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">
            {productName} has been added to your cart successfully.
          </p>
        </div>
      </div>
    </div>
  );
}
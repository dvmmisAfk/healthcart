import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AISymptomChecker from './components/AISymptomChecker';
import SwastikaCure from './components/SwastikaCure';
import DoctorConsultation from './components/DoctorConsultation';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAISymptomCheckerOpen, setIsAISymptomCheckerOpen] = useState(false);
  const [isDoctorConsultationOpen, setIsDoctorConsultationOpen] = useState(false);
  const [isSwastikaCureOpen, setIsSwastikaCureOpen] = useState(false);

  const handleAuthSuccess = () => {
    console.log('Authentication successful!');
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <div className="min-h-screen bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100 transition-colors">
                
                <Navbar
                  onCartClick={() => setIsCartOpen(true)}
                  onLoginClick={() => setIsAuthModalOpen(true)}
                  onProfileClick={() => setIsProfileModalOpen(true)}
                  onSwastikaCureClick={() => setIsSwastikaCureOpen(true)}
                />

                <Hero
                  onSymptomCheck={() => setIsAISymptomCheckerOpen(true)}
                  onDoctorConsult={() => setIsDoctorConsultationOpen(true)}
                />

                <ProductGrid />
                <Footer />

                {/* Modals */}
                {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
                {isAuthModalOpen && (
                  <AuthModal 
                    onClose={() => setIsAuthModalOpen(false)} 
                    onSuccess={handleAuthSuccess}
                  />
                )}
                {isProfileModalOpen && (
                  <ProfileModal onClose={() => setIsProfileModalOpen(false)} />
                )}
                {isAISymptomCheckerOpen && (
                  <AISymptomChecker onClose={() => setIsAISymptomCheckerOpen(false)} />
                )}
                {isDoctorConsultationOpen && (
                  <DoctorConsultation onClose={() => setIsDoctorConsultationOpen(false)} />
                )}
                {isSwastikaCureOpen && (
                  <SwastikaCure onClose={() => setIsSwastikaCureOpen(false)} />
                )}

              </div>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

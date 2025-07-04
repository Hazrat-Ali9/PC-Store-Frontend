import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { Categories } from './components/home/Categories';
import { ProductShowcase } from './components/home/ProductShowcase';
import { PCBuilder } from './components/home/PCBuilder';
import { About } from './components/home/About';
import { Contact } from './components/home/Contact';
import { CartSidebar } from './components/cart/CartSidebar';

function App() {
  const { isDarkMode } = useStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>
        <div id="home">
          <Hero />
        </div>
        <FeaturedProducts />
        <Categories />
        <ProductShowcase />
        <PCBuilder />
        <About />
        <Contact />
      </main>
      <Footer />
      <CartSidebar />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#333'
          }
        }}
      />
    </div>
  );
}

export default App;
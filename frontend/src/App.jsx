import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { AnimationProvider } from './context/AnimationContext';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

function App() {
  return (
    <AnimationProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-0)' }}>
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AnimationProvider>
  );
}

export default App;

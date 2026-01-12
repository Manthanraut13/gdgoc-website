import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { AnimationProvider } from './context/AnimationContext';
import './index.css';

function App() {
  return (
    <AnimationProvider>
      {/* Full height, stacked layout + ensure bg is visible */}
      <div className="min-h-screen flex flex-col bg-white">
        <Header />

        {/* Content pushes footer down */}
        <main className="flex-grow">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </AnimationProvider>
  );
}

export default App;

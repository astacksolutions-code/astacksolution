// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar.tsx';
// import Footer from './components/Footer.tsx';
// import Home from './pages/Home.tsx';
// import { AnimatePresence } from 'motion/react';

// // Lazy load pages for better performance
// const ServicesPage = lazy(() => import('./pages/ServicesPage.tsx'));
// const PortfolioPage = lazy(() => import('./pages/PortfolioPage.tsx'));
// const AboutPage = lazy(() => import('./pages/AboutPage.tsx'));
// const ContactPage = lazy(() => import('./pages/ContactPage.tsx'));
// const AdminPage = lazy(() => import('./pages/AdminPage.tsx'));

// function AppRoutes() {
//   const location = useLocation();
  
//   return (
//     <AnimatePresence mode="wait">
//       <Suspense fallback={
//         <div className="h-screen w-full flex items-center justify-center">
//           <div className="w-12 h-12 border-4 border-primary/20 border-t-accent rounded-full animate-spin" />
//         </div>
//       }>
//         <Routes location={location} key={location.pathname}>
//           <Route path="/" element={<Home />} />
//           <Route path="/services" element={<ServicesPage />} />
//           <Route path="/portfolio" element={<PortfolioPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/admin" element={<AdminPage />} />
//         </Routes>
//       </Suspense>
//     </AnimatePresence>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col relative selection:bg-accent/30">
//         <Navbar />
        
//         {/* Abstract Background Elements */}
//         <div className="abstract-bg">
//           <div className="shape shape-circle w-[40rem] h-[40rem] -top-48 -left-48" />
//           <div className="shape shape-circle w-[30rem] h-[30rem] top-[60%] -right-24 bg-primary" />
//           <div className="shape shape-bracket top-[20%] right-[5%]">{ "{" }</div>
//           <div className="shape shape-bracket bottom-[20%] left-[5%]">{ "}" }</div>
//         </div>

//         <main className="flex-grow">
//           <AppRoutes />
//         </main>
        
//         <Footer />
//       </div>
//     </Router>
//   );
// }
import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';

import { AnimatePresence } from 'motion/react';

// Lazy load pages
const ServicesPage = lazy(() => import('./pages/ServicesPage.tsx'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage.tsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.tsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.tsx'));

function AppRoutes() {
  const location = useLocation();

  // Hide Navbar & Footer on admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-accent/30">
      
      {/* Show Navbar only if NOT admin */}
      {!isAdminPage && <Navbar />}

      {/* Background only for frontend pages */}
      {!isAdminPage && (
        <div className="abstract-bg">
          <div className="shape shape-circle w-[40rem] h-[40rem] -top-48 -left-48" />
          <div className="shape shape-circle w-[30rem] h-[30rem] top-[60%] -right-24 bg-primary" />
          <div className="shape shape-bracket top-[20%] right-[5%]">
            {"{"}
          </div>
          <div className="shape shape-bracket bottom-[20%] left-[5%]">
            {"}"}
          </div>
        </div>
      )}

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Suspense
            fallback={
              <div className="h-screen w-full flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-accent rounded-full animate-spin" />
              </div>
            }
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Admin Route */}
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      {/* Show Footer only if NOT admin */}
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
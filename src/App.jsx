import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { Fragment } from 'react';
import ScrollToTopButton from './components/ScrollToTopButton';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FloatingContact from "./components/FloatingContact";

function App() {
  return (
    <CartProvider>
      <Router basename="/">
        <div className="app">
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route 
                  key={route.path}
                  path={route.path} 
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  } 
                />
              );
            })}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <ScrollToTopButton />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            limit={3}
            style={{ zIndex: 9999 }}
          />
          <FloatingContact />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

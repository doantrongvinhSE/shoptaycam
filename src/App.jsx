import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { Fragment } from 'react';
import ScrollToTopButton from './components/ScrollToTopButton';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CartProvider>
      <Router>
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
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

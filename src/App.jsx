import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/client/HomePage'
import NotFoundPage from './pages/client/NotFoundPage/NotFoundPage'
import ProductDetailsPage from './pages/client/ProductDetailsPage/ProductDetailsPage'


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Thêm các routes khác ở đây */}

          <Route path="/san-pham" element={<ProductDetailsPage />} />


          {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

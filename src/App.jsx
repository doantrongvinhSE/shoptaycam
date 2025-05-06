import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Thêm các routes khác ở đây */}
        </Routes>
      </div>
    </Router>
  )
}

export default App

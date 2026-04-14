import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Result from './pages/Result'
import Gallery from './pages/Gallery'

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card-brutal p-12 max-w-xl text-center bg-[#f9a8d4]"
      >
        <h1 className="text-4xl font-black mb-6 uppercase">关于</h1>
        <p className="text-lg font-medium mb-8">
          全场景防PUA体质测试 - PUAX图鉴
        </p>
        <Link to="/" className="btn-brutal bg-white inline-flex items-center gap-2">
          返回首页
        </Link>
      </motion.div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen p-4 md:p-8 font-brutal flex flex-col items-center">
        <nav className="card-brutal mb-8 p-4 bg-white flex justify-between items-center w-full max-w-screen-xl mx-auto">
          <div className="font-black text-2xl tracking-tighter uppercase">PUAX图鉴</div>
          <div className="flex gap-4 font-bold">
            <Link to="/" className="hover:underline decoration-4 underline-offset-4">首页</Link>
            <Link to="/gallery" className="hover:underline decoration-4 underline-offset-4">全图鉴</Link>
          </div>
        </nav>
        
        <main className="w-full flex flex-col items-center flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/result" element={<Result />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

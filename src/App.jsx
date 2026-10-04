import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import BlogsPage from './components/BlogsPage'
import AboutPage from './components/AboutPage'
import LoginPage from './components/LoginPage'
import CreateBlogPage from './components/CreateBlogPage'
import CreateAccountPage from './components/createaccount'
import { createContext } from 'react'
import { useState } from 'react'

export const UserContext = createContext()

function App() {
  const [role, setRole] = useState(null)
  return (
    <UserContext.Provider value={{ role, setRole }}>
      <BrowserRouter>
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased">
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              <Route path="/create-blog" element={<CreateBlogPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App

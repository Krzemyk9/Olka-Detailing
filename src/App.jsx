import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/ui/Header.jsx";
import Footer from "./components/ui/Footer.jsx";
import Home from './pages/Home.jsx'
import Pricing from './pages/Pricing.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Contact from './pages/Contact.jsx'

function Layout() {
  return (
    <div className="flex min-h-svh flex-col bg-[#0a0a0a] text-[#f5f5f5]">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cennik" element={<Pricing />} />
          <Route path="/realizacje" element={<Portfolio />} />
          <Route path="/kontakt" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

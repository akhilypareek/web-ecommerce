import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './Header';
import AllProducts from '../Products/AllProducts';
import SingleProduct from '../Products/SingleProduct';
import Cart from '../Products/Cart';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className=" px-6" role="main">
        <Routes>
          <Route path="/" element={<AllProducts isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default Layout;
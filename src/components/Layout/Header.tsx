import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext.js';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const { cartCount, cartTotal } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md px-6 py-4 shadow-sm" role="banner">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 text-sm text-gray-700">

        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            My Shop
          </Link>
        </div>

        <nav>
          <Link
            to="/cart"
            className="rounded-2xl bg-gray-100 px-4 py-2 text-gray-800 shadow-sm hover:bg-gray-200 transition-colors"
          >
            {cartCount} item{cartCount !== 1 ? 's' : ''} • ${cartTotal.toFixed(2)}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

// import { Menu, X } from 'lucide-react';
// import { useCart } from '../../context/CartContext.js';

// function Header({ isSidebarOpen, toggleSidebar }:any) {
//   const { cartCount, cartTotal }:any = useCart();

//   return (
//     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md px-6 py-4 shadow-sm" role="banner">
//       <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 text-sm text-gray-700">
//         <div className="flex items-center gap-4">
//           {/* Burger Menu Button - Only visible on mobile */}
//           <button
//             onClick={toggleSidebar}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
//           >
//             {isSidebarOpen ? (
//               <X size={20} aria-hidden="true" />
//             ) : (
//               <Menu size={20} aria-hidden="true" />
//             )}
//           </button>

//           <Link to="/" className="font-semibold text-gray-800 hover:text-blue-600 transition-colors" aria-label="Go to home page">
//             My Shop
//           </Link>
//         </div>

//         <nav aria-label="Main navigation">
//           <Link
//             to="/cart"
//             className="rounded-2xl bg-gray-100 px-4 py-2 text-gray-800 shadow-sm hover:bg-gray-200 transition-colors cursor-pointer"
//             aria-label={`Shopping cart with ${cartCount} items totaling $${cartTotal.toFixed(2)}`}
//           >
//             {cartCount} item{cartCount !== 1 ? 's' : ''} • ${cartTotal.toFixed(2)}
//           </Link>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Header;
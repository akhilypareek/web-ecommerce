import Layout from './components/Layout/Layout.tsx'
import { CartProvider } from './context/CartContext.tsx'

function App() {
  return (
    <CartProvider>
      <Layout />
    </CartProvider>
  )
}

export default App

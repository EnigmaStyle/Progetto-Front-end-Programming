import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CookieConsent from './components/CookieConsent.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ProductManagement from './pages/admin/ProductManagement.jsx';
import OrderManagement from './pages/admin/OrderManagement.jsx';
import CustomerManagement from './pages/admin/CustomerManagement.jsx';
import ContactPage from './pages/customer-service/ContactPage.jsx';
import FAQPage from './pages/customer-service/FAQPage.jsx';
import ShippingPage from './pages/customer-service/ShippingPage.jsx';
import ReturnPolicyPage from './pages/customer-service/ReturnPolicyPage.jsx';
import PrivacyPolicyPage from './pages/customer-service/PrivacyPolicyPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { CategoryProvider } from './context/CategoryContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CategoryProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/order-confirmation/:orderId" element={
                    <ProtectedRoute>
                      <OrderConfirmationPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/products" element={
                    <ProtectedRoute requireAdmin={true}>
                      <ProductManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/orders" element={
                    <ProtectedRoute requireAdmin={true}>
                      <OrderManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/customers" element={
                    <ProtectedRoute requireAdmin={true}>
                      <CustomerManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/contatti" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/spedizioni" element={<ShippingPage />} />
                  <Route path="/resi" element={<ReturnPolicyPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                </Routes>
              </main>
              <Footer />
              <CookieConsent />
            </div>
          </CartProvider>
        </CategoryProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
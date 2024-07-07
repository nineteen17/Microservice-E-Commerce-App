import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "@/layouts/MainLayout";
import FullLayout from "@/layouts/FullLayout";

import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { cn } from "@/lib/utils";

const Home = React.lazy(() => import("@/features/home/pages/Home"));
const ProductId = React.lazy(
  () => import("@/features/product/pages/ProductIdPage")
);
const Products = React.lazy(
  () => import("@/features/product/pages/ProductsPage")
);
const Cart = React.lazy(() => import("@/features/cart/pages/CartPage"));
const Register = React.lazy(() => import("@/features/auth/pages/RegisterPage"));
const Login = React.lazy(() => import("@/features/auth/pages/LoginPage"));
const Watchlist = React.lazy(() => import("@/features/user/pages/Watchlist"));
const Profile = React.lazy(() => import("@/features/user/pages/Profile"));
const Checkout = React.lazy(
  () => import("@/features/checkout/pages/CheckoutPage")
);
const Success = React.lazy(
  () => import("@/features/checkout/pages/SuccessPage")
);
const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner className={cn("text-blue-500")} />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/id" element={<ProductId />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="watchlist"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<FullLayout />}>
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkout/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

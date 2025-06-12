import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import BucketPage from "./pages/BucketPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/catalog" element={<ProductPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/bucket" element={<BucketPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

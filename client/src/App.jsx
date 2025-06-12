import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import BucketPage from "./pages/BucketPage";
import Header from "./layout/Header";
import useCanvasCursor from "./components/TrailingCursor/TrailingCursor";
import Footer from "./layout/Footer";

function App() {
  useCanvasCursor();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/catalog" element={<ProductPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/bucket" element={<BucketPage />} />
      </Routes>
      <canvas
        id="canvas"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

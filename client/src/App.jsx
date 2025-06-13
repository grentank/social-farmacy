import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import BucketPage from "./pages/BucketPage";
import Header from "./layout/Header";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);
  return (
    <BrowserRouter>
       <Header />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/catalog" element={<ProductPage />} />
        <Route path="/login" element={<AuthPage setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />
        <Route path="/register" element={<AuthPage setCurrentUser={setCurrentUser} currentUser={currentUser} />} />
        <Route path="/bucket" element={<BucketPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

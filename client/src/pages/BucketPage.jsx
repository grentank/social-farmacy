import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BucketPage.css';
import { Link } from "react-router-dom";
import { BucketApi } from "../services/BucketApi";

const BucketPage = ({currentUser}) => {
  const [bucketItems, setBucketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserId = currentUser.id; //!

  useEffect(() => {
    const fetchBucket = async () => {
      try {
        const data = await BucketApi.getUserBucket(currentUserId);
        setBucketItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки корзины:", err);
        setError("Не удалось загрузить корзину");
        setLoading(false);
      }
    };
    
    fetchBucket();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await BucketApi.delete(itemId);
      setBucketItems(bucketItems.filter(item => item.id !== itemId));
    } catch (err) {
      console.error("Ошибка удаления товара:", err);
      alert("Не удалось удалить товар из корзины");
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("Вы действительно хотите очистить корзину?")) return;
    
    try {
      await BucketApi.deleteAll(currentUserId);
      setBucketItems([]);
    } catch (err) {
      console.error("Ошибка очистки корзины:", err);
      alert("Не удалось очистить корзину");
    }
  };

  const handleCheckout = async () => {
    if (bucketItems.length === 0) {
      alert("Корзина пуста!");
      return;
    }
    
    try {
      // В вашем API нет метода оформления заказа, 
      // поэтому просто очищаем корзину после подтверждения
      await BucketApi.deleteAll(currentUserId);
      setBucketItems([]);
      alert(`Заказ на сумму ${totalPrice.toLocaleString()} руб. успешно оформлен!`);
    } catch (err) {
      console.error("Ошибка оформления заказа:", err);
      alert("Не удалось оформить заказ");
    }
  };

  const totalPrice = bucketItems.reduce(
    (sum, item) => sum + (item.Product.price * item.quantity), 
    0
  );

  if (loading) {
    return (
      <div className="bucket-container">
        <div className="text-center p-5">
          <h2>Загрузка корзины...</h2>
          <div className="spinner-border text-primary mt-3" role="status"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bucket-container">
        <div className="alert alert-danger text-center">
          <h2>{error}</h2>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            Повторить попытку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bucket-container">
      <h1 className="text-center mb-4">Корзина заказов</h1>
      
      {bucketItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Ваша корзина пуста</h2>
          <p className="text-muted mb-3">Добавьте товары, чтобы сделать заказ</p>
          <Link to="/catalog" className="btn btn-primary">
            Вернуться к покупкам
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="mb-4">Товары в корзине ({bucketItems.length})</h2>
          
          <div className="product-list">
            {bucketItems.map(item => (
              <div key={item.id} className="product-card">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3>{item.Product.name}</h3>
                    <p className="text-muted">{item.Product.description}</p>
                    <p className="price-highlight">
                      Цена: {item.Product.price.toLocaleString()} руб.
                    </p>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <p className="mb-2">
                      Количество: {item.quantity}
                    </p>
                    <p className="mb-2 fw-bold">
                      Сумма: {(item.Product.price * item.quantity).toLocaleString()} руб.
                    </p>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="total-section">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <h3 className="mb-3 mb-md-0">
                Итого: <span className="text-primary">{totalPrice.toLocaleString()}</span> руб.
              </h3>
              <div className="d-flex action-buttons">
                <button 
                  className="btn btn-lg btn-outline-secondary"
                  onClick={handleClearCart}
                >
                  Очистить корзину
                </button>
                <button 
                  className="btn btn-lg btn-success"
                  onClick={handleCheckout}
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BucketPage;
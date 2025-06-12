import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Правильный импорт Bootstrap
import './BucketPage.css'; // Наши кастомные стили

const BucketPage = () => {
  const initialItems = [
    {
      id: 1,
      Product: {
        id: 101,
        name: "Лекарство",
        price: 45000,
        description: "Высокоэффективное средство для лечения"
      }
    },
    {
      id: 2,
      Product: {
        id: 102,
        name: "Костыли",
        price: 21000,
        description: "Алюминиевые регулируемые костыли"
      }
    },
    {
      id: 3,
      Product: {
        id: 103,
        name: "Успокоительное",
        price: 1,
        description: "Седатив"
      }
    }
  ];

  const [bucketItems, setBucketItems] = useState(initialItems);
  
  const totalPrice = bucketItems.reduce(
    (sum, item) => sum + item.Product.price, 
    0
  );

  const handleRemoveItem = (id) => {
    setBucketItems(bucketItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    if (window.confirm("Вы действительно хотите очистить корзину?")) {
      setBucketItems([]);
    }
  };

  const handleCheckout = () => {
    alert(`Заказ на сумму ${totalPrice.toLocaleString()} руб. успешно оформлен!`);
    setBucketItems([]);
  };

  return (
    <div className="bucket-container">
      <h1 className="text-center mb-4">Корзина заказов</h1>
      
      {bucketItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Ваша корзина пуста</h2>
          <p className="text-muted mb-3">Добавьте товары, чтобы сделать заказ</p>
          <button className="btn btn-primary">Вернуться к покупкам</button>
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
                  <button 
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Удалить
                  </button>
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
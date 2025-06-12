import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BucketPage.css';

const BucketPage = () => {
  const initialItems = [
    {
      id: 1,
      Product: {
        id: 101,
        name: "Лекарство",
        price: 45000,
        description: "Высокоэффективное средство для лечения"
      },
      quantity: 1
    },
    {
      id: 2,
      Product: {
        id: 102,
        name: "Костыли",
        price: 21000,
        description: "Алюминиевые регулируемые костыли"
      },
      quantity: 1
    },
    {
      id: 3,
      Product: {
        id: 103,
        name: "Успокоительное",
        price: 1,
        description: "Седативное"
      },
      quantity: 1
    }
  ];

  const [bucketItems, setBucketItems] = useState(initialItems);
  
  const totalPrice = bucketItems.reduce(
    (sum, item) => sum + (item.Product.price * item.quantity), 
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

  // Увеличить количество товара
  const increaseQuantity = (id) => {
    setBucketItems(bucketItems.map(item => 
      item.id === id ? {...item, quantity: item.quantity + 1} : item
    ));
  };

  // Уменьшить количество товара
  const decreaseQuantity = (id) => {
    setBucketItems(bucketItems.map(item => 
      item.id === id && item.quantity > 1 
        ? {...item, quantity: item.quantity - 1} 
        : item
    ));
  };

  // Обработчик изменения количества через инпут
  const handleQuantityChange = (id, value) => {
    const newQuantity = parseInt(value) || 1;
    setBucketItems(bucketItems.map(item => 
      item.id === id 
        ? {...item, quantity: newQuantity > 0 ? newQuantity : 1} 
        : item
    ));
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
                  <div className="d-flex flex-column align-items-end">
                    <div className="d-flex align-items-center mb-2">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="form-control mx-2 text-center"
                        style={{ width: '60px' }}
                      />
                      
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    
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
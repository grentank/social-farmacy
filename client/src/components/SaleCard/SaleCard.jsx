import React, { useState, useEffect } from 'react'
import { SaleApi } from '../../services/SaleApi'
import { ProductApi } from '../../services/ProductApi'

export default function SaleCard() {
  const [saleProducts, setSaleProducts] = useState([])

  useEffect(() => {
    const getSaleProducts = async () => {
      try {
        const sales = await SaleApi.getAll();
        const productIds = sales.map(sale => sale.product_id);
        const productPromises = productIds.map(id => ProductApi.getOne(id));
        const products = await Promise.all(productPromises);
        // Сопоставляем скидки с продуктами (если есть oldPrice/newPrice)
        const saleProductsWithDiscount = products.map((product, idx) => ({
          ...product,
          ...sales[idx] // если в скидке есть цена, даты и т.д.
        }));
        setSaleProducts(saleProductsWithDiscount);
      } catch (error) {
        console.log(error);
      }
    };
    getSaleProducts();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      margin: '30px 0'
    }}>
      {saleProducts.length === 0 && <div>Загрузка...</div>}
      {saleProducts.map((product) => (
        <div
          key={product.id}
          style={{
            width: 260,
            background: 'linear-gradient(135deg, #ff5858 0%, #f09819 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 20px rgba(255,88,88,0.18)',
            color: '#fff',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.035)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,88,88,0.30)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,88,88,0.18)';
          }}
        >
          {/* Бейдж скидки */}
          <div style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: '#fff',
            color: '#ff5858',
            borderRadius: '7px',
            padding: '4px 12px',
            fontWeight: 700,
            fontSize: 14,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            СКИДКА
          </div>
          <img
            src={product.image || 'https://via.placeholder.com/180x120?text=No+Image'}
            alt={product.name}
            style={{
              width: '180px',
              height: '120px',
              objectFit: 'cover',
              borderRadius: 10,
              marginBottom: 16,
              border: '2px solid #fff',
              boxShadow: '0 2px 12px rgba(255,152,25,0.12)'
            }}
          />
          <h3 style={{ margin: '0 0 8px 0', fontSize: 22, fontWeight: 700 }}>{product.name}</h3>
          <p style={{ fontSize: 15, color: '#fff', margin: 0, marginBottom: 16, minHeight: 48 }}>{product.description}</p>
          {/* Цена (пример, если есть oldPrice/newPrice) */}
          <div style={{ marginTop: 'auto', fontSize: 18, fontWeight: 700 }}>
            {product.oldPrice && (
              <span style={{ color: '#fff7', textDecoration: 'line-through', marginRight: 12 }}>
                {product.oldPrice} ₽
              </span>
            )}
            <span style={{ color: '#fff', fontSize: 22 }}>
              {product.price ? product.price + ' ₽' : ''}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
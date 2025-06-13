import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { ProductApi } from "../../services/ProductApi";
import { SaleApi } from "../../services/SaleApi";
import { BucketApi } from "../../services/BucketApi";

export default function ProductsAndSales() {
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const currentUserId = 1; // В реальном приложении брать из контекста/авторизации

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await ProductApi.getAll();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getSaleProducts = async () => {
      try {
        const sales = await SaleApi.getAll();
        const productIds = sales.map(sale => sale.product_id);
        const productPromises = productIds.map(id => ProductApi.getOne(id));
        const productsData = await Promise.all(productPromises);
        
        // ИСПРАВЛЕНИЕ: Сохраняем оригинальный id продукта
        const saleProductsWithDiscount = productsData.map((product, idx) => ({
          ...product,
          saleData: { ...sales[idx] }  // Данные распродажи в отдельном поле
        }));
        
        setSaleProducts(saleProductsWithDiscount);
      } catch (error) {
        console.log(error);
      }
    };
    getSaleProducts();
  }, []);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = async (productId) => {
    try {
      await BucketApi.addItem({
        userId: currentUserId,
        productId
      });
      alert("Товар добавлен в корзину!");
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
      alert("Не удалось добавить товар в корзину");
    }
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '32px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px',
    background: 'linear-gradient(100deg,#f5fffb 0%,#e4fcfd 100%)',
    minHeight: 'calc(100vh - 120px)'
  };

  const cardStyle = {
    width: '20rem',
    minHeight: '420px',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
    border: 'none',
    transition: 'transform 0.18s, box-shadow 0.18s',
    background: '#fff',
    position: 'relative',
    overflow: 'hidden'
  };

  const cardHoverStyle = {
    transform: 'translateY(-8px) scale(1.025)',
    boxShadow: '0 20px 36px 0 rgba(31, 38, 135, 0.18)'
  };

  const imageStyle = {
    height: '210px',
    objectFit: 'cover',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    borderBottom: '2px solid #e9faf9'
  };

  const saleCardStyle = {
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
    marginBottom: 20
  };

  const saleImageStyle = {
    width: '180px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: 10,
    marginBottom: 16,
    border: '2px solid #fff',
    boxShadow: '0 2px 12px rgba(255,152,25,0.12)'
  };

  // Исключаем товары, которые участвуют в акции, из общего списка
  const saleProductIds = new Set(saleProducts.map(p => p.id));
  const filteredProducts = products.filter(p => !saleProductIds.has(p.id));

  // Универсальные функции для получения картинки и описания
  const getProductImage = (product, size = '350x210') =>
    product.img || product.image || `https://via.placeholder.com/${size}?text=No+Image`;

  const getProductTitle = (product) =>
    product.title || product.description || "Без описания";

  const getProductDescription = (product) =>
    product.description || product.title || <span style={{ color: "#b1bfc7" }}>Подробное описание отсутствует.</span>;

  return (
    <>

      <h2 style={{
        marginTop: 16,
        marginBottom: 8,
        fontWeight: 800,
        color: "#ff5858",
        letterSpacing: 1,
        textAlign: "center"
      }}>
        Горячие предложения
      </h2>
      <div style={{
        ...containerStyle,
        background: "none",
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 18
      }}>
        {saleProducts.length === 0 && <div>Нет горячих предложений</div>}
        {saleProducts.map(product => (
          <div
            key={product.id}
            style={saleCardStyle}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.035)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,88,88,0.30)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,88,88,0.18)';
            }}
          >
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
              HOT
            </div>
            <img
              src={getProductImage(product, '180x120')}
              alt={product.name}
              style={saleImageStyle}
            />
            <h3 style={{ margin: '0 0 8px 0', fontSize: 22, fontWeight: 700 }}>{product.name}</h3>
            <p style={{ fontSize: 15, color: '#fff', margin: 0, marginBottom: 16, minHeight: 48 }}>
              {getProductTitle(product)}
            </p>
            <Button
              variant="light"
              style={{
                color: "#ff5858",
                fontWeight: 700,
                marginTop: 14,
                borderRadius: 10
              }}
              // ИСПРАВЛЕНИЕ: Передаем корректный ID продукта
              onClick={() => handleAddToCart(product.id)}
            >
              В корзину
            </Button>
            <Button
              variant="outline-light"
              style={{
                color: "#fff",
                borderColor: "#fff",
                fontWeight: 500,
                marginTop: 8,
                borderRadius: 10
              }}
              onClick={() => handleShowModal(product)}
            >
              Подробнее
            </Button>
          </div>
        ))}
      </div>

      {/* Все товары */}
      <h2 style={{
        marginTop: 0,
        marginBottom: 8,
        fontWeight: 800,
        color: "#11664a",
        letterSpacing: 1,
        textAlign: "center"
      }}>
        Все товары
      </h2>
      <div style={containerStyle}>
        {filteredProducts.length === 0 && <div>Нет товаров</div>}
        {filteredProducts.map((el) => (
          <Card
            key={el.id}
            style={{
              ...cardStyle,
              ...(hovered === el.id ? cardHoverStyle : {})
            }}
            onMouseEnter={() => setHovered(el.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <Card.Img variant="top" src={getProductImage(el)} style={imageStyle} alt={el.name} />
            <Card.Body>
              <Card.Title style={{ fontWeight: 700, fontSize: "1.1rem", color: "#11664a" }}>
                {el.name}
                {el.stock < 5 && (
                  <Badge bg="warning" text="dark" style={{ marginLeft: 10, fontWeight: 500 }}>
                    Мало
                  </Badge>
                )}
              </Card.Title>
              <Card.Text style={{ color: "#7a8997", fontSize: "0.97rem", minHeight: 46 }}>
                {getProductTitle(el)}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{ fontSize: '1rem', color: '#11664a', background: "#f9fdff", border: 'none', fontWeight: 600 }}>
                Цена: <span style={{ color: "#09a96c" }}>{el.price} </span>
              </ListGroup.Item>
              <ListGroup.Item style={{ fontSize: '0.93rem', color: '#6c757d', background: "#f9fdff", border: 'none' }}>В наличии: {el.stock} шт</ListGroup.Item>
            </ListGroup>
            <Card.Body className="d-flex justify-content-between" style={{ gap: 8 }}>
              <Button
                variant="success"
                style={{
                  flex: 1,
                  fontWeight: 600,
                  borderRadius: 12,
                  borderWidth: 2,
                  boxShadow: "0 2px 8px #eafff2",
                  transition: "background .16s"
                }}
                onClick={() => handleAddToCart(el.id)}
              >
                В корзину
              </Button>
              <Button
                variant="outline-info"
                style={{
                  flex: 1,
                  fontWeight: 500,
                  borderRadius: 12,
                  borderWidth: 2
                }}
                onClick={() => handleShowModal(el)}
              >
                Подробнее
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        style={{ backdropFilter: "blur(3px)" }}
      >
        {selectedProduct && (
          <>
            <Modal.Header closeButton style={{ background: "#f6fffb" }}>
              <Modal.Title style={{ fontWeight: 700, color: "#10b26a" }}>
                {selectedProduct.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#fafefd" }}>
              <div style={{
                display: "flex",
                gap: 32,
                flexWrap: "wrap",
                alignItems: "flex-start"
              }}>
                <img
                  src={getProductImage(selectedProduct, '260x260')}
                  alt={selectedProduct.name}
                  style={{
                    width: 260,
                    height: 260,
                    objectFit: "cover",
                    borderRadius: 18,
                    flexShrink: 0,
                    boxShadow: "0 4px 24px #d2fbe6"
                  }}
                />
                <div style={{ flex: 1, minWidth: 220 }}>
                  <h5 style={{
                    fontWeight: 500,
                    marginBottom: 12,
                    color: "#11664a"
                  }}>
                    {getProductTitle(selectedProduct)}
                  </h5>
                  <p style={{ color: "#5c6f7c", minHeight: 60 }}>
                    {getProductDescription(selectedProduct)}
                  </p>
                  <ListGroup className="mb-3">
                    <ListGroup.Item style={{ fontSize: '1rem', color: '#11664a', background: "#f9fdff", border: 'none', fontWeight: 600 }}>
                      Цена: <span style={{ color: "#09a96c" }}>{selectedProduct.price} </span>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontSize: '0.93rem', color: '#6c757d', background: "#f9fdff", border: 'none' }}>
                      В наличии: {selectedProduct.stock} шт
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      style={{ fontWeight: 600, borderRadius: 12 }}
                      onClick={() => handleAddToCart(selectedProduct.id)}
                    >
                      В корзину
                    </Button>
                    <Button variant="outline-secondary" style={{ borderRadius: 12 }} onClick={handleCloseModal}>
                      Закрыть
                    </Button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
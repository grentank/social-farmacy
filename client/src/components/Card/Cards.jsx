import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { ProductApi } from "../../services/ProductApi";
import { BucketApi } from "../../services/BucketApi";

export default function Cards() {
  const [products, setProducts] = useState([]);
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

  const handleAddToCart = async (productId) => {
    try {
      await BucketApi.addItem({ 
        userId: currentUserId, 
        productId 
      });
      alert(`Товар добавлен в корзину!`);
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

  const priceStyle = {
    fontWeight: 'bold',
    color: '#10b26a',
    fontSize: '1.1rem',
    background: "#f2fffa",
    border: 'none'
  };

  const stockStyle = {
    fontSize: '0.93rem',
    color: '#6c757d',
    background: "#f9fdff",
    border: 'none'
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div style={containerStyle}>
        {products.map((el) => (
          <Card
            key={el.id}
            style={{
              ...cardStyle,
              ...(hovered === el.id ? cardHoverStyle : {})
            }}
            onMouseEnter={() => setHovered(el.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <Card.Img variant="top" src={el.img} style={imageStyle} alt={el.name} />
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
                {el.title}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={priceStyle}>{el.price} ₽</ListGroup.Item>
              <ListGroup.Item style={stockStyle}>В наличии: {el.stock} шт</ListGroup.Item>
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
                  src={selectedProduct.img}
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
                    {selectedProduct.title}
                  </h5>
                  <p style={{ color: "#5c6f7c", minHeight: 60 }}>
                    {selectedProduct.description || <span style={{ color: "#b1bfc7" }}>Подробное описание отсутствует.</span>}
                  </p>
                  <ListGroup className="mb-3">
                    <ListGroup.Item style={priceStyle}>Цена: {selectedProduct.price} ₽</ListGroup.Item>
                    <ListGroup.Item style={stockStyle}>В наличии: {selectedProduct.stock} шт</ListGroup.Item>
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
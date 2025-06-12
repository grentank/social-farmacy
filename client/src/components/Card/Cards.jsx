import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import { ProductApi } from "../../services/ProductApi";
import { BucketApi } from "../../services/BucketApi";

export default function Cards() {
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '32px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px',
    background: '#f5f7fa'
  };

  const cardStyle = {
    width: '20rem',
    minHeight: '420px',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.14)',
    border: 'none',
    transition: 'transform 0.18s, box-shadow 0.18s',
    background: '#fff'
  };

  const cardHoverStyle = {
    transform: 'translateY(-8px) scale(1.025)',
    boxShadow: '0 16px 32px 0 rgba(31, 38, 135, 0.16)'
  };

  const imageStyle = {
    height: '210px',
    objectFit: 'cover',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px'
  };

  const priceStyle = {
    fontWeight: 'bold',
    color: '#28a745',
    fontSize: '1.1rem'
  };

  const stockStyle = {
    fontSize: '0.93rem',
    color: '#6c757d'
  };

  // Открыть модалку с выбранным товаром
  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Закрыть модалку
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
              <Card.Title style={{ fontWeight: 600, fontSize: "1.1rem" }}>{el.name}</Card.Title>
              <Card.Text style={{ color: "#888", fontSize: "0.98rem", minHeight: 46 }}>
                {el.title}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={priceStyle}>{el.price} ₽</ListGroup.Item>
              <ListGroup.Item style={stockStyle}>В наличии: {el.stock} шт</ListGroup.Item>
            </ListGroup>
            <Card.Body className="d-flex justify-content-between" style={{gap: 8}}>
              <Button variant="success" style={{ flex: 1 }} onClick={(e)=>{BucketApi.addItem({userId:1,productId:el.id})}}>В корзину</Button>
              <Button 
                variant="outline-info" 
                style={{ flex: 1 }} 
                onClick={() => handleShowModal(el)}
              >Подробнее</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Модальное окно с подробным описанием */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start"}}>
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.name}
                  style={{width: 260, height: 260, objectFit: "cover", borderRadius: 16, flexShrink: 0}}
                />
                <div style={{flex: 1}}>
                  <h5 style={{fontWeight: 500, marginBottom: 8}}>{selectedProduct.title}</h5>
                  <p style={{color: "#666"}}>{selectedProduct.description || "Подробное описание отсутствует."}</p>
                  <ListGroup className="mb-3">
                    <ListGroup.Item style={priceStyle}>Цена: {selectedProduct.price} ₽</ListGroup.Item>
                    <ListGroup.Item style={stockStyle}>В наличии: {selectedProduct.stock} шт</ListGroup.Item>
                  </ListGroup>
                  <div className="d-flex gap-2">
                    <Button variant="success" >В корзину</Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>Закрыть</Button>
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
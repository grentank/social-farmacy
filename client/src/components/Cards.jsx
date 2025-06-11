import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ProductApi } from "../services/ProductApi";
import Button from 'react-bootstrap/Button';

import ListGroup from 'react-bootstrap/ListGroup';


export default function Cards() {
  const [products, setProducts] = useState([]);
  console.log("🚀 ~ Cards ~ products:", products)

  const containerStyle = {
 display: 'flex',
  flexWrap: 'wrap',
  gap: '24px',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '24px'
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const  data  = await ProductApi.getAll();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div style={containerStyle}>
      {products.map((el) => (

        <div key={el.id}>
        <br/>
             <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={el.img} />
      <Card.Body>
        <Card.Title>{el.name}</Card.Title>
        <Card.Text>
        {el.title}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{el.price} p</ListGroup.Item>
        <ListGroup.Item>{el.stock} шт</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#"><Button variant="success">Добавить в корзину</Button></Card.Link>
      </Card.Body>
            <Card.Body>
        <Card.Link href="#"><Button variant="info">Подробнее</Button></Card.Link>
      </Card.Body>
      
    </Card>
        <br/>
        </div>
      ))}
    </div>
  );
}

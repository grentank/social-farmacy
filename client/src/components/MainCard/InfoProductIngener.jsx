import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import './InfoRazrab.css';


import razrab1 from '../../public/1.jpg';
import razrab2 from '../../public/2.jpg';
import razrab3 from '../../public/3.jpg';
import razrab4 from '../../public/4.jpg';

export default function InfoProductIngener() {
  return (
    <div className="developers-block">
      <h2>Наша команда разработчиков</h2>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <div className="developer-card">
              <Image src={razrab1} roundedCircle className="developer-image" />
              <span className="developer-name">Вадим Тимлид Вильгельм</span>
              <span className="developer-email">vadim@lead@mail.com</span>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="developer-card">
              <Image src={razrab2} roundedCircle className="developer-image" />
              <span className="developer-name">Вова PRO-React Квашнин</span>
              <span className="developer-email">vova@react@mail.com</span>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="developer-card">
              <Image src={razrab3} roundedCircle className="developer-image" />
              <span className="developer-name">Саня ExpresTurbo</span>
              <span className="developer-email">sasha@turbo@mail.com</span>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="developer-card">
              <Image src={razrab4} roundedCircle className="developer-image" />
              <span className="developer-name">Леха aliEXPRESS Алимкин</span>
              <span className="developer-email">alex@express@mail.com</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import './FeedbackCard.css';

import otziv1 from '../../public/vadim.jpg';


export default function InfoProductIngener() {
  return (
 <>
  <div>ОГЛАВЛЕНИЕ</div>
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src={otziv1} rounded />
        </Col>
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" roundedCircle />
        </Col>
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" thumbnail />
        </Col>
      </Row>
    </Container>
    </>
  );
}


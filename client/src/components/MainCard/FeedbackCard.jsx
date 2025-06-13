import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './FeedbackCard.css';

import otziv1 from '../../public/vadim.jpg';
import otziv2 from '../../public/alena.jpg';
import otziv3 from '../../public/alesha.jpg';
import otziv4 from '../../public/alexander.jpg';
import otziv5 from '../../public/denis.jpg';
import otziv6 from '../../public/ivan.jpg';

export default function FeedbackCard() {

  // Исходные данные с лайками
  const initialFeedbacks = {
    var1: [
      { img: otziv1, title: "Вадим Тимлид Вильгельм", text: "Один из лучших сервисов в мире", likes: 64 },
      { img: otziv2, title: "Алена", text: "После феназепама сидела неделю в подвале", likes: 1000001 },
      { img: otziv3, title: "Юрий", text: "После двух таблеток работаю за троих", likes: 2 }
    ],
    var2: [
      { img: otziv4, title: "Александр Компас Колчин", text: "купил таблетки, надеюсь через месяц уже смогу ходить", likes: 10 },
      { img: otziv5, title: "Денис Интересный", text: "Огурчики должны поспеть вовремя", likes: 20 },
      { img: otziv6, title: "Иван-Дизель Крестоношин", text: "Покупаю всей семье, рекомендую", likes: 30 }
    ]
  };

  const [feedbackType, setFeedbackType] = useState("var1");
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);


  const changeValueLike = (type, index) => {
    setFeedbacks(prev => {
      const updated = {...prev};
      updated[type][index].likes += 1; // ПОЧЕМУ???????
      return updated;
    });
  };

  return (
    <>
    <div className="feedback-container">
      <h3 className="feedback-title">Отзывы</h3>
      <div className="feedback-buttons">
        <Button variant="outline-primary" onClick={() => setFeedbackType("var1")}>
          ⇄ Предыдущие ⇄
        </Button>
        <Button variant="outline-primary" onClick={() => setFeedbackType("var2")}>
          ⇄ Следующие ⇄
        </Button>
      </div>
      
      <div className="feedback-cards">
        {feedbacks[feedbackType].map((feedback, index) => (
          <Card key={index} className="feedback-card">
            <Card.Img variant="top" src={feedback.img} className="feedback-image"/>
            <Card.Body>
              <Card.Title>{feedback.title}</Card.Title>
              <Card.Text>{feedback.text}</Card.Text>
              <Button 
                variant="primary"
                onClick={() => changeValueLike(feedbackType, index)}
                className="feedback-like-button"
              >
                Нравится {feedback.likes} 🥒
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <span className="feedback-disclaimer">Все совпадения случайны!</span>
    </div>
    </>
  );
}
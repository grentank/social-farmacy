
import React from 'react';
import styles from './Licenze.module.css';

import lizenze1 from '../../public/sertifikate1.jpg';
import lizenze2 from '../../public/sertifikate2.jpg';
import lizenze3 from '../../public/lizenzia.jpg';

export default function Licenze() {
  const cardsData = [
    {
      id: 1,
      image: lizenze1,
      title: 'Сертификатов препаратов Heals Medics',
      description: 'Официальное разрешение дистрибьюцию продукции'
    },
    {
      id: 2,
      image: lizenze2,
      title: 'Сертификаты соответствия',
      description: 'Подтверждение качества всех лекарственных препаратов'
    },
    {
      id: 3,
      image: lizenze3,
      title: 'Лицензия на фармацевтическую деятельность',
      description: 'Соответствие всем требованиям законодательства'
    }
  ];

  return (
    <div className={styles.pharmacyCardsContainer}>
      <h2 className={styles.pharmacySectionTitle}>
        Лицензии и Сертификаты
        <span className={styles.titleUnderline}></span>
      </h2>
      
      <div className={styles.cardsRow}>
        {cardsData.map(card => (
          <div className={styles.pharmacyCard} key={card.id}>
            <div className={styles.imageContainer}>
              <img 
                src={card.image} 
                alt={card.title}
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
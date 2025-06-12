
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage1 from '../../public/countryFeature.jpg';
import ExampleCarouselImage2 from '../../public/Help.jpg'
import ExampleCarouselImage3 from '../../public/vite.svg'


export default function MainCard() {
  
  return (
    
      <>
      <h1> Росссия будущего. Уже сегодня! В месте с нами! ❤️ </h1>
      <div>
    <Carousel>
      <Carousel.Item>
              <img
              className="d-block w-100"
              src={ExampleCarouselImage1}
              alt="First slide"
            />
        <Carousel.Caption>
          <h3>Наша Миссия</h3>
          <p>«Лекарства должны быть доступны каждому» Мы верим, что здоровье — это не привилегия, а базовое право человека. Наша миссия — обеспечить всех нуждающихся качественными лекарствами по доступным ценам, особенно тех, кто находится в сложной жизненной ситуации:
</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
            <img
              className="d-block w-100"
              src={ExampleCarouselImage2}
              alt="First slide"
            />
        <Carousel.Caption>
          <h3>Наши принципы:</h3>
          <p>Доступность — льготные цены и специальные программы поддержки.
Честность — никаких скрытых наценок, только прозрачные условия.
Забота — индивидуальный подход к каждому посетителю.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
            <img
              className="d-block w-100"
              src={ExampleCarouselImage3}
              alt="First slide"
            />
        <Carousel.Caption>
          <h3>Наши достижения</h3>
          <p>Статистика: «В 2023 году мы помогли более 5 000 человек».
Привлекли к сотрудничеству более 100 волонтеров и спонсоров.
Вы можете увидеть реальные истории в отзывах.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      </div>
<div className="mission-block">
  <style jsx>{`
    .mission-block {
      max-width: 1400px;
      margin: 40px auto;
      padding: 30px;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.12);
      color: #5c6f7c;
      font-size: 1.05rem;
      line-height: 1.7;
      position: relative;
      border-left: 5px solid #10b26a;
      transition: all 0.3s ease;
      font-family: 'Arial', sans-serif;
    }

    .mission-block:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(31, 38, 135, 0.15);
    }

    .mission-block p {
      margin-bottom: 15px;
    }

    .mission-block p:first-child {
      color: #11664a;
      font-weight: 600;
      font-size: 1.2rem;
      margin-bottom: 20px;
    }

    .mission-block ul {
      padding-left: 30px;
      margin-bottom: 20px;
    }

    .mission-block li {
      position: relative;
      margin-bottom: 10px;
      list-style-type: none;
      padding-left: 25px;
    }

    .mission-block li:before {
      content: '•';
      color: #10b26a;
      font-weight: bold;
      font-size: 1.5rem;
      position: absolute;
      left: 0;
      top: -3px;
    }

    .mission-block p:nth-last-child(2) {
      font-weight: 700;
      color: #11664a;
      margin-top: 20px;
      font-size: 1.15rem;
    }

    @media (max-width: 768px) {
      .mission-block {
        padding: 20px 15px;
        margin: 30px 15px;
        font-size: 1rem;
      }
    
      .mission-block ul {
        padding-left: 20px;
      }
    
      .mission-block li {
        padding-left: 20px;
      }
    }
  `}</style>

  <p>Мы верим, что здоровье — это не привилегия, а базовое право человека. Наша миссия — обеспечить всех нуждающихся качественными лекарствами по доступным ценам, особенно тех, кто находится в сложной жизненной ситуации:</p>
  
  <ul>
    <li>Пожилых людей, чьи пенсии не покрывают стоимость жизненно важных препаратов.</li>
    <li>Инвалидов и людей с хроническими заболеваниями, которым лекарства нужны постоянно.</li>
    <li>Малоимущих семей, вынужденных выбирать между лечением и базовыми потребностями.</li>
    <li>Ветеранов, заслуживших право на заботу общества.</li>
  </ul>
  
  <p>Почему это важно?</p>
  
  <p>Каждый день к нам приходят люди, для которых наша аптека — последняя надежда получить необходимое лечение. Мы не просто продаем лекарства — мы спасаем жизни, облегчаем боль и возвращаем возможность жить полноценно.</p>
</div>
      </>
  )
}



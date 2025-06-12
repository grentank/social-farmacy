import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="pharmacy-footer">
      <div className="footer-main">
        <div className="footer-section">
          <h4>💊 Аптека «Здоровье++»</h4>
          <p>
            <span role="img" aria-label="location">📍</span>
            ул. Программистов, д. 42, офис 0x10, г. Кодоград
          </p>
          <p>
            <span role="img" aria-label="phone">📞</span>
            <a href="tel:+79991234567">+7 (999) 123-45-67</a>
          </p>
          <p>
            <span role="img" aria-label="email">✉️</span>
            <a href="mailto:support@pharmacy.dev">support@pharmacy.dev</a>
          </p>
        </div>
        <div className="footer-section">
          <h5>Навигация 🚀</h5>
          <ul>
            <li><a href="/main">🏠 Главная</a></li>
            <li><a href="/catalog">🧴 Каталог</a></li>
            <li><a href="/bucket">🛒 Корзина</a></li>
            <li><a href="/login">👤 Вход</a></li>
            <li><a href="/register">📝 Регистрация</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h5>Мы в соцсетях 💡</h5>
          <div className="footer-socials">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" />
            </a>
            <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте">
              <img src="https://cdn-icons-png.flaticon.com/512/145/145813.png" alt="VK" />
            </a>
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" alt="Telegram" />
            </a>
            <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <img src="https://cdn-icons-png.flaticon.com/512/3670/3670157.png" alt="Discord" />
            </a>
          </div>
          <div className="footer-joke">
            <span role="img" aria-label="joke">🤖</span> 
            Лечим баги и простуды!
          </div>
        </div>
      </div>
      <div className="footer-copy">
        <span>
          &copy; {new Date().getFullYear()} Аптека «Здоровье++». 
          <span className="footer-heart"> С любовью к коду и здоровью! 💚</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const location = useLocation();

  // Стили для NavLink
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#0d6efd" : "#222",
    fontWeight: isActive ? 600 : 500,
    textDecoration: "none",
    marginLeft: 80,
    fontSize: 17,
    padding: "4px 8px",
    borderRadius: 6,
    background: isActive ? "#e6f0ff" : "transparent",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
  });

  return (
    <Navbar bg="white" expand="md" className="mb-4 shadow-sm" style={{ minHeight: 64 }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/main" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
            alt="Аптека"
            style={{ height: 38, marginRight: 10, marginTop: -4 }}
          />
          <span style={{ fontWeight: 700, fontSize: 23, color: "#00995e" }}>
            Аптека
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto align-items-center">
            <NavLink to="/main" style={navLinkStyle}>
              Главная
            </NavLink>
            <NavLink to="/catalog" style={navLinkStyle}>
              Каталог
            </NavLink>
            <NavLink to="/bucket" style={navLinkStyle}>
              <FaShoppingCart style={{ marginRight: 7, fontSize: 17 }} />
              Корзина
            </NavLink>
          </Nav>
          <Nav className="ms-auto">
            <NavLink to="/login" style={navLinkStyle}>
              <Button variant={location.pathname === "/login" ? "primary" : "outline-primary"} size="sm">
                Вход
              </Button>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
import { Navbar, Nav, Button, Container, Badge } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart, FaCapsules, FaHeartbeat, FaCode } from "react-icons/fa";

export default function Header( {currentUser}) {
  const location = useLocation();

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#10b26a" : "#206259",
    fontWeight: isActive ? 700 : 500,
    textDecoration: "none",

    marginRight: 16,

    marginLeft: 80,

    fontSize: 17,
    padding: "6px 14px",
    borderRadius: 8,
    background: isActive ? "#e6fff5" : "transparent",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
    boxShadow: isActive ? "0 1px 8px 0 #10e37f21" : "none",
    letterSpacing: "0.2px",
  });

  return (
    <Navbar
      expand="md"
      className="mb-4 shadow-sm"
      style={{
        minHeight: 74,
        background: "linear-gradient(90deg, #f5fffa 0%, #e4f9ff 100%)",
        borderBottom: "3px solid #a7ffe5",
      }}
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/main"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 25,
            fontWeight: 700,
            color: "#10b26a",
            letterSpacing: "1px"
          }}
        >
          <img
            src="https://i.ibb.co/XfybV1tx/kit.jpg"
            alt="Аптека"
            style={{
              height: 58,
              marginRight: 10,
              marginTop: -2,
              borderRadius: 14,
              boxShadow: "0 2px 10px #8fffcf55"
            }}
          />
          <span>
            <FaCapsules style={{ color: "#10b26a", marginRight: 7, fontSize: 23 }} />
            <span style={{ color: "#10b26a" }}>Здоровье</span>
            <span style={{ color: "#00d375", fontWeight: 900 }}>++</span>
          </span>
        </Navbar.Brand>
        <div className="d-none d-md-block"
          style={{
            marginLeft: 26,
            color: "#34bfa3",
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: ".3px"
          }}>
          <FaCode style={{ marginRight: 4, color: "#00bea5" }} />
          ул. Программистов, 42 &nbsp;|&nbsp; Лечим баги и простуды!
        </div>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto align-items-center" style={{ marginLeft: 10 }}>
            <NavLink to="/main" style={navLinkStyle}>
              🏠 Главная
            </NavLink>
            <NavLink to="/catalog" style={navLinkStyle}>
              💊 Каталог
            </NavLink>
            <NavLink to="/bucket" style={navLinkStyle}>
              <FaShoppingCart style={{ marginRight: 7, fontSize: 17 }} />
              Корзина <Badge pill bg="success" style={{ marginLeft: 5, fontSize: 12 }}>IT</Badge>
            </NavLink>
          </Nav>
          {currentUser ? (
  <Nav className="ms-auto align-items-center" style={{ gap: 8 }}>
    <Button
      variant="outline-success"
      size="sm"
      style={{
        fontWeight: 600,
        letterSpacing: "0.5px",
        borderRadius: 7,
        borderWidth: 2,
        display: "flex",
        alignItems: "center",
        gap: 7,
        background: "#e6fff5",
        color: "#10b26a",
        boxShadow: "0 1px 8px #b7ffe533"
      }}
      // onClick={handleLogout} // <-- добавь свою функцию выхода
      title="Выйти"
    >
      <FaHeartbeat style={{ color: "#00d375", fontSize: 18 }} />
      {currentUser.name || currentUser.email}
      <span style={{
        marginLeft: 8,
        color: "#e34c55",
        fontWeight: 700,
        fontSize: 18,
        cursor: "pointer"
      }}>⎋</span>
    </Button>
  </Nav>
) : (
  <Nav className="ms-auto align-items-center" style={{ gap: 8 }}>
    <NavLink to="/login" style={navLinkStyle}>
      <Button
        variant={location.pathname === "/login" ? "success" : "outline-success"}
        size="sm"
        style={{
          fontWeight: 600,
          letterSpacing: "0.5px",
          borderRadius: 7,
          borderWidth: 2
        }}
      >
        <FaHeartbeat style={{ marginRight: 4, color: "#00d375" }} />
        Войти
      </Button>
    </NavLink>
  </Nav>
)}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
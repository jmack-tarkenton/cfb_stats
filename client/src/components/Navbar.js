
import { useEffect, useState } from 'react';
import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap';




function CfbNav(props) {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites && favorites.length > 0) {
      setFavorites(favorites)
    }

  }, [])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">College Football Stats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Favorites" id="cfb-favorites">
              {favorites && favorites.length > 0 ? favorites.map(({ name, id }) => <NavDropdown.Item href={`/team/${id}`} key={id}>
                {name}
              </NavDropdown.Item>) : <NavDropdown.Item href="#">No Favorites Yet</NavDropdown.Item>}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CfbNav;
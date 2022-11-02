
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// function CfbNav(props) {
//     let {
//         style,
//         title,
//         logo

//     } = props;
//     if (!style) {
//         style = {};
//     }
//     return (

//         <Navbar style={style}>
//             <Container fluid>
//                 <Navbar.Brand style={style} className={"fw-bold"}>
//                     <img
//                         alt={title}
//                         src={logo}
//                         width="30"
//                         height="30"
//                         className="d-inline-block align-top"
//                     />{' '}
//                     {title}
//                 </Navbar.Brand>
//             </Container>
//         </Navbar>

//     );
// }



function CfbNav() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">College Football Stats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CfbNav;
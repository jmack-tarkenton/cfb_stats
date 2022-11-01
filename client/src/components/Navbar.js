import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function CfbNav(props) {
    let {
        style,
        title,
        logo

    } = props;
    if (!style) {
        style = {};
    }
    return (

        <Navbar style={style}>
            <Container fluid>
                <Navbar.Brand style={style} className={"fw-bold"}>
                    <img
                        alt={title}
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    {title}
                </Navbar.Brand>
            </Container>
        </Navbar>

    );
}

export default CfbNav;
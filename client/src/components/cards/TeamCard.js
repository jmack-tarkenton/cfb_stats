import { Card, Row, Col, Button } from 'react-bootstrap';

import { FaHeart } from 'react-icons/fa'

const TeamCard = (props) => {
    let { favorite, makeFavorite, id } = props;
    return <Card
        style={{

            ...props.customStyle
        }}
        className="mb-2">
        <Card.Header>
            <Row className="align-items-center">
                <Col xs={4}>
                    <img className="card-image" src={props.logo} alt={props.title} />
                </Col>
                <Col xs={6} >
                    <h5 >{props.title}</h5>
                </Col>
                <Col xs={2}>
                    {favorite && favorite["id"] ? <Button variant='danger'> <FaHeart /> </Button> : <Button className="bg-light text-dark" onClick={() => makeFavorite(id)}><FaHeart /></Button>}
                </Col>
            </Row>
        </Card.Header>
        <Card.Body>
            <Card.Title>{props.standing}</Card.Title>
            <Card.Text>
                {props.children}
            </Card.Text>
        </Card.Body>
    </Card>
};

export default TeamCard;


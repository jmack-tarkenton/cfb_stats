import { Card, Row, Col } from 'react-bootstrap';


const TeamCard = (props) => (
    <Card
        style={{ width: '18rem', ...props.style }}
        className="mb-2">
        <Card.Header>
            <Row className="align-items-center">
                <Col xs={4}>
                    <img className="card-image" src={props.logo} alt={props.title} />
                </Col>
                <Col xs={8} >
                    <h5 >{props.title}</h5>
                </Col>
            </Row>
        </Card.Header>
        <Card.Body>
            <Card.Title>{props.standing}</Card.Title>
            <Card.Text>
                {props.content}
            </Card.Text>
        </Card.Body>
    </Card>
);

export default TeamCard;


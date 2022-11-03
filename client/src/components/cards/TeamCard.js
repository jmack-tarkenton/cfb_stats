import { Card, Row, Col } from 'react-bootstrap';

import BarChart from '../charts/BarChart';

const TeamCard = (props) => (
    <Card
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
                    Ranking: {props.rank ?? "Unranked"}
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
);

export default TeamCard;


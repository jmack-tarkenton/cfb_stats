import { Row, Col, Card, ListGroup } from 'react-bootstrap';


function PlayerCard(props) {
    let { player, stats } = props;
    let { fullName, headshot, jersey, position, year, team } = player;
    let { stat_type, stat } = stats;
    const imgSrc = headshot.href;
    const imgText = headshot.alt;
    return (
        <Card style={{
            // width: '18rem' 
        }}>
            <Card.Header>
                <Row >
                    <Col xs={6}>
                        <img src={team.logo} className={"table-image "} />
                    </Col>
                  
                    <Col xs={6}>

                        <p className={"text-end text-dark fw-bold"}>#{jersey} ({position.abbreviation})</p>
                    </Col>
                 
                </Row>
            </Card.Header>
            <Card.Img variant="top" src={imgSrc} alt={imgText} />
            <Card.Body className="text-dark text-center">
                <Card.Title>{fullName}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush text-center">
                <ListGroup.Item className="fw-bold">{stat_type}</ListGroup.Item>
                <ListGroup.Item>{stat}</ListGroup.Item>
            </ListGroup>
            {/* <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body> */}
        </Card >
    );
}

export default PlayerCard;
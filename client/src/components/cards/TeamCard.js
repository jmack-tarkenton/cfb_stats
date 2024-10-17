import {Card, Row, Col, Button, Dropdown, Stack} from 'react-bootstrap';

import {FaHeart} from 'react-icons/fa'

const TeamCard = (props) => {
    let {favorite, makeFavorite, id, links} = props;
    return <Card

        className="mb-2">
        <Card.Header  style={{
            ...props.customStyle
        }}>
            <Row className="align-items-center">
                <Stack direction={"horizontal"} gap={3}>
                    <img className="card-image" src={props.logo} alt={props.title}/>

                    <h5 className={"me-auto text-center"}>{props.title}</h5>
                    <img className="card-image" src={props.conferenceLogo} alt={''}/>
                    <Dropdown>
                        <Dropdown.Toggle variant={"outline-secondary"} style={{...props.customStyle}}>
                            Team Links
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {links.map((link, index) =>
                                <Dropdown.Item href={link.href} key={index}
                                               target={"_blank"}>{link.text}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    {favorite && favorite["id"] ? <Button variant='danger'> <FaHeart/> </Button> :
                        <Button className="bg-light text-dark" onClick={() => makeFavorite(id)}><FaHeart/></Button>}
                </Stack>


            </Row>
        </Card.Header>
        <Card.Body>
            <Card.Title className={'text-dark'}>{props.standing}</Card.Title>
            <Card.Text>
                <Row>
                    {props.children}
                </Row>
            </Card.Text>
        </Card.Body>
    </Card>
};

export default TeamCard;


import Card from 'react-bootstrap/Card';
function ImageCard(props) {
    let {
        imgSrc,
        imgName,
        title,
        text,
        sub_text,
        bodyTitle
    } = props;

    return (
        <Card className="bg-dark">
            <Card.Img variant="top" src={imgSrc} alt={imgName} style={{maxHeight:'40vh',objectFit:'cover'}} />
            <Card.ImgOverlay className="text-light img-card" >
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
                <Card.Text>{sub_text}</Card.Text>
            </Card.ImgOverlay>
            <Card.Body>
                <Card.Title>{bodyTitle}</Card.Title>
                <Card.Text>
                 {props.children}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ImageCard;
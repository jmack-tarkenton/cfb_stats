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
            <Card.Img variant="top" src={imgSrc} alt={imgName} style={{objectFit:'fill'}} />
            <Card.ImgOverlay className="text-light img-card" >
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
                <Card.Text>{sub_text}</Card.Text>
            </Card.ImgOverlay>

        </Card>
    );
}

export default ImageCard;
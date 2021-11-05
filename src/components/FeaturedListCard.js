import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FeaturedListCard({ item }) {

    const img = [];

    const images = (images) => {
        images.map((image, index) => {
            img.push(image.img)
        });
    }

    if (item) images(item.images);

    return (
        <div>
            <Card className=" mt-4 mb-2 " style={{ width: '90%', marginLeft: '5%', maxHeight: '250px' }}>
                <Link style={{
                    textDecoration: 'none',
                    color: 'black'
                }} className="link" to={{ pathname: "/details", state: item }}
                >
                    <Row md={2} >
                        <Col style={{ width: '20%', maxHeight: '300px', minHeight: '200px' }}>
                            <Image
                                style={{ width: '100%', maxHeight: '300px', minHeight: '200px' }}
                                src={`${img[0]}`}
                                alt="Card image" fluid />
                        </Col>
                        <Col style={{ width: '80%', maxHeight: '300px', minHeight: '200px' }}>
                            <Card border="light" className="p-2" style={{ alignItems: 'flex-start' }}>
                                <Card.Title>
                                    {item.title}
                                </Card.Title>
                                <Card.Body>
                                    <p className="card-text" style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'normal',
                                        height: '7.5em',
                                        textOverflow: "-o-ellipsis-lastline"
                                    }}> {item.description}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Link>
            </Card >
        </div>
    )
}

export default FeaturedListCard;

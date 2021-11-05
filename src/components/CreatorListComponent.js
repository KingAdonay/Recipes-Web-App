import React from 'react';
import { Card, Row, Col, Image,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CreatorListComponent({cItem, setItem, setShowDetail}) {

    console.log(cItem)

    const img = [];

    const images = (images) => {
        images.map((image, index) => {
            img.push(image.img)
        });
    }

    if (cItem) images(cItem.images);

    return (
        <div>
            <Card className=" mt-4 mb-2 " style={{ width: '90%', marginLeft: '5%', maxHeight: '250px' }}>
                <Button  style={{
                    backgroundColor: 'white',
                    borderBlockColor:'white',
                    borderColor: 'white',
                    maxHeight: '250px'
                }}
                variant="outline-light"
                className="text-dark"
                    onClick={()=>{
                        setShowDetail(true);
                        setItem(cItem);
                        
                    }}
                >
                    <Row md={2}>
                        <Col style={{ width: '20%', maxHeight: '300px', minHeight: '200px' }}>
                        {
                        img.length>0 ? (<Image
                            style={{ width: '100%', maxHeight: '300px', minHeight: '200px' }}
                                src={`${img[0]}`}
                                alt="Card image" fluid />) : (
                                    <Image
                                    style={{ width: '100%', maxHeight: '300px', minHeight: '200px' }}
                                        src='/assets/logo.png'
                                        alt="Card image" fluid />
                        )
                    }
                            
                        </Col>
                        <Col style={{ width: '80%', maxHxeight: '300px' }}>
                            <Card border="light" className="p-2" style={{ alignItems: 'flex-start' }}>
                                <Card.Title>
                                    {cItem.title}
                                </Card.Title>
                                <Card.Body>
                                    <p className="card-text" style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'normal',
                                        height: '7.5em',
                                        textOverflow: "-o-ellipsis-lastline"
                                    }}> {cItem.description}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Button>
            </Card >
        </div>
    )
}

export default CreatorListComponent;

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OtherRecipesOfCreator({ item }) {
    const img = [];

    const images = (images) => {
        images.map((image, index) => {
            img.push(image.img)
        });
    }

    if (item) images(item.images);
    console.log(item);
    return (
        <div>
            <Link style={{
                textDecoration: 'none',
                color: 'black'
            }} className="link" to={{ pathname: "/details", state: item }}>
                <Card className="bg-light text-white text-center" style={{ maxWidth: '250px' }}>
                    {
                        img.length > 0 ? (<Card.Img src={`${img[0]}`} fluid style={{maxHeight: '100px'}} alt="Card image" />) : (
                            <Card.Img src="/assets/logo.png" alt="Card image" />
                        )
                    }
                    
                    <Card.ImgOverlay>
                        <Card.Text style={{ fontSize: '22px', fontWeight: "bold", color:'black' }}>
                            {item.title}
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </Link>
        </div>
    )
}

export default OtherRecipesOfCreator

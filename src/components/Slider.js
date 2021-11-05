import React, { Component } from 'react';
import { Carousel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Slider extends Component {
    render() {
        return (
            <Card border="light" style={{
                marginTop: 5
            }}>
                <Carousel variant="dark" fade>
                    <Carousel.Item className="carousel-item" style={{ height: '400px', borderRadius: '25px' }}>
                        <img className="d-block w-100" style={{ height: '600px' }} src='/assets/slidePictures/firstSlide.jpg' alt="First slide" />
                        <Carousel.Caption>
                            <h1 style={{fontSize:'39', marginBottom: '10%', fontWeight: 'bold'}}>My Recipes.</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="carousel-item" style={{ height: '400px' }}>
                        <img className="d-block w-100" style={{ height: '600px' }} src='/assets/slidePictures/slideSecond.jpg' alt="Second slide" />
                        <Carousel.Caption>
                            <h1 style={{color: 'black', marginRight: '60%', fontWeight:'bold'}}>All the Ingredients you need.</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="carousel-item" style={{ height: '400px' }}>
                        <img className="d-block w-100" src='/assets/slidePictures/ingredients.jpg' style={{ height: '600px' }} alt="Third slide" />
                        <Carousel.Caption>
                            <h1  style={{color: 'black', marginRight: '30%', fontWeight:'bold'}}>The steps and time you need.</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="carousel-item" style={{ height: '400px' }}>
                        <img className="d-block w-100" style={{ height: '600px' }} src='assets/slidePictures/doro.jpg'alt="Third slide" />
                        <Carousel.Caption>
                            <h1  style={{color: 'white', marginRight: '30%', fontWeight:'bold'}}>Eat what you cook.</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Card>
        )
    }
}

export default Slider

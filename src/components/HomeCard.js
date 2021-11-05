import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Card } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';



const FETCH_IMAGES = gql`
query MyQuery($_eq: Int !) {
    images(where: {recipe_id: {_eq: $_eq}}) {
      img
    }
  }
  `;

const HomeCard = ({ item }) => {

    const img = [];

    const images = (images) => {
        images.map((image, index) => {
            img.push(image.img)
        });
    }

    if (item) images(item.images);

    return (
        <div>
            <Card className="ms-3 mt-2" style={{minWidth: '300px', maxWidth: '400px', maxHeight:'400px'}}>
                <Link style={{
                    textDecoration: 'none',
                    color: 'black'
                }} className="link" to={{ pathname: "/details", state: item }}>
                    
                    {
                        img.length>0 ? (<Card.Img variant="top" src={`${img[0]}`} style={{
                            maxWidth: '400px', height: '300px'
                        }}  placeholder="image" />) : (
                            <Card.Img variant="top" src="/assets/logo.png" style={{
                                maxWidth: '400px', height:'300px'
                            }} placeholder="image" />
                        )
                    }

                    <div className="card-body">
                        <h4 className="card-title">{item.title}</h4>
                        <p className="card-subtitle" style={{
                            overflow: 'hidden',
                            whiteSpace: 'normal',
                            height: '2.8em',
                            textOverflow: "-o-ellipsis-lastline"
                        }}>
                            {item.description}
                        </p>
                    </div>
                </Link>
            </Card>
        </div>
    )
}


export default HomeCard;

import React, { useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap';
import {gql, useQuery} from '@apollo/client';
import { useLocation } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import Spinner from '../components/Spinner';


const QUERY_BY_CATEGORY =  gql`
query MyQuery($_eq: String !) {
    recipes(where: {category: {_eq: $_eq}}) {
      id
      title
      description
      category
      user_id
      time_estimate
      created_at
      ratings
      rated
      ingredients {
        item
      }
      directions {
        todo
      }
      images {
        img
      }
      comments {
        comment
        by
      }
    }
  }
  
`;
function CategoriesPage() {
    const location = useLocation();
    const [arr, setArr] = useState(10);

    const {data, loading, error } = useQuery(QUERY_BY_CATEGORY, {variables:{
        _eq: location.state.category
    }});

    if (loading) return <Spinner size={80}/>
    if (error) return <h1 style={{ marginTop: '40%' }}> error occured...</h1>

    return (
        <Card border="light" className="mx-auto mb-5" style={{ marginTop: '70px' }}>
            <Card.Body>
                <Card class="w-100" style={{ height: '180px', }}>
                    <Card.Img variant="top" src={location.state.img} style={{
                        width: '100%',
                        objectFit: 'cover',
                        height: '100%'
                    }} />
                    <Card.ImgOverlay>
                        <Card.Text className="mt-5" style={{
                            textAlign: 'center',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: "whitesmoke"
                        }}>{location.state.category}</Card.Text>
                    </Card.ImgOverlay>
                </Card>
                <Card className="mt-3 pt-2 pb-2">
                    <Card.Body>
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {
                                data.recipes.slice(0, arr).map((item, index) => {
                                    return <Col> <HomeCard item={item} /></Col>
                                })
                            }
                        </Row>
                        <Button style={{ marginTop: '20px' }} variant="outline-light text-dark" onClick={() => setArr(arr + 5)}>View More <i class="bi bi-chevron-down"></i></Button>
                    </Card.Body>
                </Card>
            </Card.Body>
        </Card>
    )
}

export default CategoriesPage

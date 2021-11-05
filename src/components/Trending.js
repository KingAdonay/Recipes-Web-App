import React, {useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import { Card, Col, Row, Button } from 'react-bootstrap';
import HomeCard from '../components/HomeCard';
import Spinner from '../components/Spinner';

const TRENDING_RECIPES = gql`
query MyQuery {
    recipes(order_by: {ratings: desc}) {
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

const TrendingRecipes = () => {
    const { data, loading, error } = useQuery(TRENDING_RECIPES);
    const [limitTrending, setLimitTrending] = useState(5);

    if (loading) return <Spinner size={30}/>
    if (error) return <h1 style={{ marginTop: '40%' }}> error occured...</h1>


    return (
        <div>
            <Card border="light" style={{
                marginTop: 20,
                marginBottom: 10
            }}>
                <Card.Header style={{
                    width: 350,
                    backgroundColor: "white",
                    borderColor: "white",
                    fontSize: 24,
                    fontWeight: 'bold'
                }} > Trending Now </Card.Header>
                <Row xs={1} md={2} lg={3} className="mx-auto g-4">
                    {
                        data.recipes.slice(0, limitTrending).map((item, index) => {
                            return <Col style={{
                               
                            }}> <HomeCard key={index} item={item} /></Col>
                        })
                    }
                </Row>
                <Card.Footer style={{ backgroundColor: 'white', borderColor: "white" }}>
                    <Button type="button" variant="outline-light" className="text-dark" onClick={() => setLimitTrending(limitTrending + 5)}>Show More <i class="bi bi-chevron-down"></i></Button>
                </Card.Footer>
            </Card>
        </div>
    )

}

export default TrendingRecipes;

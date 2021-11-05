import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import HomeCard from '../components/HomeCard';
import Slider from '../components/Slider';
import { Card, Col, Row } from 'react-bootstrap';
import Quotes from '../components/Quotes';
import Trending from '../components/Trending';
import HomeCategoriesCard from '../components/HomeCategoriesCard';
import Spinner from '../components/Spinner';
import ErrorComponent from '../components/Error';

const FEATURED_QUERY = gql`
query MyQuery {
    recipes {
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


const Home = () => {

    const { data, loading, error } = useQuery(FEATURED_QUERY);

    if (loading) return <Spinner size={80}/>
    if (error) return <ErrorComponent/>


    return (
        <Card border="light" className=" mb-5" style={{ marginTop: '65px' }}>
            <Card.Body >
                {/* slider call */}
                <Slider />

                <Quotes person="Mary Berry" quote="Cooking and baking is both physical and mental therapy" />

                {/* featured recipes container */}
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
                    }} > Featured Recipes </Card.Header>
                    <Row xs={1} md={3}  className="mx-auto g-4" >
                        {
                            data.recipes.slice(0, 6).map((item, index) => {

                                return <Col style={{
                                    
                                }}> <HomeCard key={index} item={item} /></Col>
                            })
                        }
                    </Row>
                    <Card.Footer style={{ backgroundColor: 'white', borderColor: "white" }}>
                        <Link style={{
                            textDecoration: 'none',
                            color: 'black'
                        }} className="link" to={{ pathname: "/featured", state: data.recipes }}>
                            Show More <i class="bi bi-chevron-right"></i>
                        </Link>
                    </Card.Footer>
                </Card>

                <Quotes quote="The first time you make something, follow the recipe, then figure out how to tailor it to your own tastes" person="Ruth Reichl" />

                {/* trending now recipes container */}

                <Trending/>


                {/* categories container */}
                <HomeCategoriesCard/>
                
            </Card.Body>
        </Card>
    )

}

export default Home;
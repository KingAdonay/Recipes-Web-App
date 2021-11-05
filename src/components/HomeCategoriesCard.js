import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Card, Row } from 'react-bootstrap';
import HomeCategories from './HomeCategories';
import Spinner from './Spinner';

const CATEGORIES_QUERY = gql`
query MyQuery {
    categories {
      title
      thumbnail
    }
  }
`;


function HomeCategoriesCard() {
    const { data, loading, error } = useQuery(CATEGORIES_QUERY);

    const cat = [];

    const arrMap = (arr) => {
        arr.map((obj, index) => {
            cat.push(obj)
        });
    }

    if (loading) return <Spinner size={50}/>
    if (error) return <h1 style={{ marginTop: '40%' }}> error occured...</h1>

    if (data) arrMap(data.categories);

    return (
        <div>{
            cat.length == 0 ? (null) : (
                <Card border="light" className="mt-5 p-3">
                    <Card.Header style={{
                        width: 200,
                        backgroundColor: "white",
                        borderColor: "white",
                        fontSize: 24,
                        fontWeight: 'bold'
                    }} > Categories </Card.Header>
                    <Row xs={1} md={3} lg={4} className="g-4">
                        {
                            cat.map((item, index) => {
                                return <HomeCategories key={index} category={item.title} img={item.thumbnail} />
                            })
                        }

                    </Row>
                </Card>
                )
        }

        </div>
    )
}

export default HomeCategoriesCard;

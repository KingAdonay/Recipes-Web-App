import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {Card, Row, Col} from 'react-bootstrap';
import Spinner from './Spinner';
import OtherRecipesOfCreator from './OtherRecipesOfCreator';
import ErrorComponent from './Error';

const OTHER_RECIPES_OF_CREATOR= gql`
query MyQuery($_eq: String !) {
    recipes(where: {user_id: {_eq: $_eq}}) {
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

function OtherRecipesByCreator({id}) {
    const {data, loading, error} = useQuery(OTHER_RECIPES_OF_CREATOR, {variables:{
        _eq: id
    }})

    if(loading) return <Spinner size={40}/>
    if(error) return <ErrorComponent/>
    return (
        <div>
            <Card style={{ marginLeft: '5%', marginRight: '5%' }} className="mt-5 mb-3 p-1">
                    <Card.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Other Recipes by Chef</Card.Text>
                    <Card.Body>
                        <Row xs="2" md="4" lg="6">
                            {
                                data.recipes.map((item, index) => {
                                    return <Col> <OtherRecipesOfCreator item={item} key={index} /></Col>
                                })
                            }
                        </Row>
                    </Card.Body>
                </Card>
        </div>
    )
}

export default OtherRecipesByCreator

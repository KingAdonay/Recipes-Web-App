import React from 'react';
import { gql, useQuery } from '@apollo/client';
import FeaturedListComponent from '../components/FeaturedListComponent';
import { Card } from 'react-bootstrap';
import Spinner from '../components/Spinner';

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

const FeaturedRecipes = () => {

    const { data, loading, error } = useQuery(FEATURED_QUERY);

    if (loading) return <Spinner size={80} />
    if (error) return <h1 style={{ marginTop: '40%' }}> error occured...</h1>

    const list = data.recipes;

    return (
        <Card border="light" className="container pt-4" style={{ marginTop: '70px' }}>
            <h1>Featured Featured</h1>
            <FeaturedListComponent list={list} />
        </Card>
    )

}

export default FeaturedRecipes

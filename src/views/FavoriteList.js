import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import FeaturedListComponent from '../components/FeaturedListComponent';
import { Card, Button } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import ErrorComponent from '../components/Error';

const FAVOURITES_QUERY = gql`
query FavQuery($_eq: String !) {
    favourites_list(where: {user_id: {_eq: $_eq}}) {
      id
      redipe_id
      user_id
      recipe {
        category
        created_at
        description
        id
        rated
        ratings
        time_estimate
        title
        user_id
        comments {
          comment
          by
          id
        }
        directions {
          todo
        }
        ingredients {
          item
        }
        images {
          img
        }
      }
    }
  }
  
`;

const FavoriteList = () => {

    const { user, isAuthenticated } = useAuth0();
    const { data, loading, error } = useQuery(FAVOURITES_QUERY, {
        variables: {
            _eq: user ? user.email : ""
        }
    });

    if (loading) return <Spinner size={80} />
    if (error) return <ErrorComponent />

    let list = [];

    if(data.favourites_list){
        console.log(data.favourites_list)
        data.favourites_list.map((item, index)=>{
            list.push(item.recipe);
        })
    }

    
    return (
        <Card border="light" className="container pt-4" style={{ marginTop: '70px' }}>
            <h1>Favorites</h1>
            {
                data.favourites_list.length > 0 ? (
                    <FeaturedListComponent list={list} />
                ) : (
                    <div style={{marginTop: '5%'}}>
                        
                         <img src="/assets/logo.png" style={{ maxWidth: '400px', height: '400px' }} alt="out logo" />
                         {
                            isAuthenticated ? (
                                <div style={{
                                    marginTop: '2%',
                                    marginBottom: '5%'
                                }}>
                                    <h2> You have not added a recipe as your favourite yet.</h2>
                                </div>
                            ) : (
                                <div style={{
                                    marginTop: '2%',
                                    marginBottom: '5%'
                                    
                                }}>
                                    <p> Please create an account or login first in the MyRecipes tab and  <br></br> add your recipes as favorite by clicking on the favorite icon.</p>
                                    <Link to="/creatorspage">
                                        <Button variant="link">
                                        Go to MyRecipes
                                        </Button>
                                    </Link>
                                </div>
                            )
                        }

                    </div>

                )
            }

        </Card>
    )

}

export default FavoriteList;

import React, { useState } from 'react';
import { Card, Button, SplitButton, Dropdown, Modal, Row, Col } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import CreatorListComponent from './CreatorListComponent';
import CreatorsDetails from './CreatorsDetails';
import Spinner from './Spinner';
import { recipeData, categories } from '../dummydata';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const DELETE_MUTATION = gql`
mutation MyMutation($_eq: Int = 78) {
    delete_recipes(where: {id: {_eq: $_eq}}) {
      affected_rows
    }
  }
`
    ;
const QUERY_RECIPES = gql`
    query MyQuery($_eq1: String !) {
        recipes(where: {user_id: {_eq: $_eq1}}) {
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
      }`;


function CreatorsComponent({ setShow, data }) {

    const [deleteRecipe] = useMutation(DELETE_MUTATION);

    const [showDetail, setShowDetail] = useState(false);
    const [itemDetail, setItemDetail] = useState(null);
    const [loadingButton, setLoadingButton] = useState(false);
    const { user } = useAuth0();


    // delete handler

    const handleDelete = async (id) => {
        setLoadingButton(true)
        try {
            const res = await deleteRecipe({
                variables: {
                    _eq: id
                },
                refetchQueries: [{
                    query: QUERY_RECIPES, variables: {
                        _eq1: user ? user.email : ""
                    }
                }]
            })
            setLoadingButton(false);
            setShowDetail(!showDetail);
            alert('item deleted successfully.')
        } catch (err) {
            console.log(err)
            alert('Could not delete item.')
        }
    }

    return (
        <>

            <Card border="light" className="mt-5">
                <div style={{ marginLeft: '60%', }}>

                    <Button variant="outline-primary" size="sm" style={{
                        width: '150px',
                        marginRight: '10px',
                        display: 'inline'
                    }}
                        onClick={() => setShow(true)}
                    > Create New</Button>

                    <div style={{ display: 'inline', paddingLeft: '20px', marginTop: '10px' }}>
                        <h5 style={{ display: 'inline', }}></h5>
                        <SplitButton
                            align={{ lg: 'start' }}
                            id="dropdown-menu-align-responsive-2"
                            variant="light"
                            title={user.name}
                        >
                            <Dropdown.Item><LogoutButton /></Dropdown.Item>

                        </SplitButton>
                    </div>
                </div>

                {
                    data.length == 0 ? (

                        <div style={{ marginTop: '13%', marginBottom: '40px' }}>
                            <img src="/assets/logo.png" style={{ maxWidth: '400px', height: '400px' }} />
                            <h3>
                                Add you first recipe!!
                            </h3>
                        </div>
                    ) : (



                        <Card style={{ borderColor: "rgba(132, 214, 207, 0.8)" }}>
                            <Card.Title className="mt-4">
                                Your Recipes
                            </Card.Title>
                            <Card.Body>
                                {!showDetail ?
                                    (<>

                                        {
                                            data.slice(0, 5).map((item, index) => {
                                                return <CreatorListComponent cItem={item} key={index} setItem={setItemDetail} setShowDetail={setShowDetail} />
                                            })
                                        }
                                    </>
                                    ) : (
                                        <div>
                                            <Row md="2">
                                                <Col>
                                                    <Button variant="outline-light" className="text-dark" style={{ marginLeft: '0%', width: '100px', alignSelf: 'flex-end' }} onClick={() => setShowDetail(!showDetail)}><i class="bi bi-chevron-left"></i>Back</Button>
                                                </Col>
                                                <Col>
                                                    <Button variant="outline-danger" className="text-dark" style={{ marginLeft: '0%', width: '100px', alignSelf: 'flex-end' }} onClick={() => handleDelete(itemDetail.id)}>
                                                        {
                                                            loadingButton?(<Spinner size={20}/>):(
                                                              <h6> Delete </h6>
                                                            )  
                                                        }
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <CreatorsDetails cItem={itemDetail} />
                                        </div>
                                    )}
                            </Card.Body>
                        </Card>
                    )}

            </Card>
        </>
    )
}

export default CreatorsComponent;

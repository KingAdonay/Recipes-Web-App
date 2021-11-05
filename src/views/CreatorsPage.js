import React, { useState } from 'react';
import { Card, Form, Modal, FloatingLabel, Button, Row, Col, Image } from 'react-bootstrap';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import CreatorsComponent from '../components/CreatorsComponent';
import Authentication from '../components/Authentication';
import Spinner from '../components/Spinner';


const CreatorsPage = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [time, setTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');
    const [images, setImages] = useState([]);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const INSERT_RECIPE_ONE = gql`
    mutation InsertRecipeOne($title: String !, $description: String !, $category: String !, $time_estimate: String !, $user_id: String !) {
        insert_recipes_one(object: {title: $title, description: $description, category: $category, time_estimate: $time_estimate, user_id: $user_id}) {
          id
        }
      }
    `;

    const INSERT_DIRECTIONS = gql`
    mutation MyMutation($todo: String !, $recipe_id: Int !) {
        insert_directions(objects: {todo: $todo, recipe_id: $recipe_id}) {
          affected_rows
        }
      }
    `;

    const INSERT_INGREDIENTS = gql`
    mutation MyMutation($item: String !, $recipe_id: Int !) {
        insert_ingredients(objects: {item: $item, recipe_id: $recipe_id}) {
          affected_rows
        }
      }
      `;
    const INSERT_IMAGES = gql`
    mutation MyMutation($image: String!, $recipe_id1: Int!) {
        insert_images(objects: {img: $image, recipe_id: $recipe_id1}) {
          affected_rows
        }
      }
    `;

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
      }
      `;


    const [insertRecipe] = useMutation(INSERT_RECIPE_ONE);
    const [insertIngredient] = useMutation(INSERT_INGREDIENTS);
    const [insertDirections] = useMutation(INSERT_DIRECTIONS);
    const [insertImages] = useMutation(INSERT_IMAGES);

    const { isAuthenticated, user } = useAuth0();

    const { data, loading, error } = useQuery(QUERY_RECIPES, {
        variables: {
            _eq1: user ? user.email : ""
        }
    });



    const handleTitleChange = e => {
        e.preventDefault();
        console.log(e.target.value);
        setTitle(e.target.value)
    };

    const handleDescriptionChange = e => {
        e.preventDefault();
        setDescription(e.target.value)
    };

    const handleCategoryChange = e => {
        e.preventDefault();
        setCategory(e.target.value)
    };

    const handleTimeChange = e => {
        e.preventDefault();
        setTime(e.target.value)
    };

    const handleIngredientsChange = e => {
        e.preventDefault();
        setIngredients(e.target.value)
    };

    const handleDirectionsChange = e => {
        e.preventDefault();
        setDirections(e.target.value)
    };

    const uploadImage = async (e) => {
        console.log(e.target.files.length);
        let arrOfImages = [];
        for (let a = 0; a < e.target.files.length; a++) {
            const file = e.target.files[a];
            const base64 = await convertBase64(file);
            console.log(base64);
            arrOfImages.push(base64);
        }

        setImages(arrOfImages);

    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true);
        console.log(images);

        let arr = [];
        let ingArray = ingredients.split(';');
        let dirArray = directions.split(';');
        for (var i = 0; i < ingArray.length; i++) {
            let obj = {};
            obj['item'] = ingArray[i];
            arr.push(obj);
        }

        try {

            const res = await insertRecipe({
                variables: {
                    title,
                    category,
                    description,
                    time_estimate: time,
                    user_id: user.email,
                }
            });

            for (let j = 0; j < arr.length; j++) {
                const res1 = await insertIngredient({
                    variables: {
                        item: arr[j].item,
                        recipe_id: res.data.insert_recipes_one.id
                    }
                })
            }

            for (let k = 0; k < dirArray.length; k++) {
                const res2 = await insertDirections({
                    variables: {
                        todo: dirArray[k],
                        recipe_id: res.data.insert_recipes_one.id
                    }
                })
            }

            for (let b = 0; b < images.length; b++) {
                const res3 = await insertImages({
                    variables: {
                        image: images[b],
                        recipe_id1: res.data.insert_recipes_one.id
                    },
                    refetchQueries: [{
                        query: FEATURED_QUERY
                    },
                    {
                        query: QUERY_RECIPES,
                            variables: {
                                _eq1: user ? user.email : ""
                            }
                    }]
                })
            }

            //seting the input fields back to default
            setTitle('');
            setDescription('');
            setCategory('');
            setTime('');
            setIngredients('');
            setDirections('');

        } catch (err) {
            console.log(err);
            alert("Something went wrong. Please check your connection and inputs.")
        }

        setLoadingSubmit(false);
        setShow(false);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    if (loading) return <Spinner size={80} />;
    if (loadingSubmit) return <Spinner size={80} text="Submitting" />;
    if (error) return `Submission error! ${error.message}`;

    console.log(data);

    return (
        <div className="container mb-3" style={{
            marginTop: '70px'
        }}>
            {
                isAuthenticated ? (
                    <div>

                        <CreatorsComponent setShow={setShow} data={data.recipes} />

                        <Modal
                            dialogClassName="custom-modal"
                            centered
                            show={show}
                            onHide={() => setShow(false)}
                            aria-labelledby="example-custom-modal-styling-title"
                            scrollable

                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title" style={{ alignSelf: 'center' }}>
                                    Add your Recipe!
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <Form onSubmit={e => onSubmitForm(e)}>
                                    <>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Title"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="Title of your Recipe" value={title} onChange={e => handleTitleChange(e)} />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingTextarea2" label="Description">
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Please put in the description of your recipes"
                                                style={{ minHeight: '100px' }}
                                                value={description}
                                                onChange={e => handleDescriptionChange(e)}
                                            />
                                        </FloatingLabel>
                                        <Row className="g-2">
                                            <Col md>
                                                <FloatingLabel controlId="floatingSelect" label="Categorie">
                                                    <Form.Select value={category} aria-label="Default select example" style={{ marginTop: '10px', marginBottom: '10px' }} onChange={e => handleCategoryChange(e)}>
                                                        <option value="Ethiopian">Ethiopian</option>
                                                        <option value="Italian">Italian</option>
                                                        <option value="French">French</option>
                                                        <option value="Vegitarian">Vegitarian</option>
                                                        <option value="Burgers">Burgers</option>
                                                        <option value="Pizza">Pizza</option>
                                                        <option value="Pastry">Pastry</option>
                                                        <option value="Chinese">Chinese</option>
                                                        <option value="Breakfast">Breakfast</option>
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                            <Col md>
                                                <FloatingLabel
                                                    controlId="floatingInput2"
                                                    label="Time Estimate in Minutes"
                                                    className="mb-3"
                                                >
                                                    <Form.Control vlaue={time} onChange={e => handleTimeChange(e)} style={{ marginTop: '10px' }} type="text" placeholder="30 min" />
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <FloatingLabel controlId="floatingTextarea3" label="Ingredients">
                                            <Form.Control
                                                value={ingredients}
                                                as="textarea"
                                                placeholder="Please put in the ingredients of your recipes"
                                                style={{ minHeight: '100px', marginBottom: '10px' }}
                                                onChange={e => handleIngredientsChange(e)}
                                            />
                                            <Form.Text id="textareaIngredientHelp" muted>
                                                The Ingredients should be in order and should be separated with a semi-colon(;).
                                            </Form.Text>
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingTextarea4" label="Directions">
                                            <Form.Control
                                                value={directions}
                                                as="textarea"
                                                placeholder="Please put in the directions of your recipes"
                                                style={{ minHeight: '100px', marginBottom: '10px', marginTop: '10px' }}
                                                onChange={e => handleDirectionsChange(e)}
                                            />
                                            <Form.Text id="textareaDirectionHelp" muted>
                                                The directions should be in order and should be separated with a semi-colon(;).
                                            </Form.Text>
                                        </FloatingLabel>

                                        <div style={{ marginTop: '10px' }}>
                                            <Form.Label>Upload images of your Recipe</Form.Label>
                                            <Form.Control type="file" multiple onChange={e => uploadImage(e)} />
                                        </div>

                                        <div className="text-center" style={{ margin: '10px' }}>
                                            <Button type="submit" variant="outline-primary" >Add Recipe</Button>
                                        </div>
                                    </>
                                </Form>
                            </Modal.Body>

                            <style jsx>{`
                    .custom-modal {
                        
                        width: 80%;
                        max-width: none !important;
                    }
                    `}
                            </style>
                        </Modal>
                    </div>
                ) : (
                    <Authentication />
                )
            }
        </div>

    )

}

export default CreatorsPage;

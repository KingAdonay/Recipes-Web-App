import React, { useState } from 'react';
import { Card, Col, Form, Row, Table, Button, FloatingLabel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import Rating from 'react-rating';
import IngredientItem from '../components/IngredientItem';
import DirectionItem from '../components/DirectionItem';
import Comments from '../components/Comments';
import ImageGallery from 'react-image-gallery';
import OtherRecipesByCreator from '../components/OtherRecipesByCreator';

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


const COMMENT_MUTATION = gql`
mutation addComment($by: String !, $comment: String !, $recipe_id: Int!) {
    insert_comments_one(object: {by: $by, comment: $comment, recipe_id: $recipe_id}) {
      id
    }
  }`;

  const RATINGS_MUTATION =gql`
  mutation update_ratings($id: Int = 39, $rated: Int = 2, $ratings: numeric = "4.5") {
    update_recipes_by_pk(pk_columns: {id: $id}, _set: {rated: $rated, ratings: $ratings}) {
      rated
      ratings
    }
}
  `;

  const FAVLIST_MUTATION = gql`
  mutation AddFavList($redipe_id: Int !, $user_id: String !) {
    insert_favourites_list_one(object: {redipe_id: $redipe_id, user_id: $user_id}) {
      id
    }
  }
  `;
const Details = () => {
    const location = useLocation();
    const [com, setCom] = useState('');
    const [commenter, setCommenter] = useState('');
    const [rating, setRating] = useState(5);
    const [ico, setIco] = useState("bi-plus-lg");

    const {user} = useAuth0();

    const galleryImages = [];

    const imagesMap = (images) => {
        images.map((image, index) => {
            const obj = {
                original: image.img,
                thumbnail: image.img,
                originalHeight: '400px',
                originalWidth: "800px",
                thumbnailHeight: '80px',
                originalClass: 'images-custom'
            }
            galleryImages.push(obj);
        });
    }

    if (location.state.images.length>0) imagesMap(location.state.images);


    const [addComment, { data, loading, error }] = useMutation(COMMENT_MUTATION);
    const [updateRating] = useMutation(RATINGS_MUTATION);
    const [addFavList] = useMutation(FAVLIST_MUTATION);


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await addComment({
                variables: {
                    by: commenter,
                    comment: com,
                    recipe_id: location.state.id
                },
                refetchQueries: [{
                    query: FEATURED_QUERY
                },{query: TRENDING_RECIPES}]
            });
            setCom('');
            setCommenter('');
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleRatings = async () =>{
        
        const ratingValue = (location.state.ratings + rating) / (location.state.rated + 1)

        console.log(rating);

        try {
            const res= await updateRating({
                variables:{
                    id: location.state.id,
                    rated:location.state.rated +1,
                    ratings:ratingValue
                },
                refetchQueries: [{
                    query:TRENDING_RECIPES
                }]
            })
            console.log('rated');
        } catch (err) {
            console.log(err)
            
        }
    }

    const handleFavList = async () =>{

        try {
            const res= await addFavList({
                variables:{
                    redipe_id: location.state.id,
                    user_id: user.email
                }
            })
            console.log('added');
        } catch (err) {
            console.log(err)
            
        }
    }

    const handleCommentsChange = e => {
        setCom(e.target.value)
    };

    const handleCommenterChange = e => {
        setCommenter(e.target.value)
    };

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    return (
        <Card border="light" className="mx-auto mb-5" style={{ marginTop: '70px' }}>
            <Card.Body>
                <Card class="w-100" style={{ height: '200px' }}>
                    {/* <Card.Img variant="top" src={`${process.env.PUBLIC_URL} ${location.state.images[0].img}`} style={{
                        width: '100%',
                        objectFit: 'cover',
                        height: '100%',

                    }} /> */}
                    {
                        location.state.images.length > 0 ? (<Card.Img variant="top" src={`${process.env.PUBLIC_URL} ${location.state.images[0].img}`} style={{
                            width: '100%',
                            objectFit: 'cover',
                            height: '100%',
    
                        }} />) : (
                            <Card.Img variant="top" src="/assets/logo.png" style={{
                                width: '100%',
                                objectFit: 'cover',
                                height: '100%',
        
                            }} />
                        )
                    }
                    <Card.ImgOverlay>
                        <Card.Text className="mt-5" style={{
                            textAlign: 'center',
                            fontSize: '36px',
                            fontWeight: 'bolder',
                            color: "black"
                        }}>{location.state.title}</Card.Text>
                    </Card.ImgOverlay>
                </Card>

                {/* Description card */}

                <Card className="mt-5" border="" style={{
                    width: '90%', marginLeft: '5%', backgroundColor: 'rgba(132, 214, 207, 0.1)'
                }}>
                    <div className="m-4" >
                        <Card.Text> {location.state.description}</Card.Text>
                    </div>
                    <Row xs={1} md={3} lg={4} className="m-3 p-3">
                        <Col style={{}}>
                            <Card.Text style={{ display: 'inline' }}>Category:</Card.Text>
                            <Card.Text style={{ display: 'inline', fontWeight: 'bold' }}>{location.state.category}</Card.Text>
                        </Col>
                        <Col style={{}} >
                            <Card.Text style={{ display: 'inline' }}>By: </Card.Text>
                            <Card.Text style={{ display: 'inline', fontWeight: 'bold' }}>{location.state.user_id}</Card.Text>
                        </Col>
                        <Col style={{}} >
                            <Card.Text style={{ display: 'inline' }}>Time: </Card.Text>
                            <Card.Text style={{ display: 'inline', fontWeight: 'bold' }}>{location.state.time_estimate}</Card.Text>
                        </Col>
                        <Col style={{}} >
                            <Card.Text style={{ display: 'inline' }}>Add To Favorite: </Card.Text>
                            <Card.Text style={{ display: 'inline', fontWeight: 'bold' }}><Button 
                            onClick={()=>{
                                if(!user){ alert('please login first!')}
                                else {
                                    if(ico=="bi-plus-lg"){
                                        setIco("bi-check-lg");
                                        handleFavList();
                                        } else {
                                        setIco("bi-plus-lg")
                                        }
                                }  
                            }}
                            variant="outline-light"
                            style={{
                                fontSize: '19px',
                               color:'orange'
                            }}><i className={ico}></i></Button></Card.Text>
                        </Col>
                    </Row>
                </Card>


                {/* Image Gallery */}
                {!location.state.images.length>0 ?
                    (null) : (<Card border="light" className="mx-auto w-75" style={{ marginTop: '20px' }}>
                        <ImageGallery showNav={false} showFullscreenButton={false} showPlayButton={false} autoPlay={false} items={galleryImages} />
                        <style jsx={true}>{`
                    .images-custom {
                        width: 100%;
                        max-width: none !important;
                    }
                    `}
                        </style>
                    </Card>)
                }

                {/* List Card */}

                <Card className=" container mx-auto mt-5 w-75 "  style={{
                    width: '90%', marginLeft: '5%', borderColor: 'rgba(132, 214, 207, 0.8)'
                }}>
                    <Card className="mx-auto mt-5" border="light" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                        <Card.Text style={{ fontWeight: 'bold', fontSize: '24px' }}> Ingredients</Card.Text>
                        <Table borderless variant="light">
                            <tbody style={{ backgroundColor: 'white' }}>
                                {
                                    location.state.ingredients.map((ingredient, index) => {
                                        return <IngredientItem key={index} desc={ingredient.item} />
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card>

                    <Card className="mx-auto mt-5" border="light" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                        <Card.Text style={{ fontWeight: 'bold', fontSize: '24px' }}> Directions</Card.Text>

                        <Table borderless variant="light">
                            <tbody style={{ backgroundColor: 'white' }}>
                                {
                                    location.state.directions.map((direction, index) => {
                                        return <DirectionItem key={index} step={index} direction={direction.todo} />
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card>

                </Card>


                 {/* other recipes of creator */}
                <OtherRecipesByCreator id={location.state.user_id}/>


                {/* Ratings and reviews */}

                <Card style={{borderColor: 'rgba(132, 214, 207, 0.8)'}} className="container mx-auto mt-5 px-5 pt-3 w-75">
                    <Card.Body>
                        <Card border="light">
                            <Card.Body>
                                <Card.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    Rate the Recipe
                                </Card.Text>
                                <div style={{ marginTop: '15px', marginBottom: '15px', color: 'brown', fontSize: '28px' }}>
                                    <Rating
                                        
                                        initialRating={rating}
                                        emptySymbol="bi bi-star bi-2x low"
                                        fullSymbol="bi bi-star-fill bi-2x low"
                                        fractions={2}
                                        onClick={(rate)=>{
                                            setRating(rate);
                                            handleRatings();}}
                                    /> <p style={{fontSize: '16px', color: 'black'}}>{location.state.ratings} by {location.state.rated} people</p>
                                </div>
                            </Card.Body>
                        </Card>

                        {location.state.comments.length > 0 ? (<div>
                            <Card.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                Reviews
                            </Card.Text>
                            {
                                location.state.comments.map((comment, index) => {
                                    return <Comments key={index} comment={comment} />
                                })
                            }
                        </div>) : (null)
                        }
                        <div style={{ marginTop: '25px' }}>
                            <Card.Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Write your comment here.</Card.Text>
                            <Form className="mt-2 " style={{ maxWidth: '9S00px' }} onSubmit={e => {
                                // e.preventDefault();
                                // addComment({ variables: { by: commenter, comment: com, recipe: 'Eggs' } }); 
                                handleCommentSubmit(e);

                            }}>
                                <FloatingLabel controlId="floatingTextarea3" label="Comment">
                                    <Form.Control
                                        value={com}
                                        as="textarea"
                                        placeholder="Comments"
                                        style={{ minHeight: '100px', marginBottom: '10px' }}
                                        onChange={handleCommentsChange}
                                    />
                                </FloatingLabel>
                                <FloatingLabel

                                    controlId="floatingInput"
                                    label="By:"
                                    className="mt-2"
                                >
                                    <Form.Control style={{ maxWidth: '350px' }} type="text" placeholder="Adonay Eshetu" value={commenter} onChange={handleCommenterChange.bind(this)} />
                                </FloatingLabel>
                                <Button type="submit" className="mt-3" variant="primary">
                                    Submit
                                </Button>
                            </Form>
                        </div>

                    </Card.Body>
                </Card>


            </Card.Body>

        </Card>
    )

}

export default Details;
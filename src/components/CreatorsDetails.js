import React, {useState} from 'react';
import { Card, Col, Form, Row, Table, Button, FloatingLabel } from 'react-bootstrap';
import { useQuery, gql, useMutation } from '@apollo/client';
import Comments from '../components/Comments';
import ImageGallery from 'react-image-gallery';
import IngredientItem from '../components/IngredientItem';
import DirectionItem from '../components/DirectionItem';
import Rating from 'react-rating';

const COMMENT_MUTATION = gql`
mutation addComment($by: String !, $comment: String !, $recipe: String!) {
    insert_comments_one(object: {by: $by, comment: $comment, recipe: $recipe}) {
      id
    }
  }`;

function CreatorsDetails({cItem}) {
    console.log('items detail', cItem);
    const [com, setCom] = useState('');
    const [commenter, setCommenter] = useState('');

    const galleryImages = [];

    const images = (images) => {
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

    if (cItem) images(cItem.images);

    const img = [];

    const imageSingle = (images) => {
        images.map((image, index) => {
            img.push(image.img)
        });
    }

    if (cItem) imageSingle (cItem.images);


    const [addComment, { data, loading, error }] = useMutation(COMMENT_MUTATION)


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await addComment({
                variables: {
                    by: commenter,
                    comment: com,
                    recipe: 'Eggs'
                }
            });
            console.log(data);
        }
        catch (err) {
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

    console.log(cItem)

    return (
        <div>
            <Card border="light" className="mx-auto mt-5 mb-5" style={{}}>
            <Card.Body>
                <Card class="w-100" style={{ height: '200px' }}>
                    
                    {
                        img.length > 0 ? (<Card.Img variant="top" src={`${img[0]}`} style={{
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
                        }}>{cItem.title}</Card.Text>
                    </Card.ImgOverlay>
                </Card>

                {/* Description card */}

                <Card className="mt-5" border="" style={{
                    width: '90%', marginLeft: '5%', backgroundColor: 'rgba(132, 214, 207, 0.1)'
                }}>
                    <div className="m-4" >
                        <Card.Text> {cItem.description}</Card.Text>
                    </div>
                    <Row xs={1} md={3} className="m-3 p-3">
                        <Col style={{}}>
                            <Card.Text style={{ display: 'inline' }}>Category:</Card.Text>
                            <Card.Text style={{ display: 'inline', fontWeight: 'bold' }}>{cItem.category}</Card.Text>
                        </Col>
                        <Col style={{}} >
                            <Card.Text style={{ display: 'inline' }}>By: </Card.Text>
                            <Card.Text style={{ display: 'inline', fontWeight: 'bold' }}>{cItem.user_id}</Card.Text>
                        </Col>
                        <Col style={{}} >
                            <Card.Text style={{ display: 'inline' }}>Time: </Card.Text>
                            <Card.Text style={{ display: 'inline', fontWeight: 'bold' }}>{cItem.time_estimate}</Card.Text>
                        </Col>
                    </Row>
                </Card>


                {/* Image Gallery */}
                {!cItem.images.length>0 ?
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
                                    cItem.ingredients.map((ingredient, index) => {
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
                                    cItem.directions.map((direction, index) => {
                                        return <DirectionItem key={index} step={index} direction={direction.todo} />
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card>

                </Card>
               


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
                                        initialRating={cItem.ratings}
                                        emptySymbol="bi bi-star bi-2x low"
                                        fullSymbol="bi bi-star-fill bi-2x low"
                                        fractions={2}
                                    /> <p style={{fontSize: '16px', color: 'black'}}>{cItem.ratings} by {cItem.rated} people</p>
                                </div>
                            </Card.Body>
                        </Card>

                        {cItem.comments.length > 0 ? (<div>
                            <Card.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                Reviews
                            </Card.Text>
                            {
                                cItem.comments.map((comment, index) => {
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
        </div>
    )
}

export default CreatorsDetails;

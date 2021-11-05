import React from 'react';
import SignupButton from './SignupButton';
import LoginButton from './LoginButton';
import { Col, Row } from 'react-bootstrap';

function Authentication() {
    return (
        <div className="container w-75">
            <Row xs={1} md={2} lg={2} className="g-4" >
                <Col >
                    <div>
                        <h1 style={{ marginTop: '10px' }}>
                            Welcome to MyRecipes.
                        </h1>
                        <img src="/assets/logo.png" style={{ maxWidth: '400px', height: '400px' }} />

                        <p style={{ marginTop: '20px', fontSize: '20px' }}>
                            👨‍🍳 Be your own chef by the help of our platform.<br></br>
                            And help others to be their own chef too by uploading your recipes.<br></br>
                            ⭐ You can also add other people recipes to your favorite list<br></br>
                            and access the recipes anytime.<br></br>
                            🆓 We provide a free service for the people.
                            After joining out community you should be able to share you recipes for other.<br></br>


                        </p>
                    </div>
                </Col>
                <Col>
                    <div  style={{marginRight: '10%',marginTop: '35%', borderStyle:"solid", borderWidth: '2px', borderColor: 'brown', borderRadius: '7px', padding: '20px', display: 'block'}}>
                        <div>
                            <p>
                                If you already have an account.
                            </p>
                            <LoginButton />
                        </div>
                        <div>
                            <p>New to our services?
                            Join us.</p>
                            <SignupButton />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Authentication;

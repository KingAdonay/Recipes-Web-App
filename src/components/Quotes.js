import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

class Quotes extends Component {
    render() {
        const {person, quote} =this.props;
        return (
            <Card border="light" className="container">
                <Card style={{maxWidth: '1200px', backgroundColor: "rgba(152, 152, 152, 0.1)" , borderColor:'rgba(132, 214, 207, 1)'}} className="m-5 p-5">
                    <Card.Body>
                        <blockquote className="blockquote ">
                            <p>
                                {' '}
                                {quote}.{' '}
                            </p>
                            <footer className="blockquote-footer">
                                {person}
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </Card>
        )
    }
}

export default Quotes

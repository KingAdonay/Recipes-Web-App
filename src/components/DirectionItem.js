import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

function DirectionItem({ direction, step }) {
    return (

        <Card className="p-2" border="light">
            {/* <Row xs="1" className="m-3 p-1"> */}
            {/* <Col style={{maxWidth: '80px', paddingRight: '5px'}}> */}
            {/* <p style={{display:  'inline'}}>{step + 1}</p>
                <p style={{
                    display: 'inline'
                }}>{direction.do}</p> */}
            {/* </Col> */}
            {/* <Col style={{maxWidth: '500px',paddingLeft: '0px'}}>{direction.do}</Col> */}
            {/* </Row> */}
            <tr>
                <td>{step+1}</td>
                <td style={{paddingLeft: '10px'}}>{direction}</td>
            </tr>
        </Card>
    )
}

export default DirectionItem;

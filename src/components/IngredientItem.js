import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

function IngredientItem({ desc }) {
    return (
        <Card className="p-2" border="light">
            {/* <Row xs="2" className="m-3 p-1" st>
                <Col><p style={{ maxWidth: '80px', marginLeft: '10px' }}>{desc.amount}</p></Col>
                <Col>{desc.item}</Col>
            </Row> */}
            <tr>
                <td> </td>
                <td style={{paddingLeft: '10px'}}>{desc}</td>
            </tr>
        </Card>
    )
}

export default IngredientItem

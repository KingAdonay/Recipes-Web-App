import React from 'react';
import {Card} from 'react-bootstrap';

function Comments({comment}) {
    return (
        <div>
            <Card className="mt-3 px-5 pt-3 pb-2">
                <Card.Text>
                    {comment.comment}
                </Card.Text>
                <Card.Text className="text-gray" style={{color: 'GrayText'}}>
                    By {comment.by}
                </Card.Text>
            </Card>
        </div>
    )
}

export default Comments

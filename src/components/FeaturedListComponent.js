import React, {useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import FeaturedListCard from './FeaturedListCard';

function FeaturedListComponent({list}) {

const [limit, setLimit] = useState(15);

    return (
        <div>
            <Card className="mb-4 mt-2" style={{borderColor:'rgba(132, 214, 207, 1)'}}>
                <Card.Body>
                    <>
                        {
                            list.slice(0, limit).map((item, index) => {
                                return <FeaturedListCard item={item} key={index} />
                            })
                        }
                    </>
                </Card.Body>
                <Card.Footer style={{backgroundColor: 'white', borderColor: "white"}} className="mt-3">
                        <Button type="button" variant="outline-light" className="text-dark" onClick={()=>setLimit(limit+10)}>Show More<i class="bi bi-chevron-down"></i></Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default FeaturedListComponent;

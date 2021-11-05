import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HomeCategories extends Component {
    render() {
        const { category, img } = this.props;
        return (
            <div>
                <div className="container" style={{
                    maxWidth: '300px',
                    minHeight: '250px'
                }}>
                    <Link style={{
                        textDecoration: 'none',
                        color: 'black'
                    }} className="link" to={{ pathname: "/categoriesPage", state: {category: category, img: img} }}>
                        <div>
                            <div className='rounded-circle' style={{ backgroundColor: 'black', maxHeight: "250px" }}>
                                <Image src={img} alt="Snow" style={{ width: "100%", minHeight: '180px', opacity: 0.5, color: 'black' }} roundedCircle={true} />
                            </div>
                            <div style={{
                                position: "relative",
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -250%)',
                                fontSize: '28px',
                                color: "white",
                                fontWeight: "bold"
                            }} className="">{category}</div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default HomeCategories;

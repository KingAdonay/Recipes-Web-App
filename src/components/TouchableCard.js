import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import a from '../../public/assets/a.jpg'

class TouchableCard extends Component {
    render() {
        return (
            <div>
                <Link to="/details" className="card-link">
                    <div class="card bg-light text-white ms-5 mt-3" style={{ width: 300 }}>
                        <img src={a} class="card-img" alt="some image" />
                        <div class="card-img-overlay">
                            <h5 class="card-title text-primary mg-5">Card title</h5>
                        </div>
                    </div>
                </Link> 
            </div>
        )
    }
}

export default TouchableCard;

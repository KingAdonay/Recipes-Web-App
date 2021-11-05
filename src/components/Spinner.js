import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

function Spinner({size, text}) {
    const title= text || 'Loading';
    return (
        <div style={{marginTop: '15%', marginBottom: '10%'}}>
            <ClipLoader color='#84d6cecc' size={size} />
            <h5>{title}...</h5>
        </div>
    )
}

export default Spinner

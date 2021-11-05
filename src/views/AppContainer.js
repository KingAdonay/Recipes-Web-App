import React from 'react';
import {
    useRouteMatch
} from 'react-router-dom';


const AppContainer = ()=>{
    
        const { path, url } = useRouteMatch();
        return (
            <div>
                
            </div>
        );

};

export default AppContainer;

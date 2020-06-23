import React from 'react';
//formatos diferentes de rotas
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
    return (
        <BrowserRouter>
        {/* exact verificação de igualdade */}
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    );
}

export default Routes;
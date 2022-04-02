import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
/*
Switch -> garante a execução de apenas uma rota por vez
*/

import Logon from './pages/Logon'; 
import Register from './pages/Register'; 
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
// não precisa colocar o arquivo porque quando
// deixa só o nome da pasta ele já procura pelo arquivo index

export default function Nada() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />
                <Route path='/incidents/new' component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}
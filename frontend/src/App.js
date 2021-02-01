import Entry from './Components/Access/Entry.js';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import Access from "./Components/Access/Access";
import Host from "./Components/Host";

function App() {
    const [token, setToken] = useState();

    return (
        <Router>
        <Switch>
            <Route exact path="/">
                <Entry />
            </Route>
            <Route path="/host">
                <Access setToken={setToken}/>
            </Route>
            <Route path="/control">
                <Host token={token}/>
            </Route>
        </Switch>
        </Router>
    )
}

export default App

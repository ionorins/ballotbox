import Entry from './Components/Access/Entry.js';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import Access from "./Components/Access/Access";
import Host from "./Components/Host/Host";
import Event from "./Components/Attendee/Event";
import ControlPanel from "./Components/Host/Event/ControlPanel";

function App() {
    const [token, setToken] = useState();

    return (
        <Router>
        <Switch>
            <Route exact path="/">
                <Entry setToken={setToken}/>
            </Route>
            <Route path="/login">
                <Access setToken={setToken}/>
            </Route>
            <Route path="/host/event/:id">
                <ControlPanel />
            </Route>
            <Route path="/host">
                <Host token={token}/>
            </Route>
            <Route path="/event/">
                <Event />
            </Route>
        </Switch>
        </Router>
    )
}

export default App

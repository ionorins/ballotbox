import Entry from './Components/Access/Entry.js';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Access from "./Components/Access/Access";
import Host from "./Components/Host/Host";
import Event from "./Components/Attendee/Event";
import ControlPanel from "./Components/Host/Event/ControlPanel";
import Qr from "./Components/Utils/Qr";
import Error404 from "./Components/Utils/Error404";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Entry />
                </Route>
                <Route path="/login">
                    <Access />
                </Route>
                <Route path="/host/event/:id">
                    <ControlPanel />
                </Route>
                <Route path="/host">
                    <Host />
                </Route>
                <Route path="/event/">
                    <Event />
                </Route>
                <Route path="/qr/:code">
                    <Qr />
                </Route>
                <Route exact path="/404">
                    <Error404 />
                </Route>
                <Route exact path="/:code">
                    <Entry />
                </Route>
                <Route>
                    <Error404 />
                </Route>

            </Switch>
        </Router>
    )
}

export default App

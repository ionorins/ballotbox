import React , {lazy, Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Qr from "./Components/Utils/Qr";
import Error404 from "./Components/Utils/Error404";
import Loading from "./Components/Utils/Loading";

function App() {

    const Entry = lazy(() => import('./Components/Access/Entry'));
    const Access = lazy(() => import('./Components/Access/Access'));
    const ControlPanel = lazy(() => import('./Components/Host/Event/ControlPanel'));
    const Host = lazy(() => import('./Components/Host/Host'));
    const Event = lazy(() => import('./Components/Attendee/Event'));
    const Qr = lazy(() => import('./Components/Utils/Qr'));
    const Error404 = lazy(() => import('./Components/Utils/Error404'));

    return (
        <Router>
            <Suspense fallback={<Loading />}>
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
            </Suspense>
        </Router>
    )
}

export default App

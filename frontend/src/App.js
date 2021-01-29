import Entry from './Components/Access/Entry.js';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [currentPage, setPage] = useState("");

    useEffect(() => {
        if (currentPage == "") {
            setPage(<Entry setPage={setPage} />)
        }
    });

    return (
        <div>
            {currentPage}
        </div>
    )
}

export default App

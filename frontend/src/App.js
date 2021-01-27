import Entry from './Components/Entry.js';
import React, {useState, useEffect} from 'react';

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

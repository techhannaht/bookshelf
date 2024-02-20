import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from 'react';
import Authorize from './Authorization/Authorization';
import Header from './Views/Header';
import ApplicationViews from './Views/AppViews';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem("userProfile")) {
            setIsLoggedIn(false)

        }
    }, [isLoggedIn])

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ?
                <ApplicationViews />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </Router>
    );
}

export default App;
import React, {createContext, useState, useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import CfbNav from './components/Navbar';
import AllTeams from './views/AllTeams';
import Team from './views/Team';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Create a context
const GlobalStateContext = createContext();

// Create a custom hook for easy access
export const useGlobalState = () => useContext(GlobalStateContext);
export const GlobalStateProvider =  ({children}) => {
    const [globalState, setGlobalState] = useState({
        // Your global state here
        conferences:[],
        season:new Date().getFullYear().toString(),
    });

    async function getNcaaConferences() {
        const response = await fetch(`/api/cfb/conferences?season=${globalState.season}`);
        const conferences = await response.json();

        if (response.status !== 200) {
            throw Error(conferences)
        }
        return setGlobalState((prevState)=>({
            ...prevState,
            conferences
        }));
    }
    if(globalState.conferences.length===0){
        getNcaaConferences();
    }

    return (
        <GlobalStateContext.Provider value={{globalState, setGlobalState}}>
            {children}
        </GlobalStateContext.Provider>
    );
};

function App() {

    return (
        <div className="App">
            <GlobalStateProvider>
                <CfbNav/>
                <Container fluid className={"bg-dark text-light"}>
                    <Routes>
                        <Route path="" element={<AllTeams/>}/>
                        <Route path="/team/:team_id" element={<Team/>}/>
                    </Routes>


                </Container>
            </GlobalStateProvider>
        </div>
    );
}

export default App;
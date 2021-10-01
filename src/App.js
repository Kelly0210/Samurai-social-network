import './App.css';
import React from 'react';
import ProfileContainer from "./Components/Profile/ProfileContainer";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import SidebarContainer from "./Components/Sidebar/SidebarContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";

const App = () => {

    return (
        <BrowserRouter>
            <div className="app-wrapper content">
                <HeaderContainer />
                <SidebarContainer />
                <Route path="/dialogs" render={ () => <DialogsContainer />}/>
                <Route path="/profile" render={ () => <ProfileContainer />}/>
                <Route path="/users" render={ () => <UsersContainer />}/>
                </div>
        </BrowserRouter>
);
}

export default App;

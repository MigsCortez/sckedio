import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import PageLayout from '../../components/pagelayout/PageLayout';
import { SellPage } from '../../data/PageData';

const Sell = (props) => {

    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} roles={props.roles} currentRoleType={props.currentRoleType} handleRoleType={props.handleRoleType} />
            <PageLayout pageData={SellPage} />
        </div>
    );
};

export default Sell;

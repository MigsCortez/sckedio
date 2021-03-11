import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import PageLayout from '../../components/pagelayout/PageLayout';
import { BuildPage } from '../../data/PageData';

const Build = (props) => {
    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} roles={props.roles} currentRoleType={props.currentRoleType} handleRoleType={props.handleRoleType} />
            <PageLayout pageData={BuildPage} />
        </div>
    );
};

export default Build;

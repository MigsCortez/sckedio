import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import PageLayout from '../../components/pagelayout/PageLayout';
import { AboutPage } from '../../data/PageData';

const About = (props) => {
    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} roles={props.roles} currentRoleType={props.currentRoleType} handleRoleType={props.handleRoleType} />
            <PageLayout pageData={AboutPage} />
        </div>
    );
};

export default About;

import React from 'react';
import { connect } from 'react-redux';

import './PublicationsPage.scss';

import Header from "app/components/header/Header";

class PublicationsPage extends React.Component {
    render(){
        const { user } = this.props.authentication;
        return (
            <div className="publication-page">
                <Header headerTitle="Domicilios Test" user={user} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication
    };
}

export default connect(mapStateToProps)(PublicationsPage);
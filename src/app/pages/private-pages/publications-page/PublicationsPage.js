import React from 'react';
import { connect } from 'react-redux';

import './PublicationsPage.scss';

import Header from "app/components/header/Header";
import PublicationWidget from "app/components/publication-widget/PublicationWidget";
import PublicationList from "app/components/publication-list/PublicationList";

class PublicationsPage extends React.Component {
    render(){
        const { user } = this.props.authentication;
        return (
            <div className="publication-page">
                <Header headerTitle="Domicilios Test" user={user} />
                <div className="publication-page__comments">
                    <div className="publication-page__wrapper">
                        <PublicationWidget/>
                        <PublicationList/>
                    </div>
                </div>
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
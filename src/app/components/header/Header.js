import React from 'react';
import { connect } from 'react-redux';

import "./Header.scss";

import { history } from "../../helpers/history";

class Header extends React.Component{
    constructor(props){
        super(props)
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut(e){
        history.push('/login')
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    render(){
        const { user, headerTitle } = this.props;
        return (
            <header className="header">
                <div className="header__content header__content--left"></div>
                <div className="header__content header__content--center header__title">{headerTitle}</div>
                <div className="header__content header__content--right">
                    <span className="header__greeting">Hola! {user.firstName}</span>
                    <span className="header__logout" onClick={this.handleLogOut}><i className="fa fa-sign-out-alt"></i></span>
                </div>
            </header>
        )
    }
}


function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user,
        history
    };
}

export default connect(mapStateToProps)(Header);
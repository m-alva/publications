import React from 'react';
import "./Header.scss";

class Header extends React.Component{
    render(){
        const { user, headerTitle } = this.props;
        return (
            <header className="header">
                <div className="header__content header__content--left"></div>
                <div className="header__content header__content--center header__title">{headerTitle}</div>
                <div className="header__content header__content--right">
                    <span className="header__hamburger-menu"><i className="fa fa-bars"></i></span>
                    <span className="header__greeting">Hola! {user.firstName}</span>
                </div>
            </header>
        )
    }
}

export default Header;
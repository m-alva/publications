import React from 'react';
import "./Header.scss";

class Header extends React.Component{
    render(){
        const { user, headerTitle } = this.props;
        return (
            <header className="header">
                <div className="header__content header__content--left"></div>
                <div className="header__content header__content--center header__title">{headerTitle}</div>
                <div className="header__content header__content--right header__greeting">Hola! {user.firstName}</div>
            </header>
        )
    }
}

export default Header;
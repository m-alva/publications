import React from 'react';
import "./Header.scss";

class Header extends React.Component{
    render(){
        const { user, headerTitle } = this.props;
        return (
            <div className="header">
                <div className="header__title">{headerTitle}</div>
                <div className="header__greeting">Hola! {user.firstName}</div>
            </div>
        )
    }
}

export default Header;
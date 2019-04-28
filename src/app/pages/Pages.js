import React from "react";
import { connect } from 'react-redux';

import styled from "styled-components";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { PrivateRoute } from './private-pages/PrivateRoute';
import { history } from '../helpers/history';

import LoginPage from "./login-page/LoginPage";
import RegisterPage from "./register-page/RegisterPage";
import PublicationsPage from "./private-pages/publications-page/PublicationsPage";

class Pages extends React.Component  {

  state = {
    routeLocation : null,
  }

  constructor(props) {
    super(props);

    const { location } = this.props;
    this.state = {
      routeLocation: location
    }
    history.listen((location, action) => {
      // clear alert on location change
      this.setState({
        routeLocation: location,
      })
    });
  }
  render(){
    console.log("render",this);
    var { routeLocation } = this.state;
    return (
      <Wrapper>
        <TransitionGroup className="transition-group">
          <CSSTransition
            key={routeLocation.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
          >
            <section className="route-section">
              <Switch location={routeLocation}>
                <PrivateRoute exact path="/" component={PublicationsPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </Switch>
            </section>
          </CSSTransition>
        </TransitionGroup>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  div.transition-group {
    position: relative;
  }

  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;

function mapStateToProps(state) {
    const { alert, location } = state;
    return {
        alert
    };
}

export default withRouter(connect(mapStateToProps)(Pages));

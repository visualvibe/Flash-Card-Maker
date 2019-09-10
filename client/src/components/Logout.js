import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/UserActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <NavLink className="left-link"style={{display:'inline'}} style={{fontSize: '1rem', color: 'grey', textAlign: 'end'}}onClick={this.props.logout} href='/flashcard'>
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
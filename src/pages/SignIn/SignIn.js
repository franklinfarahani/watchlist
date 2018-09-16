import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import PropTypes from 'prop-types';
import Button from '../../components/Button'

class Signin extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.context.router.history.push("/app");
    }
  }

  render() {
    return (
      <div>
        <div>
          <h4>Sign In to start</h4>
          <Button onClick={this.props.signIn}>
            Sign In With Google
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(Signin);
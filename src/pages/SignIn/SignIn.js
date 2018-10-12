import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../config/styleVariables';
import Button from '../../components/Button'

const SignInContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 114px;
  width: 100%;
`

const SignInCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h4 {    
      font-size: 14px;
      line-height: 40px;
      padding-bottom: 8px;
      color: ${colors.subtitle.MEDIUM}
    }

    p {
      font-size: 14px;
      line-height: 40px;
      color: ${colors.subtitle.MEDIUM}
    }

    ${Button} {
      font-size: 18px;
      padding: 0 4px 0 16px;
      height: auto;
    }
  }

`

const GoogleButton = styled.div`
  display: flex;
  width: 112px;
  overflow: hidden;
  align-items: flex-start;
  padding-left: 10px;
`

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
      <SignInContainer>
        <SignInCard>
          <div>
            <Button onClick={this.props.signIn} category='primary'>
              Sign in with
              <GoogleButton>
                <img src={'https://developers.google.com/identity/images/btn_google_signin_light_normal_web_short.png'} alt="Sign in with Google" />
              </GoogleButton>
            </Button>
            <h4>to access your watchlist!</h4>
          </div>
        </SignInCard>
      </SignInContainer>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(Signin);
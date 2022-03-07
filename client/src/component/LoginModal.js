import React, { useState } from 'react';
import styled, {keyframes}  from 'styled-components';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import github_icon from '../icon/github_icon.png';
import google_icon from '../icon/google_icon.png';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setLogout } from '../redux/actions/actions';

// axios.defaults.withCredentials = true;

const  boxFade = keyframes` {
  0% {
  opacity: 0;
  }
  50% {
  opacity: 0.15;
  }
  100% {
  opacity: 0.25;
  }
}
`;
const Login_div = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;

  > .loginmodal {
    width: 480px;
    height: 500px;
    background-color: white;
    position: relative;
    top: 15%;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 8px;
    /* background: #fff; */
    border: 1px solid #8b8585;
    > .close {
      width: 28px;
      height: 28px;
      color: #8b8585;
      float: right;
      font-size: 30px;
      cursor: pointer;
      position: relative;
      top:10px;
      right: 10px;
      opacity: 0.5;
    }
    > .login_div {
      letter-spacing: 3px;
      width: 300px;
      box-sizing: border-box;
      margin: 100px auto 0 auto;
      /* > p.welcome_ment {
        font-style: 8px;
        margin-bottom: 10px;
        opacity: 0;
        position: relative;
        transition: all 0.2s linear;
        animation: ${boxFade} 3s 1s forwards;
      } */
      > p {
        /* margin-top: 100px; */
        margin-bottom: 40px;
        /* color:#626262; */
        font-family: Raleway;
      }

      > .loginId {
        margin-top: 10px auto;
        width: 300px;
        height: 45px;
        outline: 0;
      }
      > .password {
        width: 300px;
        height: 45px;
        margin: 20px auto 15px auto;
        outline: 0;
      }

      > .sign_div {
        width: 300px;
        height: 50px;
        line-height: 50px;
        /* border-radius: 3px; */
        margin: 15px auto 15px auto;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 5px;
        font-weight: 400;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
        background-color: #a1d026;
        color: #fbfff1;
      }

      .line {
        margin-top: 11px;
        width: 1px;
        height: 14px;
        background-color: black;
        opacity: 0.2;
      }
      div.box {
        display: flex;
        height: 45px;
        margin-top: 30px;
      }
      div.join > p,
      div.socialjoin > p {
        color: #a0a0a0;
        float: left;
        letter-spacing: 0.8px;
        width: 148px;
        height: 40px;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
        line-height: 40px;
        font-weight: 400;
        font-size: 14px;
        text-align: center;
        &:hover {
          font-weight: 600;
        }
        > img {
          border-radius: 4px;
          border: 1px solid 0.1;
          width: 15px;
          position: relative;
          left: 6px;
          top: 3px;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    > .loginmodal {
      width: 100%;
      height: 100vh;
      background-color: white;
      position: relative;
      top: 0;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 0px;
      /* background: #fff; */
      border: 1px solid #8b8585;
    }
  }
`;

const LoginModal = ({ loginModal, setLoginModal, handleResponseSuccess }) => {
  let setLoginState = useSelector((state) => state.setLoginReducer);
  let dispatch = useDispatch();
  const history = useHistory();
  // useState로 Input 값 받기
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleClickLoginBtn = () => {
    console.log(loginInfo);
    // axios로 idValue, passwordValue전송.
    const { email, password } = loginInfo;
    if (email === '' || password === '') {
      return alert('이메일과 비밀번호를 입력하세요');
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/login`,
          {
            email,
            password,
          }
          // {
          //   withCredentials: true,
          // }
        )
        .then((data) => {
          console.log(data);
          dispatch(setLogin());
          setLoginModal(!loginModal);
          handleResponseSuccess();
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClickGoogleSocialLoginBtn = () => {
    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code`;
    window.location.assign(GOOGLE_LOGIN_URL);
  };

  return (
    <Login_div>
      <div className="loginmodal">
        <div className="close" onClick={() => setLoginModal(!loginModal)}>
          &times;
        </div>
        <div className="login_div">
          <p
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#a1d026',
            }}
          > 
            BANANA MARKET
          </p>
          <input
            type="text "
            className="loginId input_css2"
            placeholder="이메일을 입력해주세요."
            onChange={handleInputValue('email')}
          />
          <input
            className="password input_css2"
            // type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleInputValue('password')}
          />
          <div className="sign_div" onClick={handleClickLoginBtn}>
            로그인하기
          </div>
          <div className="box">
            <Link to="/signup">
              <div
                className="join"
                onClick={() => {
                  setLoginModal(!loginModal);
                }}
              >
                <p> 회원 가입하기 </p>
              </div>
            </Link>
            <div className="line"></div>
            <div
              className="socialjoin"
              onClick={() => {
                handleClickGoogleSocialLoginBtn();
              }}
            >
              <p>
                <img className="google_icon" src={google_icon} />
                &nbsp; &nbsp;Google 로그인{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Login_div>
  );
};

export default LoginModal;

import React, { useState } from "react";
import styled, {keyframes} from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 

import axios from 'axios';
import {
  setLogin,
  setLogout,
  setUpdateUserInfo,
  setUserInfoNull,
} from '../redux/actions/actions';

import logo_svg from '../icon/logo.svg';
import shopping_cart from '../icon/shopping_cart.svg';
import logo from '../icon/logo.png';
import close from '../icon/close.png';
import next_icon from '../icon/next_icon.png';
import { ReactComponent as WritingIcon } from '../icon/writing_icon.svg';
import { ReactComponent as NextIcon } from '../icon/next_icon.svg';
import { ReactComponent as CartIcon } from '../icon/cart_icon.svg';
import { ReactComponent as PersonIcon } from '../icon/person_icon.svg';
import { ReactComponent as BananaIcon } from '../icon/banana_icon.svg';
const BREAK_POINT_TABLET = 768;
const BREAK_POINT_PC = 1200;

const MenuModalArea = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100vh;
  /* margin: auto; */
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  .modal_back {
    width: 100%;
    height: 100vh;
    /* background-color: green; */
  }
`;


const  moveIn = keyframes` {
  0% {
    margin-right:-770px;
  }
  100% {
    margin-right: 0px;
  }
}`;


const  moveOut = keyframes` {
  0% {
    margin-right: 0px;
  }
  100% {
    margin-right:-770px;
  }
}`;

const ModalWrapper = styled.div`
  @media only screen and (max-width: 1200px) {
    margin-right:-770px;
    animation: ${moveIn} 0.15s forwards;
  }
  box-shadow: 0px 5px 8px #00000012;
  width: 100%;
  height: 100%;
  /* height: 50px; */
  position: fixed;
  z-index: 100;
  background: #ffffe1;
  .announcement {
    text-align: left;
    padding-left: 30px;
    margin-top: 10px;
    position: relative;
    line-height: 30px;
    div.name_text {
      font-size: 22px;
      color: #3e3e3e;
      display:flex;
      @media only screen and (max-width: 450px) {
        font-size: 0.95em;

      }

      > div.logout_btn {
        padding: 0 10px;
        margin-top: 15px;
        margin-left: auto;
        margin-right: 30px;
        height: 30px;
        box-sizing: 10px;
        border: 1px solid #ff8000;
        color: #ff8000;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 400;
      }
      > div.login_btn {
        padding: 0 10px;
        margin-top: 15px;
        margin-left: auto;
        margin-right: 8px;
        height: 30px;
        box-sizing: 10px;
        border: 1px solid #ff8000;
        color: #ff8000;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 400;
      }
      div.signup_btn {
        padding: 0 10px;
        margin-top: 15px;
        margin-right: 30px;
        height: 30px;
        box-sizing: 10px;
        background-color: #ff8000;
        color: #ffffe1;
        border: 1px solid #ff8000;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 300;
      }
      > div {
        font-weight: 600;
        display: inline-block;
        width: auto;
        > span.text {
          margin: 0 4px;
          position: relative;
          bottom: -4px;
        }
        > span.login_ment {
          
        }
        > span.underline {
          display: block;
          width: 100%;
          height: 10px;
          position: relative;
          top:34px;
          background-color:#ffecba;
        }
      }
      > p{
        padding-left: 2px;
        padding-top: 14px;
      }
    }
    > div.top_box_btn {
      width: 50px;
      height: 10px;
      float: left;
      background-color: green;
    }
  }
  .menulist {
    padding: 40px 30px;
  }
  .menu {
    /* background-color: red; */
    padding: 30px 0;
    margin-bottom: 8px;
    background-color: #fffff6;
    box-shadow: 1px 1px 8px 5px #f0f0bc57;
    display: flex;
    svg {
      width: 40px;
      margin-left: 30px;
      @media only screen and (max-width: 430px) {
        margin-left: 23px;
      }
    }
    .icon_direction {
      opacity: 0.7;
      margin-top: 18px;
      margin-left: auto;
      margin-right: 15px;
      > svg {
        width: 15px;
        margin-left: 20px;
      }
    }

    > div.menu_text_box {
      width: 230px;
      p {
        padding-left: 30px;
        @media only screen and (max-width: 430px) {
          padding-left: 20px;
        }
        &.title {
          letter-spacing: 1px;
          font-weight: 600;
          font-size: 18px;
          color: #303030;
        }
        &.text {
          padding-top: 12px;
          font-weight: 400;
          font-size: 14px;
          color: #6c6c6c;
        }
      }
    }
  }
  .mypage_btn {
    padding: 25px 0;
    /* margin-bottom: 8px;
    background-color: #fffff6;
    box-shadow:1px 1px 8px 5px #f0f0bc57; */
    display: flex;
    margin-top: 20px;
    height: 60px;
    border-radius: 10px;
    box-shadow: none;
    padding: 10px 0 10px 0;
    background-color: #f0f0a2;
    svg {
      width: 30px;
      margin-left: 33px;
      @media only screen and (max-width: 430px) {
        margin-left: 26px;
      }
    }
    > div.menu_text_box {
      width: 230px;
      height: auto;
      p {
        padding-left: 34px;
        @media only screen and (max-width: 430px) {
          padding-left: 26px;
        }
        &.title {
          line-height: 40px;
          letter-spacing: 1px;
          font-weight: 600;
          font-size: 16px;
          color: #797938;
        }
      }
    }
    .icon_direction {
      opacity: 0.7;
      margin-top: 13px;
      margin-left: auto;
      margin-right: 15px;
      > svg {
        width: 15px;
        margin-left: 20px;
      }
    }
  }

  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    width: 450px;
    padding: 0;
    position: static;
    float: right;

    > div .logo {
      display: none;
    }
    .menu_wrapper {
      .icon.menu_icon {
        opacity: 0.5;
        width: 43px;
        padding: 17px 0 17px 17px;
      }
      .icon {
        width: 60px;
        padding: 17px;
        .icon_img {
          height: 26px;
        }
      }
    }
  }
`;

const HeaderBox = styled.div`
  //( 기본적용 )모바일 : 768px 이하 ::  @media only제외한 모든 사이즈 적용
  width: 100%;
  height: 60px;
  padding: 0 10px;
  margin: auto;
  /* border: 2px solid black;
  background-color: violet; */

  .logo {
    height: 100%;
    padding: 12px;
    /* border: 1px solid black; */
    float: left;
    .logo_icon {
      height: 26px;
    }
  }
  .menu_wrapper {
    height: 100%;
    float: right;
    .icon {
      width: 50px;
      height: 100%;
      padding: 14px;
      /* border: 1px solid black; */
      float: left;
      .icon_img {
        height: 22px;
        /* background-color: white; */
      }
    }
  }
`;

const ModalBack = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  z-index: -1;
  /* background-color: red; */
`;

const MenuModal = ({ setMenuModal, setLoginModal }) => {
  const history = useHistory();
  let dispatch = useDispatch();
  let setLoginState = useSelector((state) => state.setLoginReducer);
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  // 모달 밖 영역 클릭 시 모달 창 닫히는 함수
  const handleClickClose = (e) => {
    setMenuModal(false);
    console.log('누름');
  };

  // 로그아웃 버튼 클릭 시 진행되는 함수
  const handleChangeAuth = (e) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/logout`, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch(setLogout());
        dispatch(setUserInfoNull());
        console.log('로그아웃되었습니다');
        history.push({
          pathname: '/',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <MenuModalArea>
        <ModalWrapper>
          <HeaderBox>
            <div className="logo">
              <img src={logo_svg} className="logo_icon" />
            </div>
            <div className="menu_wrapper">
              <div className="icon menu_icon">
                <img
                  src={close}
                  className="icon_img"
                  onClick={() => {
                    setMenuModal(false);
                  }}
                />
              </div>
            </div>
          </HeaderBox>
          <div className="announcement">
            {setLoginState ? (
              <div className="name_text">
                <div>
                  <span className="underline"></span>
                  <span className="text">{setUserInfo.nickName}</span>
                </div>
                <p>님 환영합니다.</p>
                <div
                  className="logout_btn"
                  onClick={() => {
                    setMenuModal(false);
                    handleChangeAuth();
                  }}
                >
                  {' '}
                  로그아웃{' '}
                </div>
              </div>
            ) : (
              <div className="name_text">
                <div>
                  <span className="underline"></span>
                  <span className="text login_ment">
                    로그인 후 이용해주세요
                  </span>
                </div>
                <div
                  className="login_btn"
                  onClick={() => {
                    setMenuModal(false);
                    setLoginModal(true);
                  }}
                >
                  {' '}
                  로그인{' '}
                </div>
                <Link
                  to="/signup"
                  onClick={() => {
                    setMenuModal(false);
                  }}
                >
                  <div
                    className="signup_btn"
                    onClick={() => {
                      setMenuModal(false);
                    }}
                  >
                    {' '}
                    회원가입{' '}
                  </div>
                </Link>
              </div>
            )}
          </div>
          <ul className="menulist">
            <Link
              to="/posting"
              onClick={() => {
                setMenuModal(false);
              }}
            >
              <li className="menu">
                <WritingIcon
                  className="icon_img"
                  stroke="#4d4c54"
                ></WritingIcon>
                <div className="menu_text_box">
                  <p className="title">게시글 작성 </p>
                  <p className="text"> 바나나마켓을 열어보세요. </p>
                </div>
                <div className="icon_direction">
                  <NextIcon stroke=" #4d4c54"></NextIcon>
                </div>
              </li>
            </Link>
            <Link
              to="/mylist"
              onClick={() => {
                setMenuModal(false);
              }}
            >
              <li className="menu">
                <CartIcon className="icon_img" stroke="#4d4c54"></CartIcon>
                <div className="menu_text_box">
                  <p className="title">나의 마켓</p>
                  <p className="text">참여한 내용을 확인합니다. </p>
                </div>
                <div className="icon_direction">
                  <NextIcon stroke=" #4d4c54"></NextIcon>
                </div>
              </li>
            </Link>
            <Link to={setLoginState ? '/mypage' : '/nullpage'}>
              <li
                className="menu"
                onClick={() => {
                  setMenuModal(false);
                }}
              >
                <PersonIcon
                  className="icon_img"
                  stroke="#feb763"
                  strokeWidth="1.2px"
                ></PersonIcon>
                <div className="menu_text_box">
                  <p className="title ">마이페이지 </p>
                  <p className="text"> 바나나마켓 회원정보입니다. </p>
                </div>
                <div className="icon_direction">
                  <NextIcon stroke=" #4d4c54"></NextIcon>
                </div>
              </li>
            </Link>
            <Link to="/">
              <li
                className="mypage_btn"
                onClick={() => {
                  setMenuModal(false);
                }}
              >
                <BananaIcon
                  PersonIcon
                  className="icon_img icon_mypage"
                ></BananaIcon>
                <div className="menu_text_box">
                  <p className="title title_mypage">바나나마켓 이용방법</p>
                </div>
                <div className="icon_direction">
                  <NextIcon stroke="#797938"></NextIcon>
                </div>
              </li>
            </Link>
          </ul>
        </ModalWrapper>
        <div
          className="modal_back"
          onClick={() => {
            setMenuModal(false);
          }}
        ></div>
      </MenuModalArea>
      <ModalBack onClick={handleClickClose}></ModalBack>
    </>
  );
};

export default MenuModal;

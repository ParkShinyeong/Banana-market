import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../App.css'; //이거 써줘야 css적용됨.
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setLogout } from '../redux/actions/actions';
import { postListReset } from '../redux/actions/actions';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import MenuModal from './MenuModal';

import person_icon from '../icon/person_icon.svg';
import logo_svg from '../icon/logo.svg';
import logo from '../icon/logo.png';
import login from '../icon/login.png';
import chat_icon from '../icon/chat_icon.png';
import menu_icon from '../icon/menu_icon.png';
import { ReactComponent as PersonIcon } from '../icon/person_icon.svg';
import { ReactComponent as MenuIcon } from '../icon/menu_icon.svg';
import { ReactComponent as ChatIcon } from '../icon/chat_icon.svg';
import { ReactComponent as SearchIcon } from '../icon/search_icon.svg';
import { ReactComponent as TopIcon } from '../icon/top_icon.svg';

const BREAK_POINT_TABLET = 768;
const BREAK_POINT_PC = 1200;

const TopButton = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: #bfd780;
  box-shadow: 2px 4px 7px 1px #00000012;
  bottom: 25px;
  right: 16px;
  padding-top: 3px;
  z-index: 10;
  display: block;
  &.hidden{
    display: none;
  }
  svg {
    padding: 12px 18px;
    opacity: 0.9;
  }
`;
const MenuModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 9999;
`;

const LoginModalWrapper = styled.div`
  /* position: absolute;
  width: 100%;
  z-index: 9999; */
`;
const SearchModalWrapper = styled.div`
  /* padding-top: 10px; */
  position: fixed;
  width: 100%;
  z-index: 9999;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    padding-top: 0px;
    left: 145px;
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    left: 182px;
  }
`;
const Wrapper = styled.div`
  //( 기본적용 )모바일 : 768px 이하 ::  @media only제외한 모든 사이즈 적용
  width: 100%;
  height: 100%;
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
      margin-top: 5px;
      height: 22px;
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
      .icon_img.login_img {
        height: 19px;
        margin-top: 1px;
      }
    }
    .icon.admin {
      width: 50px;
      line-height: 22px;
      text-align: center;
      border-radius: 10px;
      color: #ff4342;
      border: 1px solid #ff4342;
      height: 100%;
      padding: 4px;
      margin-top: 10px;
      font-size: 12px;
    }
  }

  .search_box2 {
    float: left;
    width: 100%;
    height: 50px;
    padding: 0 12px;
    /* background-color: gray; */
    .search {
      width: 100%;
      height: 36px;
      margin: auto;
      border-radius: 100px;
      border: 1px solid #f7f7f6;
      background-color: #f7f7f7;
      padding: 8px 15px;
      > svg {
        width: 16px;
        float: left;
      }
      > span {
        padding-left: 15px;
        float: left;
        line-height: 20px;
        color: #9ba2a88c;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .search_box1 {
      display: none;
    }
  }
  // 태블릿 : 1200px ~ 768px :: 768px 이상 적용되는 css
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    .logo {
      padding: 12px 14px 12px 0;
      .logo_icon {
        margin-top: 5px;
        height: 28px;
      }
    }
    .search_box1 {
      width: calc(100vw - 400px);
      height: 50px;
      float: left;
      padding: 10px 10px 0 60px;
      /* background-color:red; */
      .search {
        width: 100%;
        height: 40px;
        margin: auto;
        border-radius: 100px;
        border: 1px solid #f7f7f6;
        background-color: #f7f7f7;
        padding: 8px 15px;
        > svg {
          padding-top: 3px;
          width: 16px;
          float: left;
        }
        > span {
          padding-top: 2px;
          padding-left: 15px;
          float: left;
          line-height: 20px;
          color: #9ba2a88c;
        }
      }
    }
    .search_box2 {
      display: none;
    }
  }
  // PC : 1200px 이상 :: 1200px 이상 적용되는 css
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    width: 1200px;
    padding: 0;
    /* background-color: purple; */

    /* .logo {
      padding: 12px 14px 12px 0;
      .logo_icon {
        margin-top: 5px;
        height: 28px;
      }
    } */
    .search_box1 {
      width: 833px;
      height: 60px;
      padding: 12px 20px 0px 100px;
      .search {
        width: 100%;
        height: 40px;
        margin: auto;
        border-radius: 100px;
      }
    }
    .menu_wrapper {
      .icon.menu_icon {
        width: 43px;
        padding: 17px 0 17px 17px;
      }
      .icon {
        width: 60px;
        padding: 17px;
        .icon_img {
          height: 26px;
        }
        .icon_img.login_img {
          height: 22px;
          margin-top: 2px;
        }
      }
      .icon.admin {
        width: 50px;
        line-height: 22px;
        text-align: center;
        border-radius: 10px;
        color: #ff4342;
        border: 1px solid #ff4342;
        height: 100%;
        padding: 4px;
        margin-top: 14px;
        font-size: 12px;
      }
    }
  }
`;

const Header = ({ handleResponseSuccess }) => {
  let setLoginState = useSelector((state) => state.setLoginReducer);
  let setAdminLoginState = useSelector((state) => state.setAdminLoginReducer);
  let dispatch = useDispatch();
  const history = useHistory();

  // PostList > PostList 리로딩 - 로고 눌렀을때 list 요청함수
  // const postList = async (pageNumber) => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API_URL}/articles/lists`, {
  //       params: {
  //         category: '',
  //         page: pageNumber,
  //         sort: '',
  //       },
  //     })
  //     .then((listData) => {
  //       dispatch({
  //         type: 'SHOW_MORE_POSTLIST',
  //         payload: listData.data.data.articleList,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useState로 Modal창 On(true)/Off(false)
  let [searchBox, setSearchBox] = useState(false);
  let [loginModal, setLoginModal] = useState(false);
  let [menuModal, setMenuModal] = useState(false);

  // 스크롤 페이지 상단으로 이동 함수
  const toTheTop = () => {
    window.scrollTo(0, 0);
  };

  // 스크롤 내릴 때 헤더 변화주기
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }
  useEffect(()=>{
      window.addEventListener('scroll', updateScroll);
  });


  return (
    <>
      <TopButton className={scrollPosition > 400? '' : 'hidden'} onClick={toTheTop}>
        <TopIcon ></TopIcon>
      </TopButton>
      {searchBox ? (
        <SearchModalWrapper>
          <SearchModal
            className="search_modal"
            setSearchBox={setSearchBox}
          ></SearchModal>
        </SearchModalWrapper>
      ) : (
        <div></div>
      )}
      {loginModal ? (
        <LoginModalWrapper>
          <LoginModal
            className="login_modal"
            loginModal={loginModal}
            setLoginModal={setLoginModal}
            handleResponseSuccess={handleResponseSuccess}
          ></LoginModal>
        </LoginModalWrapper>
      ) : (
        <div></div>
      )}
      {menuModal ? (
        <MenuModalWrapper>
          <MenuModal
            className="menu_modal"
            setMenuModal={setMenuModal}
            setLoginModal={setLoginModal}
          ></MenuModal>
        </MenuModalWrapper>
      ) : (
        <div></div>
      )}
      <div className={scrollPosition < 50 ? "header" : "header change_header"}>
        <Wrapper>
          <Link to="/list">
            <div
              className="logo"
              onClick={() => {
                toTheTop();
                console.log('상단이동');
                // dispatch(postListReset());
                // postList(0);
              }}
            >
              <img src={logo_svg} className="logo_icon logo_svg" />
            </div>
          </Link>

          <div className="search_box1">
            <div
              className="search"
              onClick={() => {
                setSearchBox(true);
              }}
            >
              <SearchIcon stroke="#868E96"></SearchIcon>
              <span>검색어를 입력하세요</span>
            </div>
          </div>
          <div className="menu_wrapper">
            {setAdminLoginState ? (
              <div
                className="icon admin"
                onClick={() => {
                  history.push('/admin');
                }}
              >
                관리자
              </div>
            ) : setLoginState ? (
              <div></div>
            ) : (
              <div className="icon login_icon">
                <PersonIcon
                  className="icon_img login_img"
                  stroke="#4d4c54"
                  strokeWidth="1.5px"
                  onClick={() => {
                    setLoginModal(true);
                  }}
                ></PersonIcon>
              </div>
            )}
            <Link to={setLoginState ? '/chat/0' : '/nullpage'}>
              <div className="icon chat_icon">
                <ChatIcon stroke="#4d4c54"></ChatIcon>
              </div>
            </Link>
            <div className="icon menu_icon">
              <MenuIcon
                stroke="#4d4c54"
                onClick={() => {
                  setMenuModal(true);
                }}
              ></MenuIcon>
            </div>
          </div>
          <div className="search_box2">
            <div
              className="search"
              onClick={() => {
                setSearchBox(true);
              }}
            >
              <SearchIcon stroke="#868E96"></SearchIcon>
              <span>검색어를 입력하세요</span>
            </div>
          </div>
        </Wrapper>
        {/* <SearchModal></SearchModal>
        <LoginModal></LoginModal>
        <MenuModal></MenuModal> */}
      </div>
    </>
  );
};

export default Header;

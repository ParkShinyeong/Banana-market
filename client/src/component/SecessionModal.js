import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import github_icon from "../icon/github_icon.png";
import { useSelector, useDispatch } from 'react-redux'; 
import { setLogin, setLogout, setUpdateUserInfo} from "../redux/actions/actions";
import warning from '../icon/warning.png'
import axios from "axios";
axios.defaults.withCredentials = true;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;

  > .secession_modal {
    width: 480px;
    background-color: white;
    position: relative;
    top: 15%;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 8px;
    text-align: center;
    /* background: #fff; */
    border: 1px solid #8b8585;
    > .close {
      width: 28px;
      height: 28px;
      color: #8b8585;
      float: right;
      font-size: 30px;
      cursor: pointer;
    }
    > img.icon {
      padding: 30px 0 0 25px;
    }
    > .title {
      font-size: 20px;
      color: #444;
    }
    > .secession_box {
      box-sizing: border-box;
      margin: 30px auto 0 auto;
      > .password {
      }
      >span {
        display: inline-block;
        font-size: 14px;
        margin-top: 14px;
        color:#a5a5a5;

      }

      > .confirm_btn {
        width: 257px;
        height: 45px;
        /* border-radius: 3px; */
        margin: 30px auto 50px auto;
        box-sizing: border-box;
        cursor: pointer;
        line-height: 45px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 15px;
        text-align: center;
        cursor: pointer;
        border-radius:  10px;
        background-color: rgb(0, 0, 0, 0.1);
        color: rgb(0, 0, 0, 0.5);
        &:hover {
          border: 0px;
          background-color: #ff4342;
          color: #ffe1e0;
      }
    }
  }
  @media only screen and (max-width: 768px){
    > .secession_modal {
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
      .title {
        margin-top: 170px;
      }
    }
  }
}
`;

const SecessionModal = ({ setIsSecessionModalOn }) => {
  const history = useHistory();
  let setLoginState = useSelector((state) => state.setLoginReducer); 
  let setUserInfo = useSelector((state) => state.setUserInfoReducer); 
  let dispatch = useDispatch();

  // useState로 Input 값 받기
  let [inputPassword, setInputPassword] = useState('');
  
  //Input 값 받는 함수
  const handleChangePassword = (e) => {
    setInputPassword(e.target.value);
	};

  //탈퇴하기 버튼 클리 시 진행되는 함수 
  const handleClickSecession = (e) => {
    // axios : 비밀번호 확인 후 탈퇴 진행
    if(inputPassword !== '') {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/login`,
          {
            email: setUserInfo.email,
            password: inputPassword,
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          axios
            .delete(
              `${process.env.REACT_APP_API_URL}/users/info`,
              {
                withCredentials: true,
              }
            )
          .then((data) => {
            alert('성공적으로 탈퇴되었습니다.')
            dispatch(setLogout())
            setIsSecessionModalOn(false);
            history.push('/');
          })
          .catch((err) => {
            alert('탈퇴되지 않았습니다.')
            console.log(err);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <Wrapper>
      <div className="secession_modal">
        <div className="close" onClick={() => setIsSecessionModalOn(false)}>
          &times;
        </div>
        <img className='icon' src={warning}/>
        <div className='title'>회원 탈퇴</div>
        <div className="secession_box">
          <input
            className="password input_css"
            // type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleChangePassword}
          />
          <span>사이트 내의 회원님의 모든 정보가 삭제됩니다.</span>
          <div className="confirm_btn" onClick={handleClickSecession}>
            탈퇴하기
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SecessionModal;

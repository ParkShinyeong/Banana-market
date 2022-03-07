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
    box-sizing: content-box;
    margin: 0 auto;
    border-radius: 8px;
    text-align: center;
    padding-bottom: 30px;
    /* background: #fff; */
    /* border: 1px solid #8b8585; */
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
      box-sizing: content-box;
      margin: 30px auto;
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
        margin: 30px auto;
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
        > img.icon {
          padding: 80px 0 0 25px;
        }
        .title {
        }
        > .secession_box {
          box-sizing: border-box;
          margin: 30px auto 0 auto;
          > .password {
          }
          >span {
            display: block;
            font-size: 14px;
            margin-top: 14px;
            color:#a5a5a5;
          }
      }
    }
  }
`;


const DeleteModal = ({ setIsDeleteModalOn, postDelete, postId}) => {
  const history = useHistory();
  const deleteConfirm = () => {
    postDelete(postId); 
    setIsDeleteModalOn(false); 
    history.push('/mylist');
  }

  return (
    <Wrapper>
      <div className="secession_modal">
        <div className="close" onClick={setIsDeleteModalOn(false)}>
          &times;
        </div>
        <img className='icon' src={warning}/>
        <div className='title'>게시글 삭제</div>
        <div className="secession_box">
          <span>정말 글을 삭제하시겠습니까? </span>
          <span>확인을 누르면 글이 삭제됩니다.</span>
          <div className="confirm_btn" 
          onClick={deleteConfirm()}>
            삭제하기
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default DeleteModal;

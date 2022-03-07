import React, { useState, useRef} from "react";
import styled from "styled-components";
import '../App.css'; //이거 써줘야 css적용됨.
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  searchPostListReset,
} from '../redux/actions/actions';

import { ReactComponent as CloseIcon } from '../icon/close_icon.svg';
import { ReactComponent as ArrowIcon } from '../icon/arrow_icon.svg';
import { ReactComponent as SearchIcon } from '../icon/search_icon.svg';
import close from "../icon/close.png";
import back_icon from "../icon/back_icon.png";
import { ReactDOM } from 'react-dom';

const BREAK_POINT_TABLET = 768;
const BREAK_POINT_PC = 1200;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin : auto;

  .search_box{
    width: 100%;
    height: 300px;
    padding: 10px 22px 0 22px;
    background-color: #f8f9fa;
    box-shadow: 0px 5px 8px #00000012;
    border-radius: 10px;
    .search {
      width: 100%;
      height: 40px;
      margin : auto;
      border-radius: 100px;
      background-color: white;
      border: solid 1px #dcdfd5; 
      padding: 3px 15px ;
      
      .icon{
        width: 30px;
        float: left;
      }
      .icon.exit_icon{
        margin-top: 9px;
      }
      .icon.delete_icon{
        background-color: #868E96;
        opacity: 0.5;
        border-radius: 100px;
        height: 18px;
        width: 18px;
        position: relative;
        top: 6px;
        padding-top: 4px;
        padding-left: 5px;
      }
      .line{
        position: relative;
        top: 7px;
        left: 14px;
        width:1px;
        height: 14px;
        float: left;
        background-color: #dcdfd5;
      }
      >span{
        padding-left: 15px;
        float: left;
        line-height: 20px;
        color: rgba(0,0,0,0.5);
      }
      .icon_wrapper{
        float: right;
        /* border: 1px solid red; */
        > svg{
          width: 16px;
          margin-left:30px;
          padding-top: 6px;
        }
      }
    }
    .word_box {
      margin-top: 10px;
      width : 100%;
      margin-top: 20px;
      /* border: 1px solid red; */
      > div {
        color: #c2c4c5;
        font-weight: 500;
        margin-bottom: 5px;
        cursor: pointer;
        .word {
          margin-top: 10px;
          margin-right: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          background-color: #f1f2f3;
          /* border: 1px solid #f0f0a2; */
          color: #a5b2bf;
          font-weight: 400;
          float: left;
          &:hover{
            background-color: white;
          }
        }
      }
    }
  }
  .input{
    width: calc(100vw - 220px);
    height: 33px;
    border: none;
    font-size: 16px;
    font-weight: 400;
    color:#737964;
    &:focus {
      outline: 0;
    }
  }
  
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px){
    .search_box{
      width: calc(100vw - 430px);
      float: left;
      padding: 10px 20px 0 20px;
      margin-left: 75px;
    }     
    .input {
      width: calc(100vw - 630px);
    } 
  }

  @media only screen and (min-width: ${BREAK_POINT_PC}px){
    width: 1200px;
    padding: 0;
    /* background-color: purple; */
    .search_box{
      width:753px;
      padding: 12px 20px 0px 20px;
      margin-left: 70px;
      .search {
        width: 100%;
        height: 40px;
        margin: auto;
        border-radius: 100px;
      }
    }
    .input {
      width: 500px;
    }
  }
`;

const ModalBack = styled.div `
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0px;
  z-index: -1;
  /* background-color: red; */
`;

const SearchModal = ({ setSearchBox }) => {
  const history = useHistory();
  const setSearchInfo = useSelector((state) => state.setSearchInfoReducer);
  let dispatch = useDispatch();
  // 모달 밖 영역 클릭 시 모달 창 닫히는 함수 
  const handleClickClose = (e) => {
    setSearchBox(false);
  }

  // useState로 Input 값 받기
  let[searchWord, setSearchWord] = useState('');

  // Input 값 받는 함수
  const handleChangeSearchWord = (e) => {
    setSearchWord(e.target.value);
  }
  
  // 검색하기 icon 클릭 시 검색 실행되는 함수
  const handleClickSearch = (e) => {
    // axios : 검색 요청
    setSearchBox(false);
    let word = document.getElementById('input').value
    if ( word === '' ){
      setSearchBox(false);
      return;
    }
    if (word !== setSearchInfo.searchWord) {
      // 검색어 바뀔 떄 
      dispatch(searchPostListReset());
      dispatch({
        type: 'SET_SEARCH_PAGE_NUM',
        payload: 0
      })
    }
    dispatch({
      type: 'SET_WORD_FOR_SEARCH',
      payload: searchWord,
    });
    toTheTop();
    history.push(`/searchlist/${word}`);
  }

  // Enter 입력 시 검색 실행되는 함수
  const onCheckEnter = (e) => {
    if(e.key === 'Enter') {
      handleClickSearch();
      setSearchBox(false);
    }
  }
  
  // 스크롤 페이지 상단으로 이동 함수 
  const toTheTop= () => { 
    window.scrollTo(0,0); 
  }

  // 검색어 클릭 시 검색 실행되는 함수
  const handleClickSearchWord = (e) => {
    //axios 로 word 전송
    let word = e.target.innerText;
    setSearchBox(false);
    if (e.target.innerText !== setSearchInfo.searchWord) {
      // 검색어 바뀔 떄 
      dispatch(searchPostListReset());
      dispatch({
        type: 'SET_SEARCH_PAGE_NUM',
        payload: 0
      })
    }
    dispatch({
      type: 'SET_WORD_FOR_SEARCH',
      payload: word,
    });
    toTheTop();
    history.push(`/searchlist/${e.target.innerText}`);
  }

  return (
    <>
      <Wrapper>
        <div className='search_box'>
          <div className='search'>
            <ArrowIcon stroke='#868E96' className="icon exit_icon" onClick={() => {setSearchBox(false);}}></ArrowIcon>
            <span>
              <input id='input' className='input' type='text' value={searchWord} onChange={handleChangeSearchWord} onKeyPress={onCheckEnter}/>
            </span>
            <div className='icon_wrapper'>
              <div  className="icon delete_icon" >
                <CloseIcon stroke='#868E96'onClick={(e)=>{setSearchWord('')}} ></CloseIcon> 
              </div>
              <div className='line'></div>
              <SearchIcon stroke='#868E96'onClick={handleClickSearch}></SearchIcon>  
            </div>
          </div>
          <div className='word_box'>
            <div>추천 검색어</div>
            <div>
              <div className='word' onClick={handleClickSearchWord}>사과</div>
              <div className='word' onClick={handleClickSearchWord}>오징어</div>
              <div className='word' onClick={handleClickSearchWord}>배</div>
              <div className='word' onClick={handleClickSearchWord}>김치</div>
              <div className='word' onClick={handleClickSearchWord}>수박</div>
              <div className='word' onClick={handleClickSearchWord}>딸기</div>
              <div className='word' onClick={handleClickSearchWord}>고등어</div>
              <div className='word' onClick={handleClickSearchWord}>베이글</div>
              <div className='word' onClick={handleClickSearchWord}>우유</div>
              <div className='word' onClick={handleClickSearchWord}>요구르트</div>
            </div>
          </div>
        </div>
      </Wrapper>
      <ModalBack onClick={handleClickClose}></ModalBack>
    </>
  );
};

export default SearchModal;
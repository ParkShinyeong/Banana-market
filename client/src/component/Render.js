import React, { useEffect, useState } from "react";
import styled,  {keyframes} from "styled-components";
import { Link } from "react-router-dom";
import '../App.css'; //이거 써줘야 css적용됨.

import main from '../icon/main.jpg'
import logo_svg from '../icon/logo.svg';
import { ReactComponent as NextIcon } from '../icon/next_icon.svg';
import page1_1 from '../icon/page1_1.png';
import page1_2 from '../icon/page1_2.png';
import page2_1 from '../icon/page2_1.png';
import page2_2 from '../icon/page2_2.png';

import chatListImg from '../icon/listImg.png';
import chatListImg2 from '../icon/listImg2.png';
import save_money from '../icon/piggy-bank.png';
import reduction from '../icon/recycle-bin.png';
import detail_img from '../icon/detail.png';

const BREAK_POINT_TABLET = 768;
const BREAK_POINT_PC = 1200;


const  moveButton = keyframes` {
  0% {
    opacity: 0;
    right: 10px;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    right:0px;
  }
}
`;
const  fadeInText= keyframes` {
  0% {
    opacity: 0;
    top: 60px;
  }
  100% {
    opacity: 1;
    top: 0px;
  }
}
`;
// 사라졌다 나타나기
const fadeIn = keyframes`
from {
  opacity: 0;
  
}to {
  opacity: 1;
}`;

// 아래서 위로 올라오기

const slideUp = keyframes`
from{
  transform: translateY(50px);
}
to{
  transform: translateY(0px);
}`;

const downLeft = keyframes`
from{
  transform: translate(-30px,-30px);
}
to{
  transform: translate(0,0);
}`;

const upRight = keyframes`
from{
  transform: translate(30px,30px);
}
to{
  transform: translate(0,0);
}`;

const InfoDiv = styled.div`
  width: 100%;
  background-color: #fafafa;
  div.detailDiv {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    height: 850px;

    /* padding-top: 100px; */
    display: grid;
    position: relative;
    grid-gap: 40px;
    grid-template-columns: 55% 45%;
    padding: 100px;
    @media screen and (max-width: 1200px) {
      grid-gap: 20px;

      padding: 100px 70px 100px 0px;
    }
    @media screen and (max-width: 767px) {
      grid-template-columns: auto;
      grid-gap: 0px;
      padding: 0px 20px 0px 20px;
    }
    div.detail {
      height: 645px;
      /* background-color: cornsilk; */
      @media screen and (max-width: 1200px) {
      }
      @media screen and (max-width: 767px) {
        height: 850px;
      }

      h1.detail_title {
        line-height: 1.35;
        margin-top: 80px;
        display: none;
        margin-left: 25px;
        @media screen and (max-width: 1200px) {
          font-size: 29px;
        }
        @media screen and (max-width: 767px) {
          font-size: 23px;
          margin-top: 25px;
          margin-left: 0px;
        }
      }
      h1.detail_title.change_detail_title {
        display: block;
        animation-duration: 0.6s;
        animation-timing-function: ease-out;
        animation-name: ${slideUp};
        animation-fill-mode: forwards;
      }

      h3.small_title {
        margin-left: 25px;
        font-size: 1.5rem;
        font-weight: 500;
        margin-top: 175px;
        color: #8e8e8e;
        @media screen and (max-width: 1200px) {
          font-size: 1.4rem;
        }
        @media screen and (max-width: 767px) {
          font-size: 20px;
          margin-top: 40px;
          position: absolute;

          bottom: 23%;
          margin-left: 0px;
        }
        /* color: #ff8000; */
      }
      div.datail_info {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 30px;
        margin-top: 30px;
        @media screen and (max-width: 1200px) {
          grid-gap: 10px;
        }
        @media screen and (max-width: 767px) {
          grid-template-columns: auto auto;
          position: absolute;
          grid-gap: 40px;
          bottom: 2%;
        }
        div {
          float: left;
        }
        div.detail_box {
          /* background-color: cornsilk; */
          margin-left: 25px;
          display: none;
          height: 160px;
          border-radius: 10px;
          @media screen and (max-width: 767px) {
            margin-left: 0px;
          }
          div {
            float: none;
          }
          div.datail_box_icon {
            width: 60px;
            height: 60px;
            background-color: #ffec8b;
            margin-bottom: 20px;
            margin-top: 5px;
            border-radius: 10px;
            padding: 10px;
            img {
              width: 100%;
              height: 100%;
            }
            @media screen and (max-width: 1200px) {
              width: 55px;
              height: 55px;
            }
            @media screen and (max-width: 767px) {
              width: 50px;
              height: 50px;
            }
          }
          p {
            width: 100%;
            height: 40px;
            font-size: 20px;
            @media screen and (max-width: 767px) {
              font-size: 17px;
              height: 30px;
            }
          }
          span {
            width: 100%;
            color: #212121;
            @media screen and (max-width: 767px) {
              font-size: 15px;
            }
          }
        }
        div.detail_box.change_detail_box {
          display: block;
          animation-duration: 2s;
          animation-timing-function: ease-out;
          animation-name: ${fadeIn};
          animation-fill-mode: forwards;
        }
      }
    }
    div.detail_img {
      height: 645px;
      /* background-color: cadetblue; */
      margin: 0 auto;

      @media screen and (max-width: 767px) {
        position: relative;
        height: 0;
        bottom: 156%;
        width: 265px;
        height: 470px;
      }
      img {
        /* background-color: green; */
        margin-top: 13px;
        @media screen and (max-width: 767px) {
          margin-top: 0;
          width: 265px;
          height: 470px;
          margin-top: 3px;
        }
      }
    }
  }
`;

const ChatPage = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 850px;
  /* background-color: green; */
  /* padding-top: 100px; */
  display: grid;
  position: relative;
  grid-gap: 80px;
  grid-template-columns: 60% 40%;
  padding: 100px;
  @media screen and (max-width: 1200px) {
    padding: 100px 70px 100px 0px;
    grid-template-columns: 65% 35%;
    grid-gap: 40px;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: auto;
    height: 850px;
    grid-gap: 80px;
    padding: 0;
  }

  div.chat_img {
    height: 645px;
    position: relative;
    @media screen and (max-width: 767px) {
      height: 620px;
      padding: 0;
    }

    div.img1 {
      /* width: 315px;
      height: 618px; */
      /* background-color: bisque; */
      border-radius: 50px;
      position: absolute;
      bottom: 5%;
      left: 8%;

      img {
        width: 100%;
        height: 100%;
      }
      @media screen and (max-width: 1200px) {
        left: 8%;
      }
      @media screen and (max-width: 767px) {
        width: 265px;
        height: 520px;
        top: 5%;
        left: 5%;
      }
    }

    div.img2 {
      /* width: 315px;
      height: 618px; */
      position: absolute;
      right: 5%;
      bottom: 0;
      img {
        width: 100%;
        height: 100%;
      }
      @media screen and (max-width: 1200px) {
      }
      @media screen and (max-width: 767px) {
        width: 265px;
        height: 520px;
        bottom: 0;
        right: 4%;
      }
    }
  }

  div.chat_info {
    height: 645px;
    position: relative;

    @media screen and (max-width: 767px) {
      height: 200px;
      font-size: 1.8rem;
    }

    h1.chat_title {
      font-size: 2.5rem;
      width: 100%;
      position: absolute;
      top: 40%;
      left: 60%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 1200px) {
        font-size: 2.2rem;
        left: 55%;
      }
      @media screen and (max-width: 767px) {
        height: 200px;
        font-size: 1.8rem;
        position: absolute;
        top: 43%;
        left: 57%;
        transform: translate(-50%, -50%);
      }
    }
    h1.chat_title.change_chat_title {
      /* animation: ${downLeft} 0.3s ease-out forwards; */
    }
    p.info {
      font-size: 1.3rem;
      width: 100%;
      display: none;
      line-height: 1.35;
      position: absolute;
      top: 55%;
      left: 60%;
      color: #212121;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 1200px) {
        font-size: 1.2rem;
        left: 55%;
      }
      @media screen and (max-width: 767px) {
        font-size: 1.1rem;
        left: 57%;
        bottom: -25%;
      }
    }
    p.info.change_info {
      display: block;
      animation: ${fadeIn} 2s ease-out forwards;
    }
  }
`;

const MainArea = styled.div`
 
  @media only screen and (max-width: 1200px){
    padding: 130px 30px 0 30px;
  }
  @media only screen and (max-width: 767px ){
    background-position: 65% center;
    padding: 180px 30px 0 30px;
  }
  
  background-image: url('https://images.velog.io/images/ez0ez0/post/b658ba05-3b68-44c6-8bff-a8d0d7f0edf2/%EB%B0%94%EB%82%98%EB%82%98%EB%A9%94%EC%9D%B8_%EC%82%AC%EC%A7%84.jpg');
  background-size: cover;
  background-repeat : no-repeat;
  background-attachment: fixed;
  background-position: center;
  max-height: 850px;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding: 130px 0px 0 0px;


  div.text{
    width: 1200px;
    margin : 0 auto;
    p{
      //애니메이션
      position: relative;
      opacity: 0;
      top: 60px;
      animation: ${fadeInText} 1s 0.5s forwards;
      width: 100%;
      height:auto;
      color: white;
      font-weight:600;
      font-size: 61px;
      letter-spacing: 6px;
      line-height: 1.4;
      @media only screen and (max-width: 767px ){
        font-size: 54px;
      }
      @media only screen and (max-width: 450px ){
        font-size: 36px;
      }
    }
    p.txt_sma{
      padding-top: 23px;
      letter-spacing: 0px;
      font-weight: 600;
      font-size: 22px;
      line-height: 1.5;
      color:#ffffff9e;
      opacity: 0;
      @media only screen and (max-width: 767px ){
        color:#ffffff;
        width: 260px;
      }
    }
    div.go_btn{
      //애니메이션
      position: relative;
      opacity: 0;
      top: 60px;
      animation: ${fadeInText} 1s 0.8s forwards;
      //
      margin-top: 100px;
      padding: 0px 30px; 
      background-color: #fff3d1;
      width: 300px;
      height: 60px;
      display: flex;
      border-radius: 100px;
      cursor: pointer;
      @media only screen and (max-width: 767px ){
        margin-top: 30px;
      }
      >img{
        /* margin-top: 10px; */
        height: 24px;
        margin-top: 17px;
      }
      >span{
        display:block;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 0px;
        margin-top: 22px;
        padding-left: 10px;
        color: #deba36;
      }
      svg{
        height:30px;
        margin-left: auto;
        margin-top: 22px;
        opacity: 0;
        @media only screen and (max-width: 767px ){
          opacity: 1;
        }
      }
      &:hover{
        svg{
          animation: ${moveButton} 0.5s forwards;
          position: relative;
          opacity: 0;
          right: 10px;
        }
      }
    }
  }
  
`;

//------------------------------페이지1
const Page1 = styled.div`
  div.content_wrap{
    max-width: 1200px;
    padding: 150px 0 0 0;
    margin: 0 auto;
    height: 850px;
    overflow: hidden;
    @media only screen and (max-width: 1200px){
      width:100%;
      padding: 150px 20px 0 20px;
    }
    @media only screen and (max-width: 960px ){
      width:100%;
      padding: 80px 20px 0 20px;
    }
    
    >div.text{
      width: 600px;
      display: inline-block;
      @media only screen and (max-width: 1200px){
        width: 100%;
      }
      >div{
        font-size: 32px;
        font-weight: 600;
        line-height: 1.5;
        letter-spacing: 1px;
        color: #191f28;
         //animation
        position: relative;
        opacity: 0;
        top: 60px;
        .hidden{
          display: none;
        }
        @media only screen and (max-width: 1200px){
          font-size: 24px;
          font-weight: 600;
          line-height: 1.7;
          letter-spacing: 1px;
          color: #191f28;
        }
        @media only screen and (max-width: 480px){
          font-size: 20px;
          .hidden{
            display: inline-block;
          }
        }
      }
      >div.img_two{
        padding:100px 0 0 100px;
        //animation
        opacity:0;
          position: relative;
          top: 60px;
        @media only screen and (max-width: 1200px){
          padding: 80px 0 0 0;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr ;
        }
        @media only screen and (max-width: 1000px){
          display: block;
          margin: 0 auto;
          width: 100%;
          text-align: center;
          img.page1_2{
            display: none;
          }
        }
        @media only screen and (max-width: 480px){
          padding:0;
          img.page1_1{
            width:260px;
          }
        }       
      }
    }
    div.img{
      display: inline-block;
      width: 600px;
      float: right;
      padding-left: 133px;
      //animation
      opacity:0;
      position: relative;
      top: 60px;
      @media only screen and (max-width: 1200px){
        display: none;
      }
    }  
  }
  

  //애니메이션
  div.content_wrap.change{
    >div.text{
      >div{
         //animation
         position: relative;
        opacity: 1;
        top: 0px;
        transition: all 1s ease 0.5s;
      }
      >div.img_two{
        //animation
        position: relative;
        opacity: 1;
        top: 0px;
        transition: all 1s ease 1.5s;
        @media only screen and (max-width: 1200px){
          
          padding: 80px 0 0 0;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr ;
           //animation
          position: relative;
          opacity: 1;
          top: 0px;
          transition: all 1s ease 1s;
        }
        @media only screen and (max-width: 1000px){
          display: block;
          margin: 0 auto;
          width: 100%;
          text-align: center;
          img.page1_2{
            display: none;
          }
        }       
      }
    }
    div.img{
      display: inline-block;
      width: 600px;
      float: right;
      padding-left: 133px;
      //animation
        position: relative;
        opacity: 1;
        top: 0px;
        transition: all 1s ease 1s;
      @media only screen and (max-width: 1200px){
        display: none;
      }
    }  
  }
 
`;

//------------------------------페이지2
const Page2 = styled.div`
  /* background-color: #f9fafb; */
  /* background-color: red; */

  height: 850px;
  width: 100%;
  overflow: hidden;
  background-color: #f8ffe7;
  div.content_wrap{
    width: 1200px;
    height: 850px;
    margin: 0 auto;
    padding: 140px 0 0 0;
    overflow: hidden;
    display: flex;
    @media only screen and (max-width: 1200px){
      width:100%;
      padding: 80px 30px 0 30px;
    }
    @media only screen and (max-width: 1150px ){
      width:100%;
      padding: 50px 20px 0 20px;
      display: block;
    }
    @media only screen and (max-width: 767px ){
      width:100%;
      padding-top: 80px;
    }
   
    div.text{
      //animation
      position: relative;
      opacity: 0;
      top: 60px;

      display: inline-block;
      width: 600px;
      margin-right: auto;
      @media only screen and (max-width: 1150px){
        display: block;
        width: 100%;
        .hidden {
          display: none;
        }
      }
      p.text_title{
        font-size: 22px;
        padding-bottom: 8px;
        color: #fdbf1e; 
      }
      p{
        font-size: 32px;
        font-weight: 600;
        line-height: 1.6;
        letter-spacing: 1px;
        color: #191f28;
        @media only screen and (max-width: 565px){
          .hidden.on{
            display: inline-block;
          }
        } 
      }
      p.text_sma{
        padding-top: 20px;
        font-size: 24px;
        font-weight: 600;
        line-height: 1.6;
        letter-spacing: 1px;
        color: #333d4b;
        @media only screen and (max-width: 1150px){
          padding-top: 10px;
          font-size: 20px;
        }
      }
    }
    div.img{
      display: flex;
      @media only screen and (max-width: 1200px){
         margin-left: 30px;
      }
      @media only screen and (max-width: 1150px){
        width: 100%;
        display: block;
        margin: 0 auto;
      }
      @media only screen and (max-width: 767px){
        max-width: 100%; height: auto;
      }  
      
      
      img {
        display: inline-block;
        width:300px;
        height: 570px;
        border-radius: 20px;
        border: 1px solid rgba(0,0,0,0.05);
        box-shadow: 2px 4px 7px 1px #00000012;
        @media only screen and (max-width: 1150px){
          margin: 50px 0 0 0;
        } 
        @media only screen and (max-width: 767px){
          max-width: 48%; height: auto;
        }  
      }
      img.page2_1{
        //animation
        position: relative;
        opacity: 0;
        top: 60px;
      }
      img.page2_2{
        margin-left: 50px;
        @media only screen and (max-width: 1200px){
          margin-left: 10px;
        }
        @media only screen and (max-width: 1150px){
          margin-left: 70px;
        }  
        @media only screen and (max-width: 767px){
          margin-left: 2%;
        }      
        //animation
        position: relative;
        opacity: 0;
        top: 60px;
      }
    }  
  }
  // 애니메이션
  div.content_wrap.change{
    width: 1200px;
    height: 850px;
    margin: 0 auto;
    padding: 140px 0 0 0;
    overflow: hidden;
    display: flex;
    @media only screen and (max-width: 1200px){
      width:100%;
      padding: 80px 30px 0 30px;
    }
    @media only screen and (max-width: 1150px ){
      width:100%;
      padding: 50px 20px 0 20px;
      display: block;
    }
    @media only screen and (max-width: 767px ){
      width:100%;
      padding-top: 80px;
    }
   
    div.text{ 
      //animation
      position: relative;
      opacity: 1;
      top: 0px;
      transition: all 1s ease;

      display: inline-block;
      width: 600px;
      margin-right: auto;
      @media only screen and (max-width: 1150px){
        display: block;
        width: 100%;
        .hidden {
          display: none;
        }
      }
      p.text_title{
        font-size: 22px;
        padding-bottom: 8px;
        color: #fdbf1e;
      }
      p{
        font-size: 32px;
        font-weight: 600;
        line-height: 1.6;
        letter-spacing: 1px;
        color: #191f28;
      }
      p.text_sma{
        padding-top: 20px;
        font-size: 24px;
        font-weight: 600;
        line-height: 1.6;
        letter-spacing: 1px;
        color: #333d4b;
        @media only screen and (max-width: 1150px){
          padding-top: 10px;
          font-size: 20px;
        }
      }
    }
    div.img{
      display: flex;
      @media only screen and (max-width: 1200px){
         margin-left: 30px;
      }
      @media only screen and (max-width: 1150px){
        width: 100%;
        display: block;
        margin: 0 auto;
      }
      @media only screen and (max-width: 767px){
        max-width: 100%; height: auto;
      }  
      
      
      img {
        display: inline-block;
        width:300px;
        height: 570px;
        border-radius: 20px;
        border: 1px solid rgba(0,0,0,0.05);
        box-shadow: 2px 4px 7px 1px #00000012;
        @media only screen and (max-width: 1150px){
          margin: 50px 0 0 0;
        } 
        @media only screen and (max-width: 767px){
          max-width: 48%; height: auto;
        }  
      }
      img.page2_1{
         //animation
        position: relative;
        opacity: 1;
        top: 0px;
        transition: all 1s ease 0.5s;
      }
      img.page2_2{
        margin-left: 50px;
        @media only screen and (max-width: 1200px){
          margin-left: 10px;
        }
        @media only screen and (max-width: 1150px){
          margin-left: 70px;
        }  
        @media only screen and (max-width: 767px){
          margin-left: 2%;
        }    

         //animation
         position: relative;
        opacity: 1;
        top: 0px;
        transition: all 1s ease 1s ;
      }
    }  
  }
  
`; 


const Wrapper = styled.div`
  //( 기본적용 )모바일 : 768px 이하 ::  @media only제외한 모든 사이즈 적용
  /* max-width: 1200px; */
  width: 100%;
  height: 100%;
  margin: auto;
  > div {
    width: 100%;
    height: 850px;
  }
  .page1 {
    padding-top: 50px; // 검색영역 보이는 페이지만 넣는 것
    background-color: red;
  }
  .page2 {
    background-color: orange;
  }

  .btn-home {
    height: 40px;
    background-color: limegreen;
    margin: auto;
    text-align: center;
    line-height: 40px;
  }
  // 태블릿 : 1200px ~ 768px :: 768px 이상 적용되는 css
  /* @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .page1 {
      padding-top: 0px; // 검색영역 보이는 페이지만 넣는 것
    }
  }
  // PC : 1200px 이상 :: 1200px 이상 적용되는 css
  @media only screen and (max-width: ${BREAK_POINT_PC}px) {
    padding: 0;
    background-color: red;
  } */
`;


const Render = () => {
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    console.log(scrollPosition);
  });

  return (
    <>
      <MainArea>
        <div className='text'>
          <p>바로 만나서</p>
          <p>나와함께</p>
          <p>나눠보아요</p>
          <p className='txt_sma'>자취생들의 고민을 덜어주는 <br/>식재료 공구 및 나눔 사이트 바나나마켓 입니다.</p>
          <div className='go_btn'>  
            <img src={logo_svg} className="logo_icon logo_svg" /> 
            <span>바로가기</span>
            <NextIcon className='next_icon' strokeWidth=' 1.8px' stroke='#ffc007'></NextIcon>
          </div>
        </div>
      </MainArea>
      <Page1>
        <div className={scrollPosition < 300 ? 'content_wrap' : 'content_wrap change'}>
          <div className= 'text'>
            <div>수박 한통은 <br className='hidden'/>자취생에게 너무 많다구요 ?
              <br/>장보기메이트를 찾고싶은 이웃을
              <br/>바나나마켓에서 확인해보세요:D
            </div>
            <div className= 'img_two'>
              <img className='page1_2' src={page1_2}/>
              <img className='page1_1' src={page1_1}/>
            </div>
        </div>
          <div className='img'>
            <img className='page1_1' src={page1_1}/>
          </div>
        </div>
      </Page1>
      <Page2>
        <div className={scrollPosition < 1110 ? 'content_wrap' : 'content_wrap change'}>
          <div className='text'>
            <p className='text_title'>게시글 작성하기</p>
            <p>직접 장보기메이트를 
              <br className='hidden on'/> 찾아 나서볼까요?</p>
            <p className='text_sma'>이미지와 함께 짧은 글을 작성하고,
            <br className='hidden on'/> 지도를 통해 장소를 선택해주세요.
            <br className='hidden on'/> 당신이 찾는 그분이 기다리고 있을거예요!</p>
          </div>
          <div className='img'>
            <img className='page2_1' src={page2_1}/>
            <img className='page2_2' src={page2_2}/>
          </div>
        </div>
        
      </Page2>
    <Wrapper>
      <InfoDiv>
        <div className="detailDiv">
          <div className="detail">
            <h1
              className={
                scrollPosition < 1850
                  ? 'detail_title'
                  : 'detail_title change_detail_title'
              }
            >
              내 주변 이웃을<br></br>
              장보기 메이트로 만들어보세요
            </h1>
            {/* <p className="small_title">가까운 이웃과 함께라면</p> */}
            <h3 className="small_title">가까운 이웃과 함께라면</h3>
            <div className="datail_info">
              <div
                className={
                  scrollPosition < 2100
                    ? 'detail_box'
                    : 'detail_box change_detail_box'
                }
              >
                <div className="datail_box_icon">
                  <img src={save_money}></img>
                </div>
                <p>식재료비 절약</p>
                <span>
                  부담되었던 식재료비를<br></br>절약할 수 있습니다
                </span>
              </div>
              <div
                className={
                  scrollPosition < 2100
                    ? 'detail_box'
                    : 'detail_box change_detail_box'
                }
              >
                <div className="datail_box_icon">
                  <img src={reduction}></img>
                </div>
                <p>음식물 쓰레기 절감</p>
                <span>
                  쓰지 못해 버렸던<br></br>식재료의 양이 줄어듭니다
                </span>
              </div>
            </div>
          </div>
          <div className="detail_img">
            <img src={detail_img}></img>
          </div>
        </div>
      </InfoDiv>
      <ChatPage>
        <div className="chat_img">
          <div className="img1">
            <img src={chatListImg}></img>
          </div>
          <div className="img2">
            <img src={chatListImg2}></img>
          </div>
        </div>
        <div className="chat_info">
          <h1
            className={
              scrollPosition < 2850
                ? 'chat_title'
                : 'chat_title change_chat_title'
            }
          >
            부담없는 소통
          </h1>
          <p className={scrollPosition < 2950 ? 'info' : 'info change_info'}>
            장보기 메이트와 <br></br>
            실시간으로 소통해보세요.
          </p>
        </div>
      </ChatPage>
      </Wrapper>
    </>
  );
};

export default Render;
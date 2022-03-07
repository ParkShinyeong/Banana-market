import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import chatListImg from '../icon/listImg.png';
import chatListImg2 from '../icon/listImg2.png';
import save_money from '../icon/piggy-bank.png';
import reduction from '../icon/recycle-bin.png';
import detail_img from '../icon/detail.png';
import '../App.css'; //이거 써줘야 css적용됨.

const BREAK_POINT_TABLET = 768;
const BREAK_POINT_PC = 1200;

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

const Render = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });
  return (
    <Wrapper>
      <div className="page1">페이지1</div>
      <div className="page2">페이지2</div>
      <InfoDiv>
        <div className="detailDiv">
          <div className="detail">
            <h1
              className={
                scrollPosition < 1000
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
                  scrollPosition < 1250
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
                  scrollPosition < 1250
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
              scrollPosition < 2000
                ? 'chat_title'
                : 'chat_title change_chat_title'
            }
          >
            부담없는 소통
          </h1>
          <p className={scrollPosition < 2100 ? 'info' : 'info change_info'}>
            장보기 메이트와 <br></br>
            실시간으로 소통해보세요.
          </p>
        </div>
      </ChatPage>
    </Wrapper>
  );
};

export default Render;
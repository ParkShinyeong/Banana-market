import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import spot_sma from '../icon/spot_sma.png'
import clock_sma from '../icon/clock_sma.png'
import chat_sma from '../icon/chat_sma.png'
import spot_sma2 from '../icon/spot_sma2.png'

const ListHeader = styled.div`
  padding-top: 70px;
  max-width: 1200px;
  margin: 0 auto 15px auto;
  /* background-color: red; */
  font-size:16px;
  display: flex;
  @media screen and (max-width: 1200px) {
    margin: 0 15px 15px 15px;
    padding-top: 100px;
  }
  @media screen and (max-width: 767px) {
    margin: 0 22px 15px 22px;
    padding-top: 100px;
  }
  >div.title { 
    font-size:21px;
    >span {
      padding-left: 13px;
      color:#aeaeae;
      font-size:15px;
    }
  }
  > div.Check_wrapper{
    margin-left: auto;
    height: 35px;
    line-height: 35px;
    padding-left: 10px;
    input[type='checkbox'] {
      appearance: none;
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 3px;
      border: 1px solid #b7b7b7;
    }
    input[type='checkbox']:checked {
      appearance: none;
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 0px;
      background-color: #ffc004;
      & + label {
        color: #6d6d6d;
      }
      &::after {
        position: relative;
        top: 1px;
        content: '✔'; /* 체크 마크 ASCii 문자 */
        font-size: 18px;
        line-height: 0.8;
        color: white;
        transition: all 0.3s;
      }
    }
    > label {
      /* background-color: green; */
      margin-left: 10px;
      display: inline-block;
      font-size: 16px;
      font-weight: 300;
      color: #a9a9a9;
      /* background-color: red; */
    }
  }
`;
const ListDiv = styled.div`
  max-width: 1200px;
  min-height: 690px;
  /* background-color: aquamarine; */
  margin: 0px auto 80px;

  > ul {
    max-width: 1200px;
    /* margin: 0px auto 70px auto; */
    display: grid;
    grid-template-columns: 50% auto;
    padding: 5px;

    grid-gap: 15px;

    @media screen and (max-width: 1200px) {
      grid-template-columns: 50% auto;
      grid-gap: 15px;
      padding: 15px;
      margin: 0px auto 80px auto;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: auto;
      grid-gap: 15px;
      padding: 10px;
      margin: 0 auto 20px auto;
    }

    > .list_detail {
      box-shadow: 0px 1px 4px 2px #dddddd80;
      /* min-width: 379px; */
      min-height: 150px;
      border-radius: 10px;
      cursor: pointer;
      background-color: #ddd;
      opacity: 0.5;
      /* margin-bottom: 25px; */

      transition: all 0.2s linear;
      &:hover {
        opacity: 0.4;
      }
      @media screen and (max-width: 1200px) {
        /* min-width: 300px; */
        min-height: 130px;
      }

      @media screen and (max-width: 768px) {
        min-height: 130px;
      }
      > .in_grid {
        display: grid;
        grid-template-columns: 120px auto;
        padding: 15px;
        grid-gap: 25px;
        @media screen and (max-width: 1200px) {
          grid-template-columns: 115px auto;
        }

        @media screen and (max-width: 768px) {
          grid-template-columns: 110px auto;
        }

        .img {
          min-height: 120px;
          /* border: 1px solid #fff; */
          background-color: #ddd;
          border-radius: 10px;
          background-size: cover;
          @media screen and (max-width: 1200px) {
            /* min-width: 300px; */
            min-height: 115px;
          }

          @media screen and (max-width: 768px) {
            min-height: 110px;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }

        .inf {
          min-height: 120px;
          /* border: 1px solid #fff; */
          border-radius: 10px;
          cursor: pointer;
          @media screen and (max-width: 1200px) {
            /* min-width: 300px; */
            min-height: 115px;
          }

          @media screen and (max-width: 768px) {
            min-height: 110px;
          }

          .title {
            width: 100%;
            min-height: 19px;
            /* background-color: beige; */
            font-size: 18px;
            margin-top: 10px;
            font-weight: 500;
            color: #1c1c1c;
            
            @media screen and (max-width: 1200px) {
              /* min-width: 300px; */
              font-size: 17px;
              margin-top: 8px;
            }

            @media screen and (max-width: 768px) {
              font-size: 16px;
              margin-top: 6px;
            }
          }
          .location {
            width: 100%;
            font-size: 14px;
            margin-top: 13px;
            color: #6f6f6f;
            @media screen and (max-width: 768px) {
              font-size: 14px;
            }
          }
          .date {
            width: 100%;
            font-size: 13px;
            margin-top: 8px;
            color: #2b2828;

            @media screen and (max-width: 768px) {
              font-size: 13px;
            }
          }
          .pepole {
            width: 100%;
            font-size: 13px;
            margin-top: 7px;
            color: #2b2828;

            @media screen and (max-width: 768px) {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
`;

const ListDeTail = styled.div`
  /* background-color: #fafafa; */
  /* box-shadow: 0px 1px 4px 2px #dddddd80; */
  /* min-width: 379px; */
  min-height: 150px;
  border-radius: 10px;
  cursor: ${(props) => (props.status ? 'pointer' : '')};
  background-color: ${(props) => (props.status ? '#fafafa' : '#dde3e7')};
  /* background-color: ${(props) => (props.status ? '#fafafa' : '#9eadba')}; */
  box-shadow: ${(props) => (props.status ? '2px 4px 7px 1px #00000012;' : '')};
  opacity: ${(props) => (props.status ? '' : '0.2')};
  transition: all 0.2s linear;
  &:hover {
    position: relative;
    top: -2px;
    left: -2px;
  }
  @media screen and (max-width: 1200px) {
    /* min-width: 300px; */
    min-height: 130px;
  }

  @media screen and (max-width: 768px) {
    min-height: 130px;
  }
  > .in_grid {
    
    display: grid;
    grid-template-columns: 120px auto;
    padding: 15px;
    grid-gap: 25px;

    @media screen and (max-width: 1200px) {
      grid-template-columns: 115px auto;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: 110px auto;
    }

    .img {
      min-height: 120px;
      /* border: 1px solid #fff; */
      background-color: #ddd;
      border-radius: 10px;
      background-size: cover;
      @media screen and (max-width: 1200px) {
        /* min-width: 300px; */
        min-height: 115px;
      }

      @media screen and (max-width: 768px) {
        min-height: 110px;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .inf {
      min-height: 120px;
      /* border: 1px solid #fff; */
      border-radius: 10px;
      cursor: pointer;
      @media screen and (max-width: 1200px) {
        /* min-width: 300px; */
        min-height: 115px;
      }

      @media screen and (max-width: 768px) {
        min-height: 110px;
      }

      .title {
        width: 100%;
        height: 19px;
        margin-top: 10px;
        display:flex;   
        >span.trade{
          text-align: center;
          display: inline-block;
          width: 38px;
          font-size: 13px;
          border-radius: 3px;
          font-weight: 600;
          line-height: 19px;
          height: 19px;
          /* background-color: #f4f4f4; */
          border: 1px solid #dcac64;
          color: #dcac64;
        }
        >span.share{
          text-align: center;
          display: inline-block;
          width: 38px;
          font-size: 13px;
          border-radius: 3px;
          font-weight: 600;
          line-height: 19px;
          height: 19px;
          /* background-color: #f4f4f4; */
          border: 1px solid #99b376;
          color:#99b376;
        }
        >span.title_text{
          font-size: 18px;
          font-weight: 500;
          padding-left: 8px;
          color: #323232;
          display: block;
          width: 100%;
          overflow: hidden;
          /* background:pink; */
        /* background-color: beige; */
        }
        @media screen and (max-width: 1200px) {
          /* min-width: 300px; */
          font-size: 17px;
          margin-top: 8px;
        }

        @media screen and (max-width: 768px) {
          font-size: 16px;
          margin-top: 6px;
         
          /* >span.share{
            display: inline-block;
            font-size: 14px;
            border-radius: 3px;
            font-weight: 600;
            padding: 0 5px; */
            /* background-color: #f4f4f4; */
            /* border: 1px solid #99b376;
            color:#99b376;
          } */
          >span.title_text{
            font-size: 17px;
            font-weight: 500;
            padding-left: 8px;
            color: #323232;
          }
        }
      }
      .location {
        width: 100%;
        font-size: 16px;
        margin-top: 10px;
        color: #6f6f6f;
        font-weight: 500;
        img.icon_sma{
          opacity: 0.8;
          height: 13px;
        }
        @media screen and (max-width: 768px) {
          font-size: 14px;
        }
      }
      .date {
        width: 100%;
        font-size: 15px;
        margin-top: 8px;
        color: #a6a6a6;
        >span{
          font-size: 12px;
          margin-bottom: 2px;
          color: #9b9b9b;
        }
        img.icon_sma{
          opacity: 0.4;
          width: 13px;
        }
        @media screen and (max-width: 768px) {
          font-size: 13px;
        }
      }
      .pepole {
        width: 100%;
        font-size: 15px;
        margin-top: 8px;
        color: #a6a6a6;
        >span{
          font-size: 12px;
          margin-bottom: 2px;
          color: #9b9b9b;
        }
        img.icon_sma{
          opacity: 0.4;
          width: 13px;
        }
        @media screen and (max-width: 768px) {
          font-size: 13px;
        }
      }
    }
  }
`;

const MyPostList = ({ handleChangeCheckBox }) => {
  const history = useHistory();
  const list = useSelector((state) => state.myPostListReducer);

  return (
    <>
      <ListHeader>
        <div className="title">나의 마켓
          {/* <span>나의 참여한 거래 목록</span> */}
        </div>
        <div className="Check_wrapper" >
          <input type="checkbox" id="ownPost"  onClick={handleChangeCheckBox} />
          <label htmlFor="ownPost">
            내가 쓴 글만 보기
          </label>
        </div>
      </ListHeader>
      <ListDiv>
        <ul>
          {list.map((el, idx) => (
            <ListDeTail
              key={idx}
              status={el.status}
              onClick={() => {
                history.push(`/view/${el.id}`);
              }}
            >
              <ul className="in_grid">
                <li className="img">
                  <img src={el.image}></img>
                </li>
                <li className="inf">
                  <ul>
                    <li className='title' >
                      <span span className={(el.tradeType === 'jointPurchase' ||
                      el.tradeType === '공구' ? 'trade' : 'share')}>
                      {el.tradeType === 'jointPurchase' ||
                      el.tradeType === '공구'
                        ? '공구'
                        : '나눔'}</span>
                      <span className='title_text' >{el.title}</span>
                    </li>
                    <li className="location">
                      <img className='icon_sma' src={spot_sma}/>
                      &nbsp;&nbsp;{el.market}
                    </li>
                    <li className="date">
                    <img className='icon_sma' src={clock_sma}/>
                    &nbsp;&nbsp;{el.date}&nbsp;, {el.time}
                    </li>
                    {/* <span>&nbsp;&#124;&nbsp;</span>   */}
                    <li className="pepole">
                      <img className='icon_sma' src={chat_sma}/>
                      &nbsp;&nbsp;지금 {el.currentMate}명  <span>&nbsp;&#124;&nbsp;</span> 전체 {el.totalMate}명
                    </li>
                  </ul>
                </li>
              </ul>
            </ListDeTail>
          ))}
        </ul>
      </ListDiv>
    </>
  );
};

export default MyPostList;

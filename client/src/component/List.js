import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import all from '../icon/all.png'
import bread_icon from '../icon/bread_icon.png'
import fruit_icon from '../icon/fruit_icon.png'
import milk_icon from '../icon/milk_icon.png'
import vegi_icon from '../icon/vegi_icon.png'

import fish_icon from '../icon/fish_icon.png'
import egg_icon from '../icon/egg_icon.png'
import ice_icon from '../icon/ice_icon.png'
import kimchi_icon from '../icon/kimchi_icon.png'
import something_icon from '../icon/something_icon.png'

import spot_sma from '../icon/spot_sma.png'
import clock_sma from '../icon/clock_sma.png'
import chat_sma from '../icon/chat_sma.png'
import spot_sma2 from '../icon/spot_sma2.png'

import select_arrow from '../icon/select_arrow.jpeg'

const SelectBtn = styled.div`
  max-width: 1200px;
  margin: 50px auto 20px auto;
  /* background-color: sienna; */
  @media screen and (max-width: 1200px) {
    margin: 50px 15px 15px 15px;
  }

  @media screen and (max-width: 767px) {
    margin: 75px 10px 15px 10px;
  }
  .select_box{
    width : 100%;
    padding: 30px 10px 30px 10px;
    /* border-radius: 10px; */
    /* border: 5px solid #f7f7f7; */
    @media screen and (max-width: 500px) {
      padding: 20px 6px 30px 6px;
    }
    > ul.select_area{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 15px;
      > li:nth-child(${(props) =>( props.category !== ''? (Number(props.category)+1): 1)}){
        > img.icon{
          opacity: 1;
          }
          > div.categoryText{
            opacity: 1;
          }
          > .categoryText::after{
              content: '';
              display: inline-block;
              border-radius: 100px;
              background-color: #ffc004;
              width: 5px;
              height: 5px;
              margin-left: 3px;
              margin-bottom: 5px;
            }
        &:hover{
          > img.icon{
          opacity: 1;
          }
          > div.categoryText{
            font-weight: 400;
          }
        }
      }
      > li{
        text-align: center;
        &:hover{
          > img.icon{
            position: relative;
            top:-3px;
            opacity: 1;
          }
          > div.categoryText{
          font-weight: 500;
          opacity: 0.6;
          }
        }
        > img.icon{
          opacity: 0.84;
          width: 38px;
          &.categoryImg0{
            margin: 7px 0;
            width: 25px;
          }
          @media screen and (max-width: 767px) {
            width: 40px;
            &.icon.categoryImg0 {
              margin: 3px 0 4px 0;
              width: 34px;
            }
          }
          @media screen and (max-width: 500px) {
            width: 35px;
            &.icon.categoryImg0 {
              margin: 3px 0;
              width: 30px;
            }
          }
        }
        > div.categoryText{
          opacity: 0.45;
          font-size: 15px;
          color:#5a5a5a;
          font-weight: 500;
          padding-top: 10px;
          @media screen and (max-width: 1030px) {
            font-size: 13px;
          }
          @media screen and (max-width: 767px) {
            padding-top: 6px;
          }
          @media screen and (max-width: 450px) {
            font-size: 10px;
          }
        }
      }
      @media screen and (max-width: 935px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-row-gap: 30px;
      }
      @media screen and (max-width: 500px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 15px;
      }
    }
  }
  .location {
    min-width: 140px;
    height: 35px;
    margin-left: 5px;
    border-radius: 10px;
    float: left;

    @media screen and (max-width: 1200px) {
      margin-left: 0;
    }
    @media screen and (max-width: 767px) {
      min-width: 120px;
      height: 30px;
    }
    .grid {
      display: grid;
      grid-template-columns: 30px auto;
      grid-gap: 25px;

      @media screen and (max-width: 768px) {
        grid-template-columns: 28px auto;
      }

      .location_img {
        min-height: 35px;
        background-color: #ddd;
        @media screen and (max-width: 767px) {
          min-height: 30px;
        }
      }
      .location_info {
        line-height: 35px;
        @media screen and (max-width: 767px) {
          line-height: 30px;
          font-size: 15px;
        }
      }
    }
  }

  .selectBox {
    float: right;
    .category {
      width: 120px;
      height: 35px;
      border-radius: 5px;
      margin-right: 20px;

      @media screen and (max-width: 767px) {
        width: 100px;
        height: 30px;
      }
    }
    .sort {
      width: 100px;
      height: 35px;
      border-radius: 5px;
      margin-right: 5px;
      @media screen and (max-width: 1200px) {
        margin-right: 0;
      }
      @media screen and (max-width: 767px) {
        width: 80px;
        height: 30px;
      }
    }
  }
`;
const ListHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto 15px auto;
  
  /* background-color: red; */
  display: flex;
  /* background-color: sienna; */
  @media screen and (max-width: 1200px) {
    margin: 0 15px 15px 15px;
  }
  @media screen and (max-width: 500px) {
    >div.location{
      height: 35px;
      line-height: 35px;
      >img.icon_sma{
        width: 18px;
        display: inline-block;
      }
    }
    >div.selectBox{
      > select.sort.select_css{
        margin-left: auto;
        height: 35px;
        line-height: 35px;
        padding: 0 10px 0 15px;
      }
      >span.arrow{
        width: 30px;
        height: 10px;
        background-color: red;
        /* position: relative; */
      }
    }
  }
  > .location{
    margin-right: auto;
    padding:0px 16px;
    border-radius: 100px;
    line-height: 45px;
    /* border: 1px solid #feb763; */
    color: #2d534d;
    font-size:16px;
    background-color: #ebf4f3cf;
    transition: all 0.2s linear;
    box-sizing: content;
    &:hover{
      border: 1px solid #dce9e67d;
      box-shadow: 2px 4px 7px 1px #00000012;
      ;
    }
    >img.icon_sma{
      width: 20px;
      display: inline-block;
      position: relative;
      top:4px;
    }

  }
  >div.selectBox{
    margin-left: auto;
    select.sort:hover {
      border-color: #ebf4f3cf;
      background-color: #dce9e67d;
      box-shadow: 2px 4px 7px 1px #00000012;
    }
    > select.sort.select_css:focus {
      border-color: #aaa;
      box-shadow: 0 0 1px 2px #579489;
      box-shadow: 0 0 0 3px -moz-mac-focusring;
      color: #222;
      outline: none;
    }
    >span.arrow{
      width: 30px;
      height: 10px;
      background-color: red;
      /* position: relative; */
    }
    select.sort:disabled {
    opacity: 0.5;
    }
    select.sort::-ms-expand {
      display: none;
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
/*          
          >span.share{
            display: inline-block;
            font-size: 14px;
            border-radius: 3px;
            font-weight: 600;
            padding: 0 5px; */
            /* background-color: #f4f4f4; */
            /* border: 1px solid #99b376;
            color:#99b376; */
          }
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

const List = ({ handleFilterCategory, handleFilterSort }) => {
  const history = useHistory();
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  const setLoginState = useSelector((state) => state.setLoginReducer);
  const list = useSelector((state) => state.postListReducer);

  // const off = useSelector((state) => state.setModalReducer);
  // console.log(off);
  const categoryData = [
    '전체',
    '정육/계란',
    '과일',
    '우유/유제품',
    '채소',
    '수산/건어물',
    '베이커리',
    '간식/떡/빙과',
    '김치/반찬',
    '기타',
  ];
  const categoryImgData = [
    all,egg_icon,fruit_icon, milk_icon,vegi_icon, fish_icon,
    bread_icon, ice_icon, kimchi_icon, something_icon ];

  // 카테고리 css 이벤트 - 클릭한 것 진하게 만들기
  let [selectCategory, setSelectCategory] = useState('');
  const getDataKey = (event) => {
    let num = event.target.getAttribute('data-key');
    if(num !== selectCategory) {
      handleFilterCategory(event); 
    }
    setSelectCategory(num);
  }

  return (
    <>
      <SelectBtn category={selectCategory}>
        <div className="select_box">
          <ul className="select_area">
            {categoryData.map((category, idx) => {
                return (
                  <li className='category_box' data-value={category} key={idx} data-key={idx} onClick={getDataKey}>
                    <img className={'icon categoryImg'+idx} src={categoryImgData[idx]} data-value={category} data-key={idx}  />
                    <div className='categoryText' data-value={category}  data-key={idx} >{category}</div>
                  </li>
                );
              })}
            </ul>
        </div>
      </SelectBtn>
      <div className='background_section'>
      <ListHeader>
        {
          setLoginState?
          <div className="location" onClick= {()=>{history.push('/mypage')}}>
            <img className='icon_sma' src={spot_sma2} />
            <span className="location_info">&nbsp;&nbsp;{setUserInfo.region}</span>
          </div>
          :
          <div className="location" onClick= {()=>{history.push('/signup')}}>
            <img className='icon_sma' src={spot_sma2} />
            <span className="location_info">&nbsp;&nbsp;나의 지역 설정</span>
          </div> 
        }
        <div className="selectBox">
        <span className='arrow'></span>
          <select className="sort select_css" onChange={handleFilterSort}>
            <option value="upload">최신순</option>
            <option value="due-date">마감임박순</option>
          </select>
        </div>
      </ListHeader>
        <ListDiv>
        <ul>
          {list.map((el, idx) => (
            <ListDeTail
              key={idx}
              status={el.status}
              onClick={() => {
                history.push(el.status === true
                      ? `/view/${el.id}`
                      : alert('마감되었습니다.')
                );
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
    </div>
  </>
  );
};
export default List;
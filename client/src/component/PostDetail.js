import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { postListDelete } from '../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import spot_sma from '../icon/spot_sma.png'
import clock_sma from '../icon/clock_sma.png'
import chat_sma from '../icon/chat_sma.png'

const { kakao } = window;

const DetailDiv = styled.div`
  max-width: 1200px;
  /* background-color: powderblue; */
  margin: 70px auto 70px auto;
  @media screen and (max-width: 1200px) {
    margin: 70px auto 60px auto;
  }
  @media screen and (max-width: 767px) {
    margin: 80px auto 30px auto;
    width: 100%;
  }
  .detail {
    width: 440px;
    border: 1px solid #ecede8;
    box-sizing: border-box;
    padding: 30px;
    margin: 0 auto;
    /* background-color: peachpuff; */
    border-radius: 10px;
    box-shadow: 1px 1px 5px 0px #00000014;
    @media screen and (max-width: 767px) {
      width: 90%;
    }
    /* padding-top: 20px; */
  }

  .md_btn_list {
    display: flex;
    margin-top: 20px;
    width: 440px;
    margin: 0 auto;
    @media screen and (max-width: 767px) {
      width: 90%;
    }
    /* padding: 20px 30px; */
    .md_btn {
      box-shadow: 1px 1px 5px 0px #00000014;
      text-align: center;
      font-size: 14px;
      width: 212px;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      font-weight: 400;
      background-color: white;
      border: 1px solid #ff4342;
      color: #ff4342;
      border-radius: 10px;
      margin-top: 20px;
      cursor: pointer;
      @media screen and (max-width: 767px) {
        width: 49% ;
        justify-content: flex-end;
      }
    }
    > div.delete_btn {      
      margin-left: auto;
      background-color: #ff4342;
      color: #ffe1e0;
      float: right;
    }
  }
  .btn {
    text-align:center;
    width: 440px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 500;
    box-sizing: border-box;
    margin: 20px auto 0 auto;
    border-radius: 10px;
    box-shadow: 1px 1px 5px 0px #00000014;
    border: 0px;
    background-color: #3999ff;
    color: #fbfff1;
    cursor: pointer;
  }
`;

const UlDiv = styled.ul`
  width: 100%;
  /* background-color: rebeccapurple; */
  margin: 0 auto;
  border-radius: 10px;
  @media screen and (max-width: 767px) {
  }
  .profile {
    width: 100%;
    height: 90px;
    border-bottom: 1px dashed #c6c6c6;
    box-sizing: border-box;
    margin-bottom: 20px;
    @media screen and (max-width: 767px) {
      height: 85px;
    }
    > .in_grid {
      display: grid;
      grid-template-columns: 1.5fr 0.5fr;
      @media screen and (max-width: 1200px) {
      }
      @media screen and (max-width: 768px) {
      }
      > li.image {
        height: 70px;
        width: 70px;
        margin-left: auto;
        border-radius: 50px;
      }
      > li.profile_info {
        height: 70px;
        margin-right: auto;
        @media screen and (max-width: 768px) {
        }
        .id {
          font-weight: 600;
          font-size: 16px;
          margin-top: 3px;
          color:#2929298c;
          @media screen and (max-width: 768px) {
          }
        }
        .location {
          font-size: 15px;
          margin-top: 3px;
          color:#393a3b8c;
          @media screen and (max-width: 768px) {
          }
        }
        .deal_total {
          font-size: 13px;
          margin-top: 3px;
          color: #f4b600;
          border-radius: 3px;
          padding: 3px 3px 1px 3px;
          font-weight: 600;
          border: 2px solid #f4b600;
          @media screen and (max-width: 768px) {
          }
        }
      }
    }
  }
  .title {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 8px;
    color: #2f2f2f;
    /* background-color: salmon; */
    box-sizing: border-box;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    @media screen and (max-width: 767px) {
    }
  }
  .others{
    .text{
      color:#bebebe;
      font-size: 15px;
      font-weight: 500;
    }
  }
  .content {
    width: 100%;
    /* background-color: salmon; */
    box-sizing: border-box;
    margin: 0px auto;
    font-size: 17px;
    font-weight: 400;
    line-height: 28px;
    color: #3f3f3f;
    >div{
      margin-top:30px;
      margin-bottom: 30px;
    }
    >img{
      border-radius: 8px;
      margin-bottom: 5px;
      @media screen and (max-width: 768px) {
      width: 100%;
      }
    }
  }
  > li.trade_info{
    width: 380px;
    background-color: #ebedf47d;
    border: 1px solid #dadeec7d;
    border-radius: 0 0 8px 8px;
    padding: 20px 15px 20px 15px;
    font-size: 16px;
    line-height: 28px;
    color:#9da2b5;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    >div >img{
      opacity: 0.8;
    }
    .spot {
      img.icon_sma{
        height: 13px;
      }
      .map_btn{
        margin-top: 20px;
        line-height: 40px;
        height: 40px;
        border: 1px solid #3396ff;
        color: #3396ff;
        border-radius: 5px;
        text-align: center;
        background-color: white;
      }
    }
    .date {
      margin-bottom: 10px;
      >span{
        font-size: 12px;
        margin-bottom: 2px;
        color: #9b9b9b;
      }
      img.icon_sma{
        width: 13px;
      }
      @media screen and (max-width: 768px) {
      }
    }
    .pepole {
      margin-bottom: 10px;
      >span{
        font-size: 12px;
        margin-bottom: 2px;
        color: #9b9b9b;
      }
      img.icon_sma{
        width: 13px;
      }
      @media screen and (max-width: 768px) {
      }
    }
  }
 
  .map {
    width: 380px;
    .map_image {
      height: 300px;
      border: 1px solid #dadeec7d;
      border-radius: 8px 8px 0 0 ;
      box-sizing: border-box;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;

const PostDetail = ({ chatListDetail, handleClick }) => {
  const history = useHistory();
  // const [postid, setPostid] = useState(0);
  const postDetail = useSelector((state) => state.postDetailReducer);
  const dispatch = useDispatch();
  const { post, postWriter } = postDetail;
  const basicProfileImage = postWriter.profile_image || null;

  let articleNum = useParams();
  // console.log(articleid);

  // post 디테일 부분
  const showPostDetail = (articleid) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/articles/${articleid}`)
      .then(async (detailData) => {
        // console.log('PostDetail', detailData);
        const postImageKey = detailData.data.data.post.image;
        detailData.data.data.post.image = `https://d2fg2pprparkkb.cloudfront.net/${postImageKey}?w=378&h=298&f=webp&q=90`;

        const profileImageKey = detailData.data.data.postWriter.profile_image;
        if (profileImageKey) {
          detailData.data.data.postWriter.profile_image = `https://d35fj6mbinlfx5.cloudfront.net/${profileImageKey}?w=70&h=70&f=webp&q=90`;
        } else {
          detailData.data.data.postWriter.profile_image =
            'https://d35fj6mbinlfx5.cloudfront.net/basicProfileImage.png?w=70&h=70&f=webp&q=90';
        }

        dispatch({
          type: 'SHOW_POST',
          payload: detailData.data.data.post,
        });
        dispatch({
          type: 'SHOW_WRITER',
          payload: detailData.data.data.postWriter,
        });
        console.log(detailData);
      })
      .catch((err) => {
        console.log(err);
        if(String(err).includes('404')){
          alert('작성자가 없거나, 존재하지 않는 게시물 입니다')
        }

        history.push('/list')
      });
  };
  useEffect(() => {
    showPostDetail(articleNum.id);
    console.log('아티클넘', articleNum);
  }, []);

  // post 삭제 부분
  const postDelete = (articleid) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/articles/${articleid}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        // dispatch(postListDelete());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    showPostDetail(articleNum.id);
    // 카카오지도 api
    // 주소-좌표 변환 객체를 생성합니다
    if (post.address !== null) {
      let geocoder = new kakao.maps.services.Geocoder();
      // let coords = '';
      // // 주소로 좌표를 검색합니다
      geocoder.addressSearch(post.address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 이미지 지도에 표시할 마커를 아래와 같이 배열로 넣어주면 여러개의 마커를 표시할 수 있습니다
          let markers = [
            {
              position: coords,
              text: post.market, // text 옵션을 설정하면 마커 위에 텍스트를 함께 표시할 수 있습니다
            },
          ];

          let staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
            staticMapOption = {
              center: coords, // 이미지 지도의 중심좌표
              level: 3, // 이미지 지도의 확대 레벨
              marker: markers, // 이미지 지도에 표시할 마커
            };
          // 이미지 지도를 생성합니다
          let staticMap = new kakao.maps.StaticMap(
            staticMapContainer,
            staticMapOption
          );
        }
      });
    }
  }, []);

  // 참여하기 버튼 클릭시 일어나는 함수
  const joinChat = (articleid) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/rooms/join/${articleid}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <DetailDiv>
        <div className="detail">
          <UlDiv>
            <div className="profile">
              <ul className="in_grid">
                <li className="profile_info">
                  <ul>
                    <li className="id">{postWriter.name}</li>
                    <li className="location">{postWriter.region}</li>
                    <li className="deal_total">
                      {postWriter.totalTrade}회 바나나마켓 거래 이용
                    </li>
                  </ul>
                </li>
                <li className="image">
                  <img src={basicProfileImage}></img>
                </li>
              </ul>
            </div>
            <li className="title">
              {post.title}
            </li>
            <li className='others'>
              <span className='text'>{post.tradeType} &#183; {post.category}</span>
            </li>
            <li className="content">
              <div>{post.content}</div>
              <img src={post.image} />
            </li>
            <li className="map">
              <div className="map_image" id="staticMap"></div>
            </li>
            <li className="trade_info">
              <div className="date">
                <img className='icon_sma' src={clock_sma}/>
                &nbsp;&nbsp;{post.date}&nbsp;, {post.time}
              </div>
              <div className="pepole">
                <img className='icon_sma' src={chat_sma}/>
                &nbsp;&nbsp;지금 {post.currentMate}명  <span>&nbsp;&#124;&nbsp;</span> 전체 {post.totalMate}명
              </div>
              <div className="spot"> 
                <img className='icon_sma' src={spot_sma}/>  
                &nbsp;&nbsp; {post.market} ( {post.address} ){' '}
                <div className="map_btn btn_css"
                onClick={() => window.open(`${post.url}`, '_blank')}
                  >
                    장소 정보 더보기
                </div>
              </div>
            </li>
          </UlDiv>
        </div>
        {postWriter.isMyPost === true ? (
          <div className="md_btn_list">
            <div
              className="md_btn edit_btn btn_css"
              onClick={() => {
                history.push('/edit');
              }}
            >
              수정하기
            </div>
            <div
              className="md_btn delete_btn btn_css"
              onClick={() => {
                postDelete(post.id);
                history.push('/mylist');
              }}
            >
              삭제하기
            </div>
          </div>
        ) : (
          <div
            className="btn btn_css"
            onClick={() => {
              // handleClick();
              joinChat(post.id);
              history.push('/chat/0');
            }}
          >
            참여하기
          </div>
        )}
      </DetailDiv>
    </>
  );
};

export default PostDetail;

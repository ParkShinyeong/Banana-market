import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// socket 연결
import io from 'socket.io-client';
const endpoint = 'http://localhost:3001';
const chatroom = `${process.env.REACT_APP_API_HTTP_URL}/chatroom`;
const socket = io.connect(chatroom, {
  withCredentials: true,
});

const ChatListDiv = styled.div`
  /* min-width: 360px; */
  min-height: 710px;
  border: 1px solid #c4c4c4;
  @media screen and (max-width: 767px) {
    border: none;
    height: 742px;
    display: none;
  }
  > p {
    height: 35px;
    margin: 15px 15px 0 15px;
    border-bottom: 1px solid #c4c4c4;
    /* background-color: beige; */
  }

  .chatList_div {
    height: 645px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    @media screen and (max-width: 767px) {
      width: 100%;
      height: 670px;
    }
    > .grid {
      width: 360px;
      display: grid;
      grid-template-columns: auto;
      padding: 15px 0 15px 15px;
      grid-gap: 15px;
      /* background-color: violet; */
      @media screen and (max-width: 767px) {
        width: 96%;
      }
      > li {
        box-shadow: 2px 2px 3px 2px #ddd;
        min-height: 85px;
        /* border: 1px solid #ddd; */
        border-radius: 10px;
        cursor: pointer;

        .in_grid {
          display: grid;
          grid-template-columns: 60px auto;
          grid-gap: 15px;
          padding: 10px;
          margin-top: 3px;
          .profile_img {
            display: block;
            height: 60px;
            background-color: #ddd;
            border-radius: 10px;
            img {
              width: 100%;
              height: 60px;
              border-radius: 10px;
            }
          }
          .chat_info {
            min-height: 60px;
            border-radius: 10px;
            position: relative;

            .chat_title {
              width: 100%;
              font-size: 14px;
              margin-top: 8px;
            }
            .content {
              width: 67%;
              font-size: 12px;
              margin-top: 15px;
              color: #555;
            }
            .created_At {
              font-size: 11px;
              position: relative;
              bottom: 15%;
              color: #9d9c9c;
              text-align: right;
              position: absolute;
              right: 0;
            }
          }
        }
      }
    }
  }
  .chatList_div::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
    /* @media screen and (max-width: 767px) {
      display: block;
    } */
  }
`;
const ChatRoomDiv = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 710px;
  position: absolute;
  /* background-color: whitesmoke; */
  z-index: 1;
  @media screen and (max-width: 1200px) {
    /* margin: 80px auto 30px auto; */

    width: 95%;
  }
  @media screen and (max-width: 768px) {
    /* margin: 80px auto 30px auto; */
    width: 100%;
  }
`;

const ChatList = ({ chatRoomId, setChatRoomId, setTitle }) => {
  const history = useHistory();
  const chatListData = useSelector((state) => state.chatListReducer);
  // console.log(chatListData);
  const dispatch = useDispatch();

  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ('0' + (1 + date.getMonth())).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }
  let today = getToday();

  function isToday(date) {
    if (date === null || date === '') {
      return '';
    } else {
      let resultDate = String(date).split(' ')[0];
      let resultTime = String(date).split(' ')[1];
      if (resultDate === today) {
        if (resultTime.split(':')[0] > 12) {
          return (
            '오후 ' +
            (Number(resultTime.split(':')[0]) - 12) +
            ':' +
            Number(resultTime.split(':')[1])
          );
        } else {
          return (
            '오전 ' +
            Number(resultTime.split(':')[0]) +
            ':' +
            Number(resultTime.split(':')[1])
          );
        }
      } else {
        return resultDate;
      }
    }
  }

  const handleClickChatRoom = (e) => {
    let num = e.target.getAttribute('data-value');
    let title = document.getElementById(num).textContent;
    setTitle(title);
    setChatRoomId(Number(num));
    console.log(
      '방제받아오기',
      title,
      '방번호',
      e.target.getAttribute('data-value')
    );
  };
  // 채팅내용 불러오기
  useEffect(() => {
    console.log('방 바뀜', chatRoomId, '챗룸');
    history.push(`/chat/${chatRoomId}`);
  }, [chatRoomId]);

  return (
    <>
      <ChatListDiv>
        <p>채팅 리스트</p>
        <div className="chatList_div">
          {chatListData.length === 0 ? (
            <p style={{ textAlign: 'center', lineHeight: '645px' }}>
              "채팅 목록이 비었습니다"
            </p>
          ) : (
            <ul className="grid">
              {chatListData.map((el, idx) => (
                <li
                  key={idx}
                  // onClick={() => {
                  //   setChatRoom(true);
                  // }}
                  // onClick={() => {
                  //   onClick2();
                  // }}

                  data-value={el.articleId}
                  onClick={handleClickChatRoom}
                >
                  <ul className="in_grid" data-value={el.articleId}>
                    <li className="profile_img" data-value={el.articleId}>
                      <img src={el.image} data-value={el.articleId}></img>
                    </li>
                    <li className="chat_info" data-value={el.articleId}>
                      <ul>
                        <li
                          id={el.articleId}
                          className="chat_title"
                          data-value={el.articleId}
                        >
                          {el.title}
                        </li>
                        <li className="content" data-value={el.articleId}>
                          {el.latestMessage}
                        </li>
                        <li className="created_At" data-value={el.articleId}>
                          {isToday(el.latestCreatedAt)}
                          {/* {String(el.latestCreatedAt).split('T')[0]} */}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ChatListDiv>
      {/* {chatRoom === true ? (
        // <ChatRoomDiv>
        <ChatRoom setChatRoom={setChatRoom}></ChatRoom>
      ) : (
        // </ChatRoomDiv>
        <ChatRoomWrap>채팅방을 선택해주세요</ChatRoomWrap>
      )} */}
    </>
  );
};

export default ChatList;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import chatList_img from '../icon/file.png';
import axios from 'axios';
// socket 연결
import io from 'socket.io-client';
const endpoint = 'http://localhost:3001';
const chatroom = `${endpoint}/chatroom`;
const socket = io.connect(chatroom, {
  withCredentials: true,
});
// FFF7CF

const ChatListDiv = styled.div`
  /* min-width: 360px; */
  border: solid 1px #ebebeb;
  /* border-radius: 10px; */
  min-height: 710px;
  /* border-right: none; */
  /* border-radius: 10px 0px 0px 10px; */

  /* background-color: #fffbe3; */
  /* border: solid 1px #ebebeb; */

  @media screen and (max-width: 767px) {
    border: none;

    display: ${(props) => (props.listDisplay ? 'block' : 'none')};
  }

  .titleDiv {
    height: 55px;
    box-shadow: 0 4px 4px -4px #ebebeb;
    div {
      float: left;
    }
    .mes_img {
      height: 20px;
      width: 20px;
      margin-top: 18px;
      margin-left: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      margin-top: 20px;
      margin-left: 15px;
    }
  }

  .chatList_div {
    height: 635px;
    overflow-y: scroll;
    margin-top: 10px;

    -ms-overflow-style: none;
    scrollbar-width: none;
    @media screen and (max-width: 767px) {
      width: 100%;
      height: 630px;
    }
    > .grid {
      width: 360px;
      border-radius: 5px;
      /* background-color: #f2eccb; */
      display: grid;
      grid-template-columns: auto;
      /* background-color: #f2e49b; */
      margin: 0 auto;
      grid-gap: 5px;
      padding: 5px;
      /* background-color: #fff7cf; */

      @media screen and (max-width: 767px) {
        width: 96%;
        /* padding-top: 20px; */
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
const ListDiv = styled.div`
  /* border: solid 1px #eeeeee; */
  /* background-color: ${(props) => props.color}; */
  /* background-color: #fffff8; */
  min-height: 85px;
  border: solid 1px #ebebeb;
  /* border: 1px solid #ddd; */
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;

  .in_grid {
    display: grid;
    grid-template-columns: 60px auto;
    grid-gap: 15px;
    padding: 10px;
    margin-top: 2px;

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
        width: 245px;
        font-size: 14px;
        margin-top: 7px;
        overflow: hidden;
      }
      .content {
        width: 200px;
        height: 12px;
        overflow: hidden;
        overflow: hidden;
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
`;

const ChatList = ({
  chatRoomId,
  setChatRoomId,
  setTitle,
  listDisplay,
  setListDisplay,
  setRoomDisplay,
  roomDisplay,
  display,
}) => {
  const history = useHistory();
  const chatListData = useSelector((state) => state.chatListReducer);
  // console.log(chatListData);
  const dispatch = useDispatch();

  const [color, setColor] = useState('#fff');
  const colorChange = () => {
    color === '#fff' ? setColor('#FFF7CF') : setColor('#fff');
  };

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
      let resultTime = String(date).split(' ')[1].split(':')[0];
      let resultMin = String(date).split(' ')[1].split(':')[1];

      if (resultDate === today) {
        if (Number(resultTime) > 11) {
          return (
            '오후 ' +
            (Number(resultTime) === 12
              ? String(resultTime)
              : String(Number(resultTime) - 12)) +
            ':' +
            String(resultMin)
          );
        } else {
          return '오전 ' + String(resultTime) + ':' + String(resultMin);
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
    setRoomDisplay(true);
    setListDisplay(false);
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
      <ChatListDiv display={display} listDisplay={listDisplay}>
        <div className="titleDiv">
          <div className="mes_img">
            <img src={chatList_img}></img>
          </div>
          <div className="title">메시지</div>
        </div>

        <div className="chatList_div">
          {chatListData.length === 0 ? (
            <p style={{ textAlign: 'center', lineHeight: '645px' }}>
              "채팅 목록이 비었습니다"
            </p>
          ) : (
            <ul className="grid">
              {chatListData.map((el, idx) => (
                <ListDiv
                  key={idx}
                  // onClick={() => {
                  //   setChatRoom(true);
                  // }}
                  // color={color}

                  onClick={
                    handleClickChatRoom
                    // onClick2();
                  }
                  data-value={el.articleId}
                  // onClick={handleClickChatRoom}
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
                </ListDiv>
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

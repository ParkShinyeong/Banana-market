import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatList from '../component/ChatList';
import ChatRoom from '../component/ChatRoom';
import { useSelector, useDispatch } from 'react-redux';
import { ResetChatList } from '../redux/actions/actions';
import axios from 'axios';
// socket 연결
import io from 'socket.io-client';
const endpoint = 'http://localhost:3001';
const chatroom = `${process.env.REACT_APP_API_URL}/chatroom`;
const socket = io.connect(chatroom, {
  withCredentials: true,
});

const ChatDiv = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  /* padding: 85px 0; */
  padding: 37px 0;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 380px auto;
  @media screen and (max-width: 1200px) {
    /* margin: 80px auto 30px auto; */
    width: 95%;
  }
  @media screen and (max-width: 768px) {
    /* margin: 80px auto 30px auto; */
    grid-template-columns: auto;
    width: 100%;

    padding: 47px 0 0 0;
  }
`;

const Chat = () => {
  const [enterance, setEnterance] = useState(false);
  const [display, setDisplay] = useState('none');
  const [display1, setDisplay1] = useState('block');
  const [chatRoomId, setChatRoomId] = useState(0);
  let [listDisplay, setListDisplay] = useState(true);
  let [roomDisplay, setRoomDisplay] = useState(false);
  const ListData = useSelector((state) => state.chatListReducer);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const chatListData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/rooms`, {
        withCredentials: true,
      })
      .then((chatData) => {
        // console.log(chatData.data.data.roomList);
        //? ---채팅방 이미지---
        let { roomList } = chatData.data.data;
        roomList = roomList.map((elem) => {
          const postImageKey = elem.image;
          elem.image = `https://d2fg2pprparkkb.cloudfront.net/${postImageKey}?w=60&h=60&f=webp&q=90`;
          return elem;
        });

        dispatch({
          type: 'SHOW_CHATLIST',
          payload: chatData.data.data.roomList,
        });
        // console.log(listData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chatListData();
    return () => {
      dispatch(ResetChatList());
    };
  }, []);

  return (
    <div className="section2">
      <ChatDiv>
        <ChatList
          enterance={enterance}
          setEnterance={setEnterance}
          setListDisplay={setListDisplay}
          listDisplay={listDisplay}
          setRoomDisplay={setRoomDisplay}
          roomDisplay={roomDisplay}
          chatRoomId={chatRoomId}
          setChatRoomId={setChatRoomId}
          setTitle={setTitle}
        ></ChatList>
        <ChatRoom
          enterance={enterance}
          setEnterance={setEnterance}
          chatRoomId={chatRoomId}
          setListDisplay={setListDisplay}
          listDisplay={listDisplay}
          setRoomDisplay={setRoomDisplay}
          roomDisplay={roomDisplay}
          setChatRoomId={setChatRoomId}
          title={title}
        ></ChatRoom>
      </ChatDiv>
    </div>
  );
};

export default Chat;

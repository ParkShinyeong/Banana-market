import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory, useParams, Route } from 'react-router-dom';
import SetModal from './SetModal';
import { useSelector, useDispatch } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import logo_svg from '../icon/logo.svg';
import send_img from '../icon/send-mail.png';
import send_img2 from '../icon/paper-plane.png';
import menu_img from '../icon/menu.png';
import back_btn from '../icon/left.png';
import set_img from '../icon/three-dots.png';
import axios from 'axios';

// socket 연결
import io from 'socket.io-client';
const chatroom = `${process.env.REACT_APP_API_URL}/chatroom`;
const socket = io.connect(chatroom, {
  withCredentials: true,
});

const ChatRoomDiv = styled.div`
  /* min-width: 800px; */
  border: solid 1px #ebebeb;
  /* border-left: none; */
  min-height: 710px;

  /* border-radius: 0px 10px 10px 0px; */
  /* position: absolute;
  right: 0; */
  box-sizing: border-box;
  display: ${(props) => props.display};
  @media screen and (max-width: 768px) {
    border: none;
    /* display: none; */
    box-shadow: none;
    width: 100%;
    display: ${(props) => (props.roomDisplay ? 'block' : 'none')};
    /* display: ${(props) => props.display}; */
  }
  .chat_title {
    width: 100%;
    height: 55px;
    display: grid;
    grid-template-columns: auto 45px;
    padding: 10px;
    grid-gap: 15px;

    /* border-bottom: 1px solid #ebebeb; */
    box-shadow: 0 4px 4px -4px #ebebeb;
    background-color: #fff;
    @media screen and (max-width: 768px) {
      grid-template-columns: 25px auto 30px;

      padding: 10px 15px 10px 10px;
      grid-gap: 10px;
    }

    .title {
      height: 30px;
      margin-left: 10px;
      font-size: 17px;
      font-weight: 500;
      line-height: 30px;
      margin-top: 5px;

      @media screen and (max-width: 1200px) {
        font-size: 16px;
      }
      @media screen and (max-width: 768px) {
        font-size: 15px;
        margin-left: 0px;

        margin-top: 3px;
      }
    }
    .set_btn {
      min-height: 30px;
      margin-right: 10px;
      cursor: pointer;
      opacity: 0.9;
      @media screen and (max-width: 768px) {
        margin-right: 0px;
        height: 25px;
        margin-top: 3px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .chat_room {
    height: 573px;
    overflow-y: scroll;
    @media screen and (max-width: 768px) {
      height: 602px;
    }

    .chatContent {
      display: grid;
      grid-template-columns: auto;
      grid-gap: 15px;
      padding: 18px 18px 0 18px;

      .contentDiv {
        .in_grid {
          display: grid;

          grid-template-columns: 40px auto;
          margin-bottom: 18px;
          grid-gap: 15px;

          .profileImage {
            height: 40px;

            border-radius: 50px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50px;
            }
          }
          .user_info {
            border-radius: 10px;

            .name {
              font-size: 15px;
              @media screen and (max-width: 1200px) {
                font-size: 14px;
              }
              @media screen and (max-width: 768px) {
                font-size: 13px;
              }
            }

            .content_detail {
              display: flex;
              align-items: flex-end;
              margin-top: 10px;

              div {
                float: left;
              }
              .contents {
                display: inline-block;
                position: relative;
                max-width: 250px;
                padding: 0.7em 0.95em;
                overflow-wrap: break-word;
                word-break: keep-all;
                color: #0e0e0e;
                line-height: 1.5;
                border-radius: 0px 1.5em 1.5em;
                background-color: #f8f8f8;
                font-size: 15px;
                @media screen and (max-width: 1200px) {
                  max-width: 232px;
                  font-size: 14px;
                }
                @media screen and (max-width: 768px) {
                  font-size: 13px;
                }
              }
              .createdAt {
                font-size: 12px;
                color: #9d9c9c;
                margin-left: 5px;
                @media screen and (max-width: 1200px) {
                  font-size: 11px;
                }
                @media screen and (max-width: 768px) {
                  font-size: 10px;
                }
              }
            }
          }
        }
      }
    }
  }

  .chat_room {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .chat_room::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }

  .chatDiv {
    width: 100%;
    height: 80px;
    background-color: #fff;
    position: relative;
    .chat_content {
      height: 50px;
      width: 95%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: auto 37px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 5px;
      grid-gap: 15px;
      border-radius: 30px;
      border: solid 1px #ebebeb;
      input {
        height: 40px;
        /* background-color: #f4f4f4; */
        font-size: 16px;
        margin-left: 10px;

        border: none;
      }
      input:focus {
        outline: none;
      }
      button.message_btn {
        width: 25px;
        height: 25px;
        /* background-color: #ddd; */
        background-color: transparent; // Background-color 투명 or 배경 없애기
        border: 0;
        outline: 0;
        /* background-color: cornsilk; */
        border-radius: 50px;
        margin-top: 6px;
        cursor: pointer;

        @media screen and (max-width: 768px) {
          /* height: 30px; */
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;

const ChatMyContent = styled.div`
  .in_grid2 {
    margin-bottom: 18px;

    .my_info {
      border-radius: 10px;

      .myContent_detail {
        display: flex;
        align-items: flex-end;

        .mycontents {
          display: inline-block;
          position: relative;

          max-width: 250px;
          padding: 0.7em 0.95em;
          overflow-wrap: break-word;
          word-break: keep-all;
          color: #0e0e0e;
          line-height: 1.5;
          border-radius: 1.5em 0px 1.5em 1.5em;
          background-color: #ffec8b;
          font-size: 15px;
          @media screen and (max-width: 1200px) {
            max-width: 232px;
            font-size: 14px;
          }
          @media screen and (max-width: 768px) {
            font-size: 13px;
          }
        }
        .mycreatedAt {
          font-size: 12px;
          width: 100%;
          color: #9d9c9c;
          margin-right: 5px;
          text-align: right;
          @media screen and (max-width: 1200px) {
            font-size: 11px;
          }
          @media screen and (max-width: 768px) {
            font-size: 10px;
          }
        }
      }
    }
  }
`;

const SetDiv = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 710px;
  position: absolute;
  /* background-color: wheat; */
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
const BackBtn = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    cursor: pointer;
    width: 25px;
    height: 25px;
    margin-top: 5px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;

const ChatRoomWrap = styled.div`
  min-height: 710px;
  background-color: #f9f9f9;
  border-radius: 0px 10px 10px 0px;
  /* border: solid 1px #ebebeb; */
  position: relative;
  border-left: none;
  @media screen and (max-width: 768px) {
    min-height: 737px;
    display: none;
  }
  .logo_img {
    width: 300px;
    height: 80px;
    position: absolute;
    opacity: 0.5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const ChatRoom = ({
  chatRoomId,
  setChatRoomId,
  title,
  enterance,
  setEnterance,
  onClick,
  onClick2,
  roomDisplay,
  setRoomDisplay,
  setListDisplay,
  listDisplay,
}) => {
  const history = useHistory();
  const [secessionModal, setSecessionModal] = useState(false);
  let message = useSelector((state) => state.setMessageReducer);
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  let socketParticipant = useSelector((state) => state.setSocketUserReducer);
  let userId = setUserInfo.userId;
  let userNickName = setUserInfo.nickName;
  const [myMessage, setMyMessage] = useState(''); // 내가 보내는 메세지
  const [participant, setParticipant] = useState([]); // 참가자 목록
  const dispatch = useDispatch();
  let articleNum = useParams();

  // 스크롤 하단으로 이동
  const scrollDivRef = useRef(null);
  const scrollToBottomSend = () => {
    scrollDivRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToBottom = () => {
    scrollDivRef.current?.scrollIntoView({});
  };
  // const scrollToElement = () => {scrollDivRef.current.scrollIntoView()};
  // 날 짜 변 환
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

  //-----------------------소캣 온 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!소캣온온온!!!!!!!!
  const timeSetting = (createdAt) => {
    let result = '';
    let date = createdAt.split('T')[0];
    let time = Number(createdAt.split('T')[1].split('.')[0].split(':')[0]) + 9;
    let min = createdAt.split('T')[1].split('.')[0].split(':')[1];
    if (time > 24) {
      result = today + ' ' + (time - 24) + ':' + min;
    } else {
      result = date + ' ' + time + ':' + min;
    }
    return result;
  };
  // console.log(timeSetting('2022-03-03T12:59:01.433Z'))

  useEffect(() => {
    socket.on(
      'message',
      ({ contents, createdAt, profileImage, name }) => {
        console.log(
          '소캣온 잘 받고 있나요 ? ',
          contents,
          createdAt,
          profileImage,
          name
        );
        // console.log('여기',socketParticipant)
        if (!profileImage) {
          profileImage =
            'https://d35fj6mbinlfx5.cloudfront.net/basicProfileImage.png?w=40&h=40&f=webp&q=90';
        } else {
          profileImage = `https://d35fj6mbinlfx5.cloudfront.net/${profileImage}?w=40&h=40&f=webp&q=90`;
        }

        dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            contents: contents,
            profileImage: profileImage,
            name: name,
            createdAt: timeSetting(createdAt),
          },
        });
        scrollToBottomSend();
        // scrollToElement(); //
      },
      (error) => {
        console.log('why error?', error);
      }
    );

    return () => {
      socket.off('message');
    };
  }, []);

  //참가자 정보 편집 함수
  const participantEditObj = (participant) => {
    let participantArr = [];
    let obj = {};
    for (let i = 0; i < participant.length; i++) {
      let participantObj = { name: '', profileImage: '' };
      participantObj['name'] = participant[i].name;
      participantObj['profileImage'] = participant[i].profileImage;
      obj[participant[i].id] = participantObj;
    }
    return obj;
  };

  //채팅방 선택 진입 (채팅내용, 참여자 불러옴)----------- 1
  const chatContent = (chatRoomId) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/rooms/messages/${chatRoomId}`, {
        withCredentials: true,
      })
      .then((res) => {
        let messageList = res.data.data.messageList;
        console.log('채팅내용불러오기', messageList);
        // 참가후 쓴 메시지 없으면 : { }  , 메세지 있으면 [ {}, {} ]
        if (!Array.isArray(messageList)) {
          messageList = [
            {
              profileImage: '',
              name: '바나나마켓',
              createdAt: '2022-03-03 18:00:00',
              contents: '이 거래에 참가하신 것을 환영합니다.',
            },
          ];
        }
        console.log('채팅내용 없을때 세팅 후 ', messageList);
        //? ---채팅리스트 프로필 이미지 수정---
        messageList = messageList.map((elem) => {
          let profileImageKey = elem.profileImage;
          if (!profileImageKey) {
            elem.profileImage =
              'https://d35fj6mbinlfx5.cloudfront.net/basicProfileImage.png?w=40&h=40&f=webp&q=90';
          } else {
            elem.profileImage = `https://d35fj6mbinlfx5.cloudfront.net/${profileImageKey}?w=40&h=40&f=webp&q=90`;
          }
          return elem;
        });
        // 채팅내용 세팅
        // setMessage(messageList.reverse());
        dispatch({ type: 'SHOW_MESSAGE', payload: messageList.reverse() });
        scrollToBottom(); //

        // 방 참가자 목록받기
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/rooms/participant/${chatRoomId}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            // console.log(res.data.data.participant)
            //? ---참가자 프로필 이미지 수정---
            let participantList = res.data.data.participant;
            console.log('참여자 목록', participantList);
            participantList = participantList.map((elem) => {
              let profileImageKey = elem.profileImage;
              if (!profileImageKey) {
                elem.profileImage =
                  'https://d35fj6mbinlfx5.cloudfront.net/basicProfileImage.png?w=40&h=40&f=webp&q=90';
              } else {
                elem.profileImage = `https://d35fj6mbinlfx5.cloudfront.net/${profileImageKey}?w=40&h=40&f=webp&q=90`;
              }
              return elem;
            });
            // console.log('참여자 목록', participantList);
            setParticipant(participantList);
            console.log('참여자 목록', participantList);
            // 채팅방 참여하기 ------------------------ 2 :: 소캣으로 채팅 참여
            console.log(
              'userId',
              typeof userId,
              userId,
              'chatRoomId',
              typeof chatRoomId,
              chatRoomId
            );
            socket.emit('join', { userId: userId, roomId: chatRoomId });
            // 참가자 목록 편집
            dispatch({
              type: 'SET_SOCKET_USER',
              payload: participantEditObj(participant),
            });
            // socketParticipant = participantEditObj(participant);
            console.log('소캣용 편집 참가자', socketParticipant);
            // 참가자 없을때 ====> 방에 참가하지 않았는데 방이 보이는 오류일때
            participant ? setEnterance(true) : setEnterance(false);
          })
          .catch((err) => {
            setEnterance(false);
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(chatRoomId);
        console.log(err);
      });
  };

  useEffect(() => {
    //채팅방 바뀔때 채팅내용 불러오기--------------0
    chatContent(chatRoomId);
  }, [chatRoomId]);

  // 작성한 메세지 인풋값 저장
  const handleChangeMessage = (e) => {
    setMyMessage(e.target.value);
  };
  // 메세지 보내기 버튼 클릭시 진행되는 함수
  const handleClickSendMessage = (e) => {
    // console.log(myMessage, userId, chatRoomId, myMessage)
    console.log('메세지 보냄', myMessage);
    e.preventDefault();
    //socket.emit('sendMessage', 'from front');
    socket.emit(
      'sendMessage',
      {
        userId: userId,
        roomId: chatRoomId,
        message: myMessage,
        created: message,
      },
      (error) => {
        if (error) console.log(error);
      }
    );
    console.log('메세지 리셋');
    setMyMessage('');
    // scrollToElement();
  };

  //   // 채팅방 나가기 handler
  const leaveRoom = (event) => {
    // event.preventDefault();
    let obj = { userId: userId, roomId: chatRoomId };
    socket.emit('leave', obj, (error) => {
      if (error) console.log(error);
    });
    console.log(`${obj.roomId}방을 나갔습니다`);
    history.push('/chat/0');
    setChatRoomId(0);
  };

  return (
    <Route path={'/chat/' + chatRoomId}>
      {title ? (
        <ChatRoomDiv listDisplay={listDisplay} roomDisplay={roomDisplay}>
          <div className="chat_title">
            <BackBtn
              className="back_btn"
              onClick={() => {
                setRoomDisplay(false);
                setListDisplay(true);
              }}
            >
              <img src={back_btn}></img>
            </BackBtn>
            <div className="title">{title}</div>
            <div
              className="set_btn"
              onClick={(e) => {
                setSecessionModal(true);
              }}
            >
              <img src={set_img}></img>
              {/* {secessionModal === true ? (
              <SecessionModal
                setSecessionModal={setSecessionModal}
              ></SecessionModal>
            ) : null} */}
            </div>
          </div>
          <div className="chat_room">
            <ScrollToBottom className="chatContent">
              {enterance ? (
                message.map((el, idx) => (
                  <>
                    {el.name !== userNickName ? (
                      <li className="contentDiv" key={idx}>
                        <ul className="in_grid">
                          <li className="profileImage">
                            <img src={el.profileImage}></img>
                          </li>
                          <li className="user_info">
                            <ul>
                              <li className="name">{el.name}</li>
                              <li className="content_detail">
                                <div className="contents">
                                  <p>{el.contents}</p>
                                </div>
                                <div className="createdAt">
                                  {isToday(el.createdAt)}
                                </div>
                                <div
                                  className="scrollDiv"
                                  ref={scrollDivRef}
                                ></div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <ChatMyContent key={idx}>
                        <ul className="in_grid2">
                          <li className="my_info">
                            <ul>
                              <li className="myContent_detail">
                                <div className="mycreatedAt">
                                  {isToday(el.createdAt)}
                                </div>
                                <div className="mycontents">{el.contents}</div>
                                <div
                                  className="scrollDiv"
                                  ref={scrollDivRef}
                                ></div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </ChatMyContent>
                    )}
                  </>
                ))
              ) : (
                <div> 채팅 입장에 실패했습니다. 다시 입장해주세요! </div>
              )}
            </ScrollToBottom>
            {/* <ChatContent></ChatContent> */}
          </div>
          <div className="chatDiv">
            <form onSubmit={handleClickSendMessage} className="chat_content">
              <input
                type="text"
                className="message"
                placeholder="메세지를 입력해주세요."
                onChange={handleChangeMessage}
                value={myMessage}
                // value={message || ''}
              ></input>
              <button className="message_btn">
                <img src={send_img2}></img>
              </button>
            </form>
          </div>
        </ChatRoomDiv>
      ) : (
        <ChatRoomWrap>
          <div className="logo_img">
            <img src={logo_svg}></img>
          </div>
        </ChatRoomWrap>
      )}

      {secessionModal === true ? (
        <SetDiv>
          <SetModal
            chatRoomId={chatRoomId}
            setSecessionModal={setSecessionModal}
            leaveRoom={leaveRoom}
            participant={participant}
          ></SetModal>
        </SetDiv>
      ) : null}
    </Route>
  );
};

export default ChatRoom;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ResetChatList } from '../redux/actions/actions';
import alert_btn from '../icon/alarm.png';
import axios from 'axios';

// socket 연결
import io from 'socket.io-client';
const endpoint = 'http://localhost:3001';
const chatroom = `${process.env.REACT_APP_API_HTTP_URL}/chatroom`;
const socket = io.connect(chatroom, {
  withCredentials: true,
});

const SetModalDiv = styled.div`
  width: 330px;
  height: 710px;
  background-color: #f4f4f4;
  position: absolute;
  right: 0%;
  z-index: 1;
  @media screen and (max-width: 768px) {
    height: 737px;
  }
  .close {
    width: 28px;
    height: 28px;
    color: #c1c1c1;
    float: right;
    font-weight: 600;
    margin-top: 8px;
    margin-right: 8px;
    font-size: 30px;
    cursor: pointer;
  }
  .user {
    width: 250px;
    min-height: 130px;
    margin: 90px auto 0 auto;
    position: relative;
    border-bottom: 1px solid #ddd;
    @media screen and (max-width: 768px) {
      margin: 100px auto 0 auto;
    }
    p {
      position: absolute;
      top: 3%;
    }
    .user_info {
      font-size: 11px;
      position: absolute;
      bottom: 30%;
      line-height: 1.5;
      color: #929292;
    }
  }
  .user_list {
    width: 270px;
    height: 260px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border-radius: 10px;
    background-color: #fff;
    margin: 50px auto;
    @media screen and (max-width: 768px) {
      height: 258px;
    }
    .grid {
      display: grid;
      grid-template-columns: auto;
      padding: 10px;

      grid-gap: 10px;
      li {
        min-height: 40px;

        div {
          float: left;
        }
        .user_img {
          width: 40px;
          height: 40px;
          border-radius: 50px;
        }
        .user_id {
          margin-left: 10px;
          width: 100px;
          overflow: hidden;
          height: 40px;
          font-size: 14px;
          color: #2b2828;
          line-height: 40px;
        }
        .declaration_btn {
          width: 22px;
          height: 22px;
          margin-top: 9px;
          margin-left: 7px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .declaration_btn2 {
          width: 22px;
          height: 22px;
          margin-top: 9px;
          cursor: pointer;
          float: right;

          img {
            width: 100%;
            height: 100%;
          }
        }
        .user_out {
          height: 25px;
          width: 60px;
          margin-top: 7px;
          border: 1px solid #ff3c3c;
          box-sizing: border-box;
          font-size: 12px;
          line-height: 24px;
          border-radius: 30px;
          cursor: pointer;
          color: #ff3c3c;
          text-align: center;
          margin-left: 8px;
        }
      }
    }
  }
  .user_list::-webkit-scrollbar {
    display: none;
  }
  .exit {
    width: 250px;
    height: 45px;
    background-color: #ffe763;
    box-sizing: border-box;
    border-radius: 10px;
    margin: 50px auto 0 auto;
    /* border-radius: 10px; */
    cursor: pointer;
    line-height: 45px;
    text-align: center;
    &:hover {
      background-color: rgb(0, 0, 0, 0.1);
      color: #2b2828;
    }
  }
`;

const ToggleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0%;
  cursor: pointer;
  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    /* background: linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%); */
    background: linear-gradient(to left, #ddd 50%, #ffe249 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition-duration: 1s;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
    &.toggle--checked {
      /* background-color: #ddd; */
      background-position: left bottom;
    }
  }
  > .toggle-circle {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ffffff;
    transition-duration: 0.7s;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
    &.toggle--checked {
      left: 28px;
    }
  }
`;
const Desc = styled.div`
  // TODO : 설명 부분의 CSS를 구현합니다.
  position: absolute;
  right: 25%;
  top: 2%;
  font-size: 15px;
  color: #2b2828;
  /* text-align: center; */
`;

const ExitModalDiv = styled.div`
  width: 330px;
  height: 710px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0, 0.6);
  .exit_modal {
    width: 250px;
    height: 180px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    .exit_title {
      text-align: center;
      width: 220px;
      margin: 30px auto 15px auto;
      font-weight: 500;
    }
    .exit_info {
      width: 200px;
      margin: 0 auto;
      font-size: 11px;
      margin: 0 auto 25px auto;
      text-align: center;
      line-height: 1.5;
      color: #4c4c4c;
    }
    .exit_btn {
      width: 210px;
      height: 30px;
      margin: 0 auto;
      > div {
        float: left;
      }
      .cancel {
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #f4f4f4;
        font-size: 13px;
        cursor: pointer;
      }
      .ok {
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #c4c4c4;
        font-size: 13px;
        float: right;
        cursor: pointer;
      }
    }
  }
`;

const SetModal = ({
  setSecessionModal,
  leaveRoom,
  participant,
  setParticipant,
  chatRoomId,
}) => {
  const history = useHistory();
  // const [isOn, setisOn] = useState(false);
  const [existBtn, setExistBtn] = useState(false);
  const [outBtn, setOutBtn] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(true);

  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  let userId = setUserInfo.userId;
  let [outUserId, setOutUserId] = useState(null);

  // ----- 메이트 모집 완료 표시
  const handleClickCloseBtn = (articleid) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/articles/close/${articleid}`)
      .then((res) => {
        console.log(res.data.data.article);
        setStatus(res.data.data.article.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //참가자 내보내기 버튼 클릭 handler
  const handleClickOutBtn = (e) => {
    let num = e.target.getAttribute('data-value');
    setOutUserId(num);
    setOutBtn(true);
  };

  //채팅방 내보내기 확인!! handler
  const outRoomConfirm = (event) => {
    // event.preventDefault();
    let obj = { userId: outUserId, roomId: chatRoomId };
    socket.emit('leave', obj, (error) => {
      if (error) console.log(error);
    });
    alert(`${obj.roomId}가 방에서 내보내졌습니다.`);
    setOutBtn(false);
    let participantList = participant;
    delete participantList[outUserId];
    setParticipant(participantList);
  };

  // 참가자 신고
  const userDeclaration = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/report`,
        {
          userId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //참가자 정보 편집
  const participantEditObj = (participant) => {
    let ResultObj = {};
    participant.map((el) => {
      let participantObj = {
        isHost: '',
      };
      participantObj['isHost'] = el.isHost;
      ResultObj[el.id] = participantObj;
    });
    return ResultObj;
  };

  let isHostId = participantEditObj(participant);
  let roomHost = isHostId[Number(userId)].isHost;

  let hostId = participant.filter((person) => {
    return person.isHost === '1';
  });

  // console.log('참가자', participant[0].isHost);
  if (hostId.length === 0) {
    hostId = 1;
  } else {
    hostId = hostId[0].id;
  }
  // 참가자 목록 편집
  // console.log(isHostId[Number(userId)].isHost);

  return (
    <>
      <SetModalDiv>
        <div className="close" onClick={() => setSecessionModal(false)}>
          &times;
        </div>

        <div className="user">
          <p
            style={{
              fontSize: '16px',
            }}
          >
            인원모집
          </p>

          {roomHost === '1' ? (
            <ToggleContainer>
              <ToggleContainer
                onClick={() => {
                  // setisOn(!isOn);
                  handleClickCloseBtn(chatRoomId);
                  // handleClickCloseBtn();
                }}
              >
                <div
                  className={`toggle-container ${
                    status === false ? '' : 'toggle--checked'
                  }`}
                />
                <div
                  className={`toggle-circle ${
                    status === false ? '' : 'toggle--checked'
                  }`}
                />
              </ToggleContainer>
            </ToggleContainer>
          ) : null}
          {roomHost === '1' ? (
            status === false ? (
              <Desc>OFF</Desc>
            ) : (
              <Desc>ON</Desc>
            )
          ) : null}
          <div className="user_info">
            인원모집 마감이 ‘OFF’ 이 되면 인원모집이 마감됩니다.<br></br>
            새로운 참가자는 더 이상 거래참가를 할 수 없습니다.
          </div>
        </div>

        {hostId === userId ? (
          <div className="user_list">
            <ul className="grid">
              {participant.map((el, idx) => (
                <li key={idx}>
                  <div className="user_img" src={el.profileImage}>
                    <img src={el.profileImage}></img>
                  </div>
                  <div className="user_id">{el.name}</div>
                  <div
                    className="declaration_btn"
                    onClick={() => {
                      setDeclaration(true);
                    }}
                  >
                    <img src={alert_btn}></img>
                  </div>
                  {el.isHost === '1' ? null : (
                    <>
                      <div
                        className="user_out"
                        data-value={el.id}
                        onClick={handleClickOutBtn}
                      >
                        내보내기
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="user_list">
            <ul className="grid">
              {participant.map((el, idx) => (
                <li key={idx}>
                  <div className="user_img">
                    <img src={el.profileImage}></img>
                  </div>
                  <div className="user_id">{el.name}</div>
                  <div
                    className="declaration_btn2"
                    onClick={() => {
                      setDeclaration(true);
                    }}
                  >
                    <img src={alert_btn}></img>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="exit"
          onClick={() => {
            setExistBtn(true);
          }}
        >
          채팅방 나가기
        </div>
        {existBtn === true ? (
          <ExitModal
            setSecessionModal={setSecessionModal}
            setExistBtn={setExistBtn}
            leaveRoom={leaveRoom}
          ></ExitModal>
        ) : null}
        {outBtn === true ? (
          <UserOut
            outRoomConfirm={outRoomConfirm}
            setOutBtn={setOutBtn}
          ></UserOut>
        ) : null}
        {declaration === true ? (
          <UserDeclaration
            setDeclaration={setDeclaration}
            userDeclaration={userDeclaration}
          ></UserDeclaration>
        ) : null}
      </SetModalDiv>
    </>
  );
};

function ExitModal({ setExistBtn, leaveRoom, setSecessionModal }) {
  const history = useHistory();
  // console.log(chatListData);
  const dispatch = useDispatch();

  const chatListData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/rooms`, {
        withCredentials: true,
      })
      .then((chatData) => {
        // console.log(chatData.data.data.roomList);
        let { roomList } = chatData.data.data;
        console.log(roomList);
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
    return () => {
      dispatch(ResetChatList());
      chatListData();
      console.log('실행');
    };
  }, []);
  return (
    <ExitModalDiv>
      <div className="exit_modal">
        <div className="exit_title">채팅방을 정말 나가시겠습니까 ?</div>
        <div className="exit_info">
          채팅방을 나가시는 경우, 해당 거래 참여가 <br></br>취소되고 대화 내용이
          모두 삭제됩니다.
        </div>
        <div className="exit_btn">
          <div className="cancel" onClick={() => setExistBtn(false)}>
            취소하기
          </div>
          <div
            className="ok"
            onClick={() => {
              leaveRoom();
              history.push('/chat/0');
              setExistBtn(false);
              setSecessionModal(false);
            }}
          >
            나가기
          </div>
        </div>
      </div>
    </ExitModalDiv>
  );
}

function UserOut({ setOutBtn, outRoomConfirm }) {
  return (
    <ExitModalDiv>
      <div className="exit_modal">
        <div className="exit_title">이 참가자를 내보내시겠습니까 ?</div>
        <div className="exit_info">
          내보내진 참가자는 <br></br>더 이상 거래에 참여할 수 없습니다.
        </div>
        <div className="exit_btn">
          <div className="cancel" onClick={() => setOutBtn(false)}>
            취소하기
          </div>
          <div className="ok" onClick={outRoomConfirm}>
            내보내기
          </div>
        </div>
      </div>
    </ExitModalDiv>
  );
}
function UserDeclaration({ setDeclaration, userDeclaration, participant }) {
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  let userId = setUserInfo.userId;
  return (
    <ExitModalDiv>
      <div className="exit_modal">
        <div className="exit_title">이 참가자를 신고하시겠습니까 ?</div>
        <div className="exit_info">
          신고한 참가자는 <br></br>더 이상 거래를 이용할 수 없습니다.
        </div>
        <div className="exit_btn">
          <div className="cancel" onClick={() => setDeclaration(false)}>
            취소하기
          </div>
          <div
            className="ok"
            onClick={() => {
              userDeclaration(userId);
              setDeclaration(false);
            }}
          >
            신고하기
          </div>
        </div>
      </div>
    </ExitModalDiv>
  );
}

export default SetModal;

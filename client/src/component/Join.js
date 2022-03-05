import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Chat from '../pages/Chat';
import { Link } from 'react-router-dom';
import searchList from '../resource/cityList';
import { ReactComponent as CheckIcon1 } from '../icon/check_icon.svg';
import { ReactComponent as CheckIcon2 } from '../icon/check_icon.svg';
import next_icon from '../icon/next_icon.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLogin,
  setLogout,
  setUpdateUserInfo,
} from '../redux/actions/actions';
import PersonalInformModal from './PersonalInformModal';
import axios from 'axios';

const Wrapper = styled.div`
  max-width: 1200px;
  /* background-color: powderblue; */
  margin: 50px auto;
  font-size: 18px;
  color: #444;
  @media screen and (max-width: 767px) {
    margin: 80px auto 30px auto;
    width: 100%;
  }
  .detail {
    width: 440px;
    border: 1px solid #ecede8;
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 40px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 1px 1px 5px 0px #00000014;
    @media screen and (max-width: 767px) {
      width: 90%;
      height: auto;
    }
    /* padding-top: 20px; */
  }

  .btn {
    width: 440px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 500;
    box-sizing: border-box;
    margin: 20px auto 0 auto;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 1px 1px 5px 0px #00000014;
    border: 0px;
    background-color: #a1d026;
    color: #fbfff1;
    cursor: pointer;
    /* border: 1px solid #eaeaea;
    background-color: #ececec;
    color: #aeaeae;
    &:hover{
      border: 0px;
      background-color:#a1d026;
      color:#fbfff1;
    } */
    @media screen and (max-width: 767px) {
      margin: 25px auto 0 auto;
      width: 90%;
    }
  }
`;

const UlDiv = styled.ul`
  width: 380px;
  /* background-color: rebeccapurple; */
  margin: 0 auto;
  border-radius: 10px;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 0;
  }
  .pi_inform {
    background-color: #f7f7f7;
    padding: 15px 10px 15px 20px;
    border-radius: 10px;

    > input {
      margin-top: 3px;
      position: relative;
      top: 8px;
    }
    > span#check_pi_inform {
      font-size: 16px;
      line-height: 16px;
      color: #444;
      padding-left: 0px;
      @media screen and (max-width: 450px) {
        font-size: 13px;
      }
    }
    > div {
      margin-left: 25px;
      font-size: 13px;
      width: 100px;
      height: 30px;
      color: #0075ff;
      border: 1px solid #0075ff;
      border-radius: 100px;
      text-align: center;
      line-height: 30px;
      margin-top: 20px;
    }
  }
  > li.info_area {
    display: block;
    width: 380px;
    height: auto;
    font-size: 16px;
    /* background-color: salmon; */
    margin-bottom: 40px;
    box-sizing: border-box;
    /* height: 40px; */
    .tt {
      /* border: 1px solid red; */
      font-size: 14px;
      font-weight: 400;
      color: #818181;
      width: 60px;
      float: left;
      padding-top: 18px;
    }
    .text {
      /* border: 1px solid red; */
      height: 45px;
      width: calc(100% - 140px);
      float: left;
      > input {
        font-size: 18px;
        width: 100%;
        height: 45px;
        color: black;
      }
    }
    .s_btn {
      text-align: center;
      font-size: 12px;
      font-weight: 500;
      width: 70px;
      height: 40px;
      float: right;
      color: #fbfff1;
      background-color: #a1d026;
      border-radius: 8px;
      padding-top: 6px;
    }
    > span {
      position: relative;
      top: 8px;
      font-size: 12px;
      padding-left: 60px;
      display: inline-block;
      color: #a1d026;
      /* background-color: green; */
    }
    > span.error_message {
      color: #ffc004;
    }
    > div.hidden {
      height: 40px;
    }
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto 20px auto;
    }
  }
  .security_num > div.text {
    width: calc(100% - 70px);
  }
  .spot > div.text {
    width: calc((100% - 80px) / 2);
    > select {
      width: 100%;
      height: 45px;
      font-size: 16px;
      line-height: 22px;
    }
  }
  .spot > div.text_right {
    float: right;
  }
  > li.info_area.password {
    > div.text {
      width: calc(100% - 60px);
      > input.password {
        display: block;
        width: calc(100% - 20px);
        float: left;
      }
      svg {
        width: 16px;
        height: 16px;
        margin-top: 12px;
        display: block;
        float: right;
      }
    }
    > span {
      font-size: 12px;
      padding-left: 60px;
      display: inline-block;
      /* background-color: green; */
      margin-bottom: 8px;
      /* width: 100%;
      height: auto;
      background-color: yellow;
      display: block; */
    }
    > div.text_right {
      width: 100%;
      height: 45px;
      padding-left: 60px;
      /* background-color: red; */
      > input.password {
        font-size: 18px;
        margin-top: 8px;
        display: block;
        width: calc(100% - 20px);
        float: left;
      }
      svg {
        width: 16px;
        height: 16px;
        margin-top: 12px;
        display: block;
        float: right;
      }
    }
  }
`;

const Join = () => {
  const history = useHistory();
  let setLoginState = useSelector((state) => state.setLoginReducer);
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  let dispatch = useDispatch();
  // SelectBox 내용
  const SelectList = ['서울특별시'];
  // useState로 Input 값 받기
  let [inputId, setInputId] = useState('');
  let [inputNickname, setInputNickname] = useState('');
  let [imgBase64, setImgBase64] = useState(null);

  // 통과여부
  let [checkEmail, setCheckEmail] = useState(false); // 이메일 유효성 검사 통과여부
  let regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  let [checkNickname, setCheckNickname] = useState(true); // 닉네임 중복 검사 통과
  let [isCheckedNickname, setIsCheckedNickname] = useState(false); // 닉네임 검사 전
  let [checkNewPassword, setCheckNewPassword] = useState(false); // 비밀번호 유효성 검사 통과여부
  let regPassword = /^(?=.*[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;
  let [checkReNewPassword, setCheckReNewPassword] = useState(false); // 비밀번호 재확인 검사 통과여부

  // OK 된 값 (제출 확정 값)
  let [userId, setUserId] = useState('');
  let [inputSecurityNum, setInputSecurityNum] = useState(null);
  let [userNickname, setUserNickname] = useState('');
  let [selectCity, setSelectCity] = useState('');
  let [selectDistrict, setSelectDistrict] = useState('');
  let [inputNewPassword, setInputNewPassword] = useState('');
  let [securityNum, setSecurityNum] = useState(null);
  let [profileImg, setProfileImg] = useState(null);

  // PersonalInformModal On / Off
  let [personalInformModal, setPersonalInformModal] = useState(false);
  let [piCheck, setPiCheck] = useState(false); // 개인정보처리방침 동의여부

  //----------------------이미지-----------------------
  //이미지 업로드 버튼 실행함수
  const handleChangeUpload = (e) => {
    const uploadFile = e.target.files[0];
    setThumbnail(uploadFile); // 썸네일 만들기
    const formData = new FormData();
    formData.append('profileImage', uploadFile);
    setProfileImg(formData);
  };
  //이미지 삭제버튼 실행함수
  const handleClickDeleteImg = (e) => {
    setProfileImg(null);
  };
  // 썸네일 만드는 함수
  const setThumbnail = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgBase64(reader.result);
        resolve();
      };
    });
  };

  //----------------------이메일-----------------------
  // 이메일 유효성 검사 :
  const handleChangeId = (e) => {
    setInputId(e.target.value);
    if (e.target.value !== '') {
      if (true === regEmail.test(e.target.value)) {
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
      }
    } else {
      setCheckEmail('검사전');
    }
  };
  // 이메일 인증번호확인 버튼 클릭 시 진행되는 함수
  const handleClickSendSecurityNum = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/validation/email`,
        {
          email: inputId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        alert('이메일에 인증번호가 전송되었습니다');
        // 이메일 인증번호 저장
        setSecurityNum(res.data.data.authorizationNum);
        setUserId(inputId);
        // 이메일 전송
      })
      .catch((err) => {
        console.log(err);
        let result = String(err);
        if (result.includes('409')) alert('가입된 이메일입니다');
        else if (result.includes('500')) alert('서버오류입니다');
      });
  };
  // 인증번호 작성 함수
  const handleChangeSecurityNum = (e) => {
    console.log(e.target.value);
    console.log(
      'securityNum',
      securityNum,
      Number(securityNum) === Number(e.target.value)
    );
    setInputSecurityNum(e.target.value);
  };

  //----------------------닉네임-----------------------
  // 닉네임 작성 함수
  const handleChangeNickName = (e) => {
    if (userNickname !== e.target.value) setIsCheckedNickname(false);
    else if (e.target.value === '') setIsCheckedNickname(false);
    else setIsCheckedNickname(true);
    setInputNickname(e.target.value);
  };

  // 닉네임 중복 확인 시 진행되는 함수
  const handleClickNickName = (e) => {
    setIsCheckedNickname(true);
    if (inputNickname !== '') {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/validation/name`,
          {
            name: inputNickname,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          setCheckNickname(true);
          setUserNickname(inputNickname);
        })
        .catch((err) => {
          console.log(err);
          let result = String(err);
          if (result.includes('409')) setCheckNickname(false);
          else if (result.includes('500')) setIsCheckedNickname(false);
        });
    }
  };
  //----------------------장소-----------------------
  // 시에 따라 구 select box 값 정하는 함수
  const handleChangeCity = (e) => {
    setSelectCity(e.target.value);
    setSelectDistrict('');
  };
  const handleChangeDistrict = (e) => {
    setSelectDistrict(e.target.value);
  };
  //----------------------비밀번호-----------------------
  // 비밀번호 유효성 검사 :
  const handleChangeNewPassword = (e) => {
    setInputNewPassword(e.target.value);
    if (true === regPassword.test(e.target.value)) {
      setCheckNewPassword(true);
    } else {
      setCheckNewPassword(false);
    }
  };
  // 비밀번호 재확인 검사 :
  const handleChangeRePassword = (e) => {
    if (inputNewPassword === e.target.value) {
      setCheckReNewPassword(true);
    } else {
      setCheckReNewPassword(false);
    }
  };

  //----------------------가입하기-----------------------
  // 가입하기 버튼 클릭 시 진행되는 함수
  const handleClickSubmit = (e) => {
    if (piCheck) {
      if (securityNum && Number(securityNum) === Number(inputSecurityNum)) {
        if (
          inputId === userId &&
          inputNickname === userNickname &&
          checkNewPassword &&
          checkReNewPassword &&
          selectDistrict !== ''
        ) {
          // console.log(inputId, userId, inputNickname,userNickname, checkNewPassword, checkReNewPassword, selectDistrict  )
          //1.회원가입
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/signup`,
              {
                email: userId,
                password: inputNewPassword,
                region: selectDistrict,
                name: userNickname,
              },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              //회원가입 성공
              alert(`회원가입이 성공적으로 진행되었습니다.`);
            })
            .catch((err) => {
              // 회원가입 실패
              alert(`회원가입에 실패했습니다.`);
              setCheckNickname(false);
              console.log(err);
            });
        } else {
          alert(
            '잘못 기입된 것이 있습니다. 이메일, 닉네임, 나의지역, 비밀번호를 모두 통과하셔야 합니다.'
          );
        }
      } else {
        alert('이메일 인증을 진행해주세요');
      }
    } else {
      alert('개인정보처리방침에 동의는 필수사항입니다.');
    }
  };

  //임의로 만든 alert창 추후 모달창으로 교체
  const handleChange = (e) => {
    console.log(selectCity, selectDistrict);
    alert(`바나나마켓에 오신 것을 환영합니다!
    로그인 후 서비스를 이용해 주세요 :)`);
  };

  return (
    <>
      {personalInformModal ? (
        <PersonalInformModal
          setPersonalInformModal={setPersonalInformModal}
          setPiCheck={setPiCheck}
        ></PersonalInformModal>
      ) : (
        <div></div>
      )}
      <Wrapper>
        <div className="detail">
          <UlDiv>
            <li className="id info_area">
              <div className="tt">아아디</div>
              <div className="text">
                <input
                  className="input_css2"
                  type="text"
                  onChange={handleChangeId}
                  placeholder="이메일을 입력해주세요"
                />
              </div>
              <div className="s_btn" onClick={handleClickSendSecurityNum}>
                인증번호
                <br />
                받기
              </div>
              {inputId === '' ? (
                <span className="error_message">이메일을 작성해주세요 </span>
              ) : checkEmail ? (
                <span>유효한 이메일 입니다</span>
              ) : (
                <span className="error_message">
                  유효하지 않은 이메일 입니다
                </span>
              )}
            </li>
            <li className="security_num info_area">
              <div className="tt">인증번호</div>
              <div className="text">
                <input
                  className="input_css2"
                  type="text"
                  onChange={handleChangeSecurityNum}
                />
              </div>
              {inputSecurityNum !== '' ? (
                <div className="hidden"></div>
              ) : (
                <span className="error_message">인증번호를 입력하세요</span>
              )}
            </li>
            <li className="nick info_area">
              <div className="tt">닉네임</div>
              <div className="text">
                <input
                  className="input_css2"
                  type="text"
                  onChange={handleChangeNickName}
                />
              </div>
              <div className="s_btn" onClick={handleClickNickName}>
                닉네임
                <br />
                중복확인
              </div>
              {isCheckedNickname ? (
                checkNickname ? (
                  <span>사용가능한 닉네임입니다 </span>
                ) : (
                  <span className="error_message">중복된 닉네임입니다 </span>
                )
              ) : (
                <span className="error_message">
                  닉네임 중복확인을 진행해주세요
                </span>
              )}
            </li>
            <li className="spot info_area">
              <div className="tt">장소</div>
              <div className="text">
                <select
                  className="select_css2"
                  name="city"
                  onChange={handleChangeCity}
                >
                  <option value="">시</option>
                  {SelectList.map((el, idx) => (
                    <option key={idx} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text text_right">
                <select
                  className="select_css2"
                  name="district"
                  onChange={handleChangeDistrict}
                >
                  <option value="">구</option>
                  {searchList[0][selectCity] ? (
                    searchList[0][selectCity].map((el, idx) => (
                      <option key={idx} value={el}>
                        {el}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
              {selectDistrict === '' ? (
                <span className="error_message">나의 지역을 선택해주세요.</span>
              ) : (
                <div className="hidden"></div>
              )}
            </li>
            <li className="password info_area">
              <div className="tt">비밀번호</div>
              <div className="text">
                <input
                  className="input_css2 password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={handleChangeNewPassword}
                />
                {checkNewPassword ? (
                  <CheckIcon1 stroke="#a1d026"></CheckIcon1>
                ) : (
                  <CheckIcon1 stroke="#ececec"></CheckIcon1>
                )}
              </div>
              {checkNewPassword ? (
                <span>사용가능한 비밀번호 입니다.</span>
              ) : (
                <span className="error_message">
                  비밀번호는 영문, 숫자, 특수문자를 모두 포함해 6~12자 입니다.
                </span>
              )}
              <div className="text_right">
                <input
                  className="input_css2 password"
                  type="password"
                  placeholder="비밀번호를 확인해주세요."
                  onChange={handleChangeRePassword}
                />
                {checkReNewPassword ? (
                  <CheckIcon2 stroke="#a1d026"></CheckIcon2>
                ) : (
                  <CheckIcon2 stroke="#ececec"></CheckIcon2>
                )}
              </div>
            </li>
            <li className="pi_inform info_area">
              <input
                id="check_pi_inform"
                type="checkbox"
                checked={piCheck}
                onClick={() => {
                  setPiCheck(!piCheck);
                }}
              />
              <span
                id="check_pi_inform"
                onClick={() => {
                  setPiCheck(!piCheck);
                }}
              >
                &nbsp;&nbsp; 바나나마켓 개인정보처리방침에 동의(필수)
              </span>
              <div
                className="pi_btn"
                onClick={() => {
                  setPersonalInformModal(true);
                }}
              >
                {' '}
                방침확인
              </div>
            </li>
          </UlDiv>
        </div>
        <div className="btn" onClick={handleClickSubmit}>
          <p
            style={{
              textAlign: 'center',
            }}
          >
            가입하기
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default Join;

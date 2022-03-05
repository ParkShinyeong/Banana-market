import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLogin,
  setLogout,
  setUpdateUserInfo,
} from '../redux/actions/actions';

import Chat from '../pages/Chat';
import { Link } from 'react-router-dom';
import searchList from '../resource/cityList';
import PasswordModal from './PasswordModal';
import SecessionModal from './SecessionModal';
import monkey from '../icon/monkey.png';

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
    padding-bottom: 20px;
    background-color: white;
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
      background-color: #7f9879b8;
      color: white;
      border-radius: 10px;
      margin-top: 20px;
      @media screen and (max-width: 767px) {
        width: 49% ;
        justify-content: flex-end;
      }
    }

    > div.password_change_btn {
      margin-left: auto;
      background-color: #95c710;
      color: rgba(255, 255, 255, 0.9);
      float: right;
    }
  }
  .btn {
    width: 440px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 400;
    background-color: #ececec;
    border: 1px solid #eaeaea;
    color: #aeaeae;
    box-sizing: border-box;
    margin: 20px auto 0 auto;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 1px 1px 5px 0px #00000014;
    &:hover {
      border: 0px;
      background-color: #ff4342;
      color: #ffe1e0;
    }
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
  .profile {
    padding-top: 30px;
    height: 130px;
    /* background-color: orange; */
    box-sizing: border-box;
    margin: 0 0 20px 0;
    @media screen and (max-width: 767px) {
      margin: 0 auto 20px auto;
      width: 90%;
    }
    .image {
      margin-right: 0px;
      float: right;
      width: 100px;
      height: 100px;
      overflow: hidden;
      > img.basic_image {
        display: block;
        border-radius: 100px;
        border: 1px solid #dcdfd5;
        width: 100%;
        height: 100%;
      }
    }
    div.text_user_info {
      float: left;
      > span {
        font-size: 13px;
        color: #f4b600;
        border-radius: 3px;
        padding: 3px 3px 1px 3px;
        font-weight: 600;
        border: 2px solid #f4b600;
      }
      div.text_id {
        width: 100px;
        padding-top: 24px;
        font-size: 26px;
        color: #393a3b8c;
        font-weight: 500;
        line-height: 20px;
        padding-right: 20px;
      }
      div.text_trade {
        margin-top: 8px;
        font-size: 15px;
        height: 28px;
        line-height: 28px;
        font-weight: 400;
        width: auto;
        border-radius: 10px;
        color: #6767678c;
      }
    }
  }
  li.edit_profile {
    padding: 20px 14px 0 14px;
    height: 60px;
    border-top: 1px dashed #c6c6c6;
    /* height: 60px; */
    >div.tt{
      line-height: 45px;
      width:100px;
      display: inline-block;
      float: left;
      @media screen and (max-width: 450px) {
        /* width:30%; */
      }
    }
    > div.btn_list {
      float: right; 
      display: inline-block;     

      /* position: relative; */
      /* right: -30px;
      width: 100%; */
      > label,
      div {
        display: inline-block;
        border: 1px solid #bdbdbd;
        color: #7d7d7d;
        font-weight: 300;

        width : 100px;
        height: 45px;
        line-height: 45px;

        margin-left: 10px;
        text-align: center;
        font-size: 14px;
        @media screen and (max-width: 450px) {
          width: 60px;
          font-size: 12px;
        }
        > input.input_hidden {
          display: none;
        }
      }
    }
  }
  li.info_area {

    
    background-color: #f7f7f7;    

    font-size: 16px;
    line-height: 45px;
    box-sizing: border-box;
    .tt {
      /* border: 1px solid red; */
      font-size: 14px;
      font-weight: 400;
      color: #818181;
      width: 100%;
    }
    .text {
      /* border: 1px solid red; */
      font-size: 18px;
      height: 45px;
      line-height: 40px;
      width: 80%;
      display: inline-block;
      @media screen and (max-width: 767px) {
        width: 80%;
      }
      > input {
        font-size: 18px;
        width: 100%;
        height: 40px;
        color: black;
      }
    }
    .s_btn {
      display: inline-block;

      text-align: center;
      font-size: 14px;
      font-weight: 500;
      width: 60px;
      height: 40px;
      line-height: 40px;
      float: right;
      color: #fbfff1;
      background-color: #a1d026;
      border-radius: 8px;
      @media screen and (max-width: 767px) {
        width: 15%;
      }
    }
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto;
    }
  }

  li.nick.info_area {
    padding: 20px 14px 0 14px;
    display: block;
    line-height: 45px;
    padding : 15px;
  }
  li.spot.info_area {
    padding: 0px 14px 20px 14px;
    line-height: 45px;
  } div.text {
    /* width: calc((100% - 70px) / 2); */

    @media screen and (max-width: 767px) {
      display: inline-block;
    }
    > select.select_css2 {
      width: calc((100% - 8px) / 2);
      font-size: 16px;
      &.sel_right{
        margin-left:8px;
      }
    }
  }
`;

const Profile = ({ handleChangeAuth }) => {
  let setLoginState = useSelector((state) => state.setLoginReducer);
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  let dispatch = useDispatch();
  // SelectBox 내용
  const SelectList = ['서울특별시'];
  // // useState로 Input 값 받기
  let [inputNickName, setInputNickName] = useState(''); // 수정중
  let [selectCity, setSelectCity] = useState(''); // 수정중
  let [selectDistrict, setSelectDistrict] = useState(''); // 수정중

  // useState로 Modal창 On(true)/Off(false)
  let [isPasswordModalOn, setIsPasswordModalOn] = useState(false);
  const handleChangePasswordModalState = (e) => {
    setIsPasswordModalOn(true);
  };
  let [isSecessionModalOn, setIsSecessionModalOn] = useState(false);
  const handleChangeSecessionModalState = (e) => {
    setIsSecessionModalOn(true);
  };

  // 시에 따라 구 select box 값 정하는 함수
  const handleChangeCity = (e) => {
    setSelectCity(e.target.value);
    setSelectDistrict('');
  };
  const handleChangeDistrict = (e) => {
    setSelectDistrict(e.target.value);
  };

  // 수정하기btn On(text레이아웃)(default) <-> 수정완료btn On(Input레이아웃)
  let [changeBtnNick, setChangeBtnNick] = useState(false);
  let [changeBtnSpot, setChangeBtnSpot] = useState(false);

  //수정완료btn On :: Input 값 받는 함수
  const handleChangeInputNick = (e) => {
    setInputNickName(e.target.value);
  };

  //if :수정완료btn On, else :수정하기btn On :: 수정완료 버튼 클릭 시 진행되는 함수
  const handleChangeBtnNick = (e) => {
    if (inputNickName === '' || inputNickName === setUserInfo.nickName) {
      setChangeBtnNick(!changeBtnNick);
    } else {
      //inputNickName을 axios로 닉네임 중복검사 해야함.
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/validation/name`,
          {
            name: inputNickName,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          //닉네임 수정요청
          axios
            .patch(
              `${process.env.REACT_APP_API_URL}/users/info`,
              {
                name: inputNickName,
              },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              dispatch({
                type: 'SET_USER_INFO_NICKNAME',
                payload: inputNickName,
              });
              setChangeBtnNick(!changeBtnNick);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          alert('중복된 닉네임입니다');
          console.log(err);
        });
    }
  };
  const handleChangeBtnSpot = (e) => {
    if (changeBtnSpot) {
      if (selectCity === '' || selectDistrict === '') {
      } else {
        axios
          .patch(
            `${process.env.REACT_APP_API_URL}/users/info`,
            {
              region: selectDistrict,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch({ type: 'SET_USER_INFO_REGION', payload: selectDistrict });
            setChangeBtnSpot(!changeBtnSpot);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    setChangeBtnSpot(!changeBtnSpot);
  };

  //이미지 업로드 버튼 실행함수
  let image = '';
  const handleChangeUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    createImage(files[0]);
    const signedURL = await axios.get(
      'https://g07adh91t2.execute-api.ap-northeast-2.amazonaws.com/default/profile-image-upload-with-s3',
      { withCredentials: false }
    );
    const profileImageKey = signedURL.data.Key;
    let binary = atob(image.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    let blobData = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });

    const result = await fetch(signedURL.data.uploadURL, {
      method: 'PUT',
      body: blobData,
    });

    if (result) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/users/profile-image`,
          {
            profileImageKey,
          },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result);
          axios
            .get(`${process.env.REACT_APP_API_URL}/users/info`, {
              withCredentials: true,
            })
            .then(async (res) => {
              res.data.data.profileImage = `https://d35fj6mbinlfx5.cloudfront.net/${profileImageKey}?w=100&h=100&f=webp&q=90`;
              dispatch({
                type: 'SET_UPDATE_USER_INFO',
                payload: res.data.data,
              });
            })
            .catch((err) => {
              dispatch(setLogout());
            });
        });
    }
  };

  function createImage(file) {
    // var image = new Image()
    const MAX_IMAGE_SIZE = 1000000;
    let reader = new FileReader();
    reader.onload = (e) => {
      // const includeJPEG = e.target.result.includes('data:image/jpeg');
      // const includePNG = e.target.result.includes('data:image/png');
      const includeImg = e.target.result.includes('data:image');
      console.log('length: ');
      if (!includeImg) {
        return alert('Wrong file type - JPG or PNG only.');
      }
      if (e.target.result.length > MAX_IMAGE_SIZE) {
        return alert('이미지 용량이 너무 큽니다');
      }
      image = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  //이미지 삭제버튼 실행함수
  const handleClickDeleteImg = (e) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/profile-image`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: 'SET_USER_INFO_PROFILE_IMG_NULL' });
        document.getElementById('image').value = '';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //페이지 리로딩시 값 default로 설정하기
  useEffect(() => {
    console.log('setUserInfo함');
    setInputNickName('');
  }, [setUserInfo]);

  return (
    <Wrapper>
      {isPasswordModalOn ? (
        <PasswordModal
          setIsPasswordModalOn={setIsPasswordModalOn}
        ></PasswordModal>
      ) : (
        <div></div>
      )}
      {isSecessionModalOn ? (
        <SecessionModal
          setIsSecessionModalOn={setIsSecessionModalOn}
        ></SecessionModal>
      ) : (
        <div></div>
      )}
      <div className="detail">
        <UlDiv>
          <li className="profile">
            <div className="text_user_info">
              <span> BANANA - MARKET </span>
              <div className='text_id'> {setUserInfo.email}</div>
              <div className='text_trade'> {setUserInfo.totalTrade}회 바나나마켓 거래 이용</div>

            </div>
            <div className="image">
              {setUserInfo.profileImage ? (
                <img
                  className="basic_image"
                  src={setUserInfo.profileImage}
                  type="image/jpeg"
                />
              ) : (
                <img className="basic_image" src={monkey} />
              )}
            </div>
          </li>
          <li className="edit_profile info_area">
            <div className="tt">프로필사진 변경</div>
            <div className="btn_list">
              <label htmlFor="image" className="btn_css upload_btn profile_btn">
                {' '}
                수정하기
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="input_hidden"
                  onChange={handleChangeUpload}
                />
              </label>
              <div
                className="delete_btn profile_btn btn_css"
                onClick={handleClickDeleteImg}
              >
                삭제하기
              </div>
            </div>
          </li>
          {/*  */}
          {changeBtnNick ? (
            <li className="nick info_area">
              <div className="tt">닉네임</div>
              <div className="text">
                <input
                  className="input_css2"
                  type="text"
                  onChange={handleChangeInputNick}
                  placeholder={setUserInfo.nickName}
                />
              </div>
              <div className="s_btn btn_css" onClick={handleChangeBtnNick}>
                완료
              </div>
            </li>
          ) : (
            <li className="nick info_area">
              <div className="tt">닉네임</div>
              <div className="text">{setUserInfo.nickName}</div>
              <div className="s_btn btn_css" onClick={handleChangeBtnNick}>
                수정
              </div>
            </li>
          )}
          {changeBtnSpot ? (
            <li className="spot info_area">
              <div className="tt">나의 동네</div>
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
                <select
                  className="sel_right select_css2"
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
              <div className="s_btn btn_css" onClick={handleChangeBtnSpot}>
                완료
              </div>
            </li>
          ) : (
            <li className="spot info_area">
              <div className="tt">나의 동네</div>
              <div className="text">
                서울특별시, &nbsp; {setUserInfo.region}
              </div>
              <div className="s_btn btn_css" onClick={handleChangeBtnSpot}>
                수정
              </div>
            </li>
          )}
        </UlDiv>
      </div>
      <div className="md_btn_list info_area ">
            <div
              className="md_btn secession_btn btn_css"
              onClick={handleChangeSecessionModalState}
            >
              회원탈퇴
            </div>
            <div
              className="md_btn password_change_btn btn_css"
              onClick={handleChangePasswordModalState}
            >
              비밀번호 변경
            </div>
          </div>

    </Wrapper>
  );
};

export default Profile;

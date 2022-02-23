import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Chat from '../pages/Chat';
import { Link } from "react-router-dom";
import searchList from '../resource/cityList'
import '../App.css'; //이거 써줘야 css적용됨.
import MapModal from './MapModal';
import market from "../icon/market.png";
import give from "../icon/give.png";

const MapModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  @media only screen and (max-width: 768px){
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    min-height: 960px;
  }
`;
const Wrapper = styled.div`
  max-width: 1200px;
  /* background-color: powderblue; */
  margin: 50px auto;
  font-size : 24px;
  @media screen and (max-width: 767px) {
    margin: 80px auto 30px auto;
    width: 100%;
  }
  .detail {
    width: 440px;
    border: 1px solid #000;
    box-sizing: border-box;
    margin: 0 auto;
    /* background-color: peachpuff; */
    border-radius: 10px;
    @media screen and (max-width: 767px) {
      width: 90%;
    }
    /* padding-top: 20px; */
  }

  .btn {
    width: 440px;
    height: 45px;
    border: 1px solid #000;
    box-sizing: border-box;
    margin: 40px auto 0 auto;
    border-radius: 50px;
    cursor: pointer;
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
    >li.radio_box.writing_area {
      height: 30px;
      margin : 20px auto 20px auto;
    }
  }
  >li.radio_box {
    display: block;
    width: 155px;
    margin : 20px auto 0 auto;
    input[type='radio']{
      appearance: none;
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid black;
    }
    input[type='radio']:checked {
      appearance: none;
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid black;
      background-color: blue;
    }
    .label_right {
      margin-left: 30px;
    }
    >label{
      display: inline-block;
      font-size: 20px;
      /* background-color: red; */
    }
  }
  .image_box {
    width: 285px;
    height: 100px;
    /* background-color: orange; */
    box-sizing: border-box;
    margin: 0 auto 20px auto;
    .image {
      float: left;
      width: 100px;
      height: 100px;
      border-radius: 10px;
      margin-right: 25px;
      background-color: rgba(255, 250, 176, 0.8);
      border: 1px solid rgba(0, 0, 0, 0.1);
      overflow: hidden;
      > img.basic_image {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .btn_list {
      margin-top: 6px;
      float: left;
      width: 160px;
      height: 88px;
      .profile_btn{
        display: inline-block;
        width: 100%;
        font-size: 14px;
        height: 36px;
        border-radius: 10px;
        text-align: center;
        line-height: 36px;
        background-color: #95c710;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 600;
        >input.input_hidden{
          display: none;
        }
      }
      .profile_btn.delete_btn{
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.6);
        background-color: white;
        margin-top: 18px;
      }
    }
  }
  .writing_area {
    width: 380px;
    height: 60px;
    font-size: 16px;
    /* background-color: salmon; */
    box-sizing: border-box;
    .text{
      border: 1px solid red;
      height: 40px;
      width: 100%;
      float: left;
      >input{
        width:100%;
        height: 40px;
      }
      >textarea {
        overflow-y: hidden;
        width:100%;
        /* height: 40px; */
        min-height: 100px;
        height: ${props => props.newHeightPx ? props.newHeightPx : 100}px;
      }
    }
    .s_btn{
      text-align: center;
      font-size: 14px;
      width:70px;
      height: 40px;
      float: right;
      background-color: cyan;
      border-radius: 8px;
    }
    >select {
      width:100%;
      height: 40px;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 20px;
    }
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto;
    }
  }
  .s_writing_area{
    width: 50%;
    height: 60px;
    font-size: 16px;
    background-color: rebeccapurple;
    box-sizing: border-box;
    float: left;
    >select.time_select {
      width:92%;
      height: 40px;
    }
    >select.people_num_select {
      width:90%;
      height: 40px;
      @media screen and (max-width: 380px) {
        width: 86%;
      }
      @media screen and (min-width: 768px) {
        width: 86%;
      }
    }
    >span {
      float: right;
    }
  }
  .location_box.writing_area > div.text{
    border: 1px solid red;
    height: 40px;
    width: calc(100% - 80px);
    float: left;
    >input{
      width:100%;
      height: 40px;
    }
  } 
  li.text_box.writing_area{
    min-height: 120px;
    height: ${props => props.newHeightPx ? props.newHeightPx+20 : 120}px;
  }
`;

const PostingWrite = () => {
  // useState로 Modal창 On(true)/Off(false)
  let [mapModal, setMapModal] = useState(false);
  let [locationInfo, setLocationInfo] = useState(['','']);
  let locationInfoText = `${locationInfo[0]}, ${locationInfo[1]}`;
  
  // textarea 박스크기 늘이기
  let[textareaHeight, setTextareaHeight] = useState(40);
  const handleChangeHeight = (e) => {
    if(textareaHeight <= e.target.scrollHeight){
      let newHeight =  e.target.scrollHeight;
      setTextareaHeight(newHeight);
      console.log('늘어날때', e.target.scrollHeight)
    } else { 
      setTextareaHeight(textareaHeight-10);
      console.log('줄어들때', e.target.scrollHeight)
    }
  }

  // SelectBox 내용
  const CategoryList = [ '정육/계란', '과일','우유/유제품', '채소','수산/건어물',  '베이커리', '간식/떡/방과', '김치/반찬', '기타'];
  const TimeList = ['오전 06~09', '오전 09~12', '오후 01~03', '오후 03~06', '오후 06~09', '오후 09~12', '오전 00~03', '오전 03~06','협의 가능'];
  const PeopleNumList = [1, 2, 3, 4, 5, 6, '6명이상'];

  // Input type date 시간 기준 정하기
  let minDate = getToday();
  let maxDate = maxDay();
  function getToday(){
    let date = new Date();
    let year = date.getFullYear();
    let month = ('0' + (1 + date.getMonth())).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year+'-'+month+'-'+day;    
  }
  function maxDay(){
    let date = new Date();
    let year = date.getFullYear() + 1;
    let month = ('0' + (1 + date.getMonth())).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year+'-'+month+'-'+day;    
  }

  // useState로 Input 값 받기
  let[selectRadioBox, setSelectRadioBox] = useState('공구');
  let[selectCategory, setSelectCategory] = useState('');
  let[inputTitle, setInputTitle] = useState('');
  let[inputLocation, setInputLocation] = useState('');
  let[date, setDate] = useState(minDate);
  let[selectTime, setSelectTime] = useState(0);
  let[selectPeopleNum, setSelectPeopleNum] = useState(0);
  let[inputText, setInputText] = useState('');
  let [imageFile, setImageFile] = useState({selectedFile: null});
  let [thumbnail, setThumbnail] = useState(null);

  // Input 값 받는 함수
  const handleChangeRadioBox = (e) => {
    setSelectRadioBox(e.target.value);
  }
  const handleChangeCategory = (e) => {
    setSelectCategory(e.target.value);
  }
  const handleChangeTitle = (e) => {
    setInputTitle(e.target.value);
  }
  const handleChangeLocation = (e) => {
    setInputLocation(e.target.value);
  }
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  }
  const handleChangeTime = (e) => {
    setSelectTime(e.target.value);
	};
  const handleChangeNum = (e) => {
    setSelectPeopleNum(e.target.value);
	};
  const handleChangeText = (e) => {
    setInputText(e.target.value);
	};
  const handleClickSubmit = (e) => {
    // axios 로 내용 전송
    // selectCategory!=='' && inputTitle!=='' && inputLocation!=='' && selectTime!==0 && selectPeopleNum !==0 && inputText!==''
    // -> false : alert(내용을 모두 입력해주세요)
    // -> true : title, text 공백아님을 확인하기. -> 내용 전송, /list로 이동 
    console.log(
      selectRadioBox,
      selectCategory,
      inputTitle,
      inputLocation,
      date,
      selectTime,
      selectPeopleNum,
      inputText
    )
	};
  //이미지 업로드 버튼 실행함수
  const handleChangeUpload = (e) => {
    setImageFile({selectedFile : e.target.files[0]});
    if (e.target.files[0]) {
      // console.log('2', thumbnail)
      let reader = new FileReader();
      // 1. 파일을 읽어 버퍼에 저장합니다. 파일 상태 업데이트
      reader.readAsDataURL(e.target.files[0]); 
      reader.onloadend = () => {
        // 2. 읽기가 완료되면 아래코드가 실행됩니다.
        const image_code = reader.result;
        if (image_code) { //  images.push(base64.toString())
          setThumbnail(image_code.toString());
        // console.log('3', thumbnail)
        }
      }
    }
  };
  //이미지 삭제버튼 실행함수
  const handleClickDeleteImg = (e) => {
    setThumbnail(null);
    setImageFile({selectedFile: null});
  }

  return (
    <>
      { mapModal ? <MapModalWrapper>
        <MapModal className='map_modal'setMapModal={setMapModal} setLocationInfo={setLocationInfo} locationInfo={locationInfo}></MapModal>
      </MapModalWrapper> : <div></div>} 
      <Wrapper>
        <div className="detail">
          <UlDiv newHeightPx={textareaHeight}>
            <li className="radio_box writing_area">
              <label htmlFor='buy'>
                <input id='buy' type="radio" name="about" value="공구"  defaultChecked onClick={handleChangeRadioBox}/> 
                &nbsp;&nbsp;공구
              </label>
              <label className='label_right' htmlFor='share'>
                <input id='share' type="radio" name="about" value="나눔" onClick={handleChangeRadioBox}/> 
                &nbsp;&nbsp;나눔
              </label>
            </li>
            <li className="image_box">
              <div className="image">
                { imageFile.selectedFile ? <img className="basic_image" src={thumbnail} />
                : <img className="basic_image" src={selectRadioBox === '공구' ? market : give}/>
                }
              </div>
              <div className="btn_list">
                <label htmlFor='image' className='upload_btn profile_btn'>
                  <input id='image' type='file' accept='image/*' className='input_hidden' onChange={handleChangeUpload}/>
                  이미지 업로드
                </label>
                <div className='delete_btn profile_btn' onClick={handleClickDeleteImg}>이미지 제거</div>
              </div>
            </li>
            <li className="category_box writing_area">
                <select name="category" onChange={handleChangeCategory}>
                  <option value="">카테고리</option>
                  {
                    CategoryList.map((el, idx) => (
                      <option key={idx} value={el}>{el}</option>
                    ))
                  }
                </select>
            </li>
            <li className="title_box writing_area">
              <div className='text'>
                <input type='text' placeholder='제목을 입력하세요' onChange={handleChangeTitle} />
              </div>
            </li>
            <li className="location_box writing_area">
              <div className='text'>
                <input type='text' readOnly value={locationInfoText} placeholder='장소를 선택하세요' onChange={handleChangeLocation} />
              </div>
              <div className='s_btn' onClick={(e)=> {setMapModal(!mapModal)}}>지도에서<br/>찾기</div>
            </li>
            <li className="date_box writing_area">
              <div className='text'>
                <input type='date' value={date} min={minDate} max={maxDate} onChange={handleChangeDate}/>
                </div>
            </li>
            <li className='writing_area'>
              <div className="time_box s_writing_area">
                <select className="time_select" name="time" onChange={handleChangeTime}>
                  <option value="">시간대</option>
                  {
                    TimeList.map((el, idx) => (
                      <option key={idx} value={el}>{el}</option>
                    ))
                  }
                </select>
              </div>
              <div className="people_box s_writing_area">
                <select className="people_num_select" name="people_num" onChange={handleChangeNum}>
                  <option value="">총 인원 수</option>
                  {
                    PeopleNumList.map((el, idx) => (
                      <option key={idx} value={el}>{el}</option>
                    ))
                  }
                </select>
                <span>명</span>
              </div>
            </li>
            <li className="text_box writing_area">
              <div className='text'>
                <textarea placeholder='내용을 입력하세요'onChange={handleChangeText, handleChangeHeight} ></textarea>
              </div>
            </li>
          </UlDiv>
        </div>
        <div
          className="btn"
          onClick={handleClickSubmit}
        >
          <p
            style={{
              textAlign: "center",
            }}
          >
            작성완료
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default PostingWrite;
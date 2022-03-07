import React, { useEffect, useState, useRef } from 'react';
import { postListReset } from '../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Chat from '../pages/Chat';
import { Link } from 'react-router-dom';
import searchList from '../resource/cityList';
import '../App.css'; //이거 써줘야 css적용됨.
import MapModal from './MapModal';
import bananalogo from '../icon/bananalogo.png';
import give from '../icon/give.png';
import axios from 'axios';

// const MapModalWrapper = styled.div`
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 100;
//   @media only screen and (max-width: 768px) {
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     z-index: 100;
//     min-height: 960px;
//   }
// `;
// const Wrapper = styled.div`
//   max-width: 1200px;
//   /* background-color: powderblue; */
//   margin: 50px auto;
//   font-size: 24px;
//   @media screen and (max-width: 767px) {
//     margin: 80px auto 30px auto;
//     width: 100%;
//   }
//   .detail {
//     width: 440px;
//     border: 1px solid #000;
//     box-sizing: border-box;
//     margin: 0 auto;
//     /* background-color: peachpuff; */
//     border-radius: 10px;
//     @media screen and (max-width: 767px) {
//       width: 90%;
//     }
//     /* padding-top: 20px; */
//   }

//   .btn {
//     width: 440px;
//     height: 45px;
//     border: 1px solid #000;
//     box-sizing: border-box;
//     margin: 40px auto 0 auto;
//     border-radius: 50px;
//     cursor: pointer;
//     @media screen and (max-width: 767px) {
//       margin: 25px auto 0 auto;
//       width: 90%;
//     }
//   }
// `;

// const UlDiv = styled.ul`
//   width: 380px;
//   /* background-color: rebeccapurple; */
//   margin: 0 auto;
//   border-radius: 10px;
//   @media screen and (max-width: 767px) {
//     width: 100%;
//     margin: 0;
//     > li.radio_box.writing_area {
//       height: 30px;
//       margin: 20px auto 20px auto;
//     }
//   }
//   > li.radio_box {
//     display: block;
//     width: 185px;
//     margin: 20px auto 0 auto;
//     input[type='radio'] {
//       appearance: none;
//       display: inline-block;
//       width: 16px;
//       height: 16px;
//       border: 2px solid black;
//     }
//     input[type='radio']:checked {
//       appearance: none;
//       display: inline-block;
//       width: 16px;
//       height: 16px;
//       border: 2px solid black;
//       background-color: blue;
//     }
//     .label_right {
//       margin-left: 30px;
//     }
//     > label {
//       display: inline-block;
//       font-size: 20px;
//       /* background-color: red; */
//     }
//   }
//   .image_box {
//     width: 285px;
//     height: 100px;
//     /* background-color: orange; */
//     box-sizing: border-box;
//     margin: 0 auto 20px auto;
//     .image {
//       float: left;
//       width: 100px;
//       height: 100px;
//       border-radius: 10px;
//       margin-right: 25px;
//       background-color: rgba(255, 250, 176, 0.8);
//       border: 1px solid rgba(0, 0, 0, 0.1);
//       overflow: hidden;
//       > img.basic_image {
//         display: inline-block;
//         width: 100%;
//         height: 100%;
//       }
//     }
//     .btn_list {
//       margin-top: 6px;
//       float: left;
//       width: 160px;
//       height: 88px;
//       .profile_btn {
//         display: inline-block;
//         width: 100%;
//         font-size: 14px;
//         height: 36px;
//         border-radius: 10px;
//         text-align: center;
//         line-height: 36px;
//         background-color: #95c710;
//         color: rgba(255, 255, 255, 0.9);
//         font-weight: 600;
//         > input.input_hidden {
//           display: none;
//         }
//       }
//       .profile_btn.delete_btn {
//         border: 1px solid rgba(0, 0, 0, 0.1);
//         color: rgba(0, 0, 0, 0.6);
//         background-color: white;
//         margin-top: 18px;
//       }
//     }
//   }
//   .writing_area {
//     width: 380px;
//     height: 60px;
//     font-size: 16px;
//     /* background-color: salmon; */
//     box-sizing: border-box;
//     .text {
//       border: 1px solid red;
//       height: 40px;
//       width: 100%;
//       float: left;
//       > input {
//         width: 100%;
//         height: 40px;
//       }
//       > textarea {
//         overflow-y: hidden;
//         width: 100%;
//         /* height: 40px; */
//         min-height: 100px;
//         height: ${(props) => (props.newHeightPx ? props.newHeightPx : 100)}px;
//       }
//     }
//     .s_btn {
//       text-align: center;
//       font-size: 14px;
//       width: 70px;
//       height: 40px;
//       float: right;
//       background-color: cyan;
//       border-radius: 8px;
//     }
//     > select {
//       width: 100%;
//       height: 40px;
//       font-size: 14px;
//       line-height: 22px;
//       margin-bottom: 20px;
//     }
//     @media screen and (max-width: 767px) {
//       width: 90%;
//       margin: 0 auto;
//     }
//   }
//   .s_writing_area {
//     width: 50%;
//     height: 60px;
//     font-size: 16px;
//     background-color: rebeccapurple;
//     box-sizing: border-box;
//     float: left;
//     > select.time_select {
//       width: 92%;
//       height: 40px;
//     }
//     > select.people_num_select {
//       width: 90%;
//       height: 40px;
//       @media screen and (max-width: 380px) {
//         width: 86%;
//       }
//       @media screen and (min-width: 768px) {
//         width: 86%;
//       }
//     }
//     > span {
//       float: right;
//     }
//   }
//   .location_box.writing_area > div.text {
//     border: 1px solid red;
//     height: 40px;
//     width: calc(100% - 80px);
//     float: left;
//     > input {
//       width: 100%;
//       height: 40px;
//     }
//   }
//   li.text_box.writing_area {
//     min-height: 120px;
//     height: ${(props) => (props.newHeightPx ? props.newHeightPx + 20 : 120)}px;
//   }
// `;

const MapModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  @media only screen and (max-width: 768px) {
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

  .btn {
    width: 440px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 500;
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
      border: 0px;
      background-color: #ff4342;
      color:#ffe1e0;
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
  > li.radio_box {
    padding-top: 30px;
    /* background-color: red; */
    width: 100%;
    display: flex;
    @media screen and (max-width: 767px) {
      width: 90%;
    }
    > img {
      width: 10px;
      display: block;
      position: relative;
      left: 13px;
      bottom: 7px;
    }
    input[type='radio'] {
      appearance: none;
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 3px;
      border: 1px solid #b7b7b7;
    }
    input[type='radio']:checked {
      appearance: none;
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 0px;
      background-color: #ff4342;
      & + label {
        color: #292929;
      }
      &::after {
        position: relative;
        top: 1px;
        content: '✔'; /* 체크 마크 ASCii 문자 */
        font-size: 18px;
        line-height: 0.8;
        color: white;
        transition: all 0.3s;
      }
    }
    > label {
      /* background-color: green; */
      display: inline-block;
      font-size: 16px;
      margin-right: 30px;
      font-weight: 300;
      color: #a9a9a9;
      /* background-color: red; */
    }
  }
  .image_box {
    padding-top: 30px;
    height: 100px;
    /* background-color: orange; */
    box-sizing: border-box;
    margin: 0 auto 20px auto;
    @media screen and (max-width: 767px) {
      width: 90%;
    }
    .image {
      float: left;
      width: 100px;
      height: 100px;
      border-radius: 10px;
      margin-right: 25px;
      border: 1.5px solid #dcdfd5;
      overflow: hidden;
      > img.choice_image {
        opacity: 1;
        width: 100%;
      }
      > img.basic_image {
        display: inline-block;
        opacity: 0.3;
        width: 100%;
      }
    }
    > div.img_text {
      font-size: 14px;
      color: #bcbcbc;
      font-weight: 400;
      line-height: 20px;
      padding-top: 3px;
      padding-right: 20px;
      @media only screen and (max-width: 430px) {
        padding-top: 0px;
        font-size: 12px;
        line-height: 18px;
      }
    }
    .btn_list {
      margin-top: 18px;
      float: left;
      width: 160px;
      @media only screen and (max-width: 430px) {
        margin-top: 0.4em;
      }
      .profile_btn {
        display: inline-block;
        margin-right: 8px;
        width: 48px;
        font-size: 18px;
        padding-top: 10px;
        height: 36px;
        border-radius: 100px;
        text-align: center;
        background-color: #bdbdbd;
        border: 1px solid #b3b3b3;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 600;
        > input.input_hidden {
          display: none;
        }
      }
      .profile_btn.delete_btn {
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #bdbdbd;
        background-color: white;
      }
    }
  }
  .writing_area {
    width: 380px;
    height: 60px;
    /* background-color: salmon; */
    box-sizing: border-box;
    padding-top: 10px;
    .text {
      /* border: 1px solid red; */
      height: 40px;
      width: 100%;
      float: left;
      > input {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #444;
        width: 100%;
        height: 45px;
        border: none;
        border-bottom: 1px solid #dcdfd58c;
        &::placeholder {
          font-size: 14px;
          color: #bcbcbc;
        }
      }
      > input:focus {
        border-bottom: 2px solid #ff4342;
        color: #222;
        outline: none;
      }

      > textarea {
        overflow-y: hidden;
        width: 100%;
        /* height: 40px; */
        min-height: 100px;
        height: ${(props) => (props.newHeightPx ? props.newHeightPx : 100)}px;
      }
    }
    .s_btn {
      text-align: center;
      font-size: 14px;
      width: 70px;
      height: 45px;
      line-height: 45px;
      float: right;
      color: #ff4342;
      border: 2px solid #ff7b7a;
      border-radius: 8px;
    }
    > select {
      width: 100%;
    }

    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto;
    }
  }
  .s_writing_area {
    width: 50%;
    height: 60px;
    /* background-color: rebeccapurple; */
    box-sizing: border-box;
    float: left;
    > select.time_select {
      width: 92%;
      height: 40px;
    }
    > select.people_num_select {
      width: 90%;
      height: 40px;
      @media screen and (max-width: 380px) {
        width: 86%;
      }
      @media screen and (min-width: 768px) {
        width: 86%;
      }
    }
    > span {
      float: right;
      line-height: 45px;
      color: #444;
    }
  }
  .location_box.writing_area > div.text {
    /* border: 1px solid red; */
    height: 40px;
    width: calc(100% - 80px);
    float: left;
    > input {
      width: 100%;
      height: 45px;
      border: none;
      border-bottom: 1px solid #dcdfd58c;
      &::placeholder {
        font-size: 14px;
        color: #bcbcbc;
      }
    }
  }
  li.text_box.writing_area {
    min-height: 120px;
    height: ${(props) => (props.newHeightPx ? props.newHeightPx + 20 : 120)}px;
  }
  .textarea {
    padding-top: 16px;
    /* margin-top: 30px; */
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.8;
    color: #444;
    border: none;
    border-bottom: 1px solid #dcdfd58c;
    appearance: none;
  }
  .textarea:focus {
    /* border-bottom:2px solid #ff4342; */
    color: #222;
    outline: none;
  }
  .textarea::placeholder {
    padding-left: 8px;
    font-size: 14px;
    color: #bcbcbc;
  }
`;

const PostingEditing = () => {
  const state = useSelector((state) => state.postListReducer); //리스트 상태값
  const postDetail = useSelector((state) => state.postDetailReducer);
  const { post, postWriter } = postDetail;
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(postDetail, post);
  //post input에 값 적용
  // if(post.tradeType === 'jointPurchase' || '공구') {
  //   document.getElementById('buy').checked = true;
  // } else {
  //   document.getElementById('share').checked = true;
  // }

  // useState로 Modal창 On(true)/Off(false)
  let [mapModal, setMapModal] = useState(false);
  let [locationInfo, setLocationInfo] = useState([post.market, post.address]);
  let locationInfoText = `${locationInfo[0]}, ${locationInfo[1]}`;

  // SelectBox 내용
  const CategoryList = [
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
  const TimeList = [
    '오전 06~09',
    '오전 09~12',
    '오후 01~03',
    '오후 03~06',
    '오후 06~09',
    '오후 09~12',
    '오전 00~03',
    '오전 03~06',
    '협의 가능',
  ];
  const PeopleNumList = [1, 2, 3, 4, 5, 6, '6명이상'];

  // Input type date 시간 기준 정하기
  let minDate = getToday();
  let maxDate = maxDay();
  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ('0' + (1 + date.getMonth())).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }
  function maxDay() {
    let date = new Date();
    let year = date.getFullYear() + 1;
    let month = ('0' + (1 + date.getMonth())).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }

  // useState로 Input 값 받기
  let [selectRadioBox, setSelectRadioBox] = useState(post.tradeType);
  let [selectCategory, setSelectCategory] = useState(post.category);
  let [inputTitle, setInputTitle] = useState(post.title);
  let [date, setDate] = useState(post.date);
  let [selectTime, setSelectTime] = useState(post.time);
  let [selectPeopleNum, setSelectPeopleNum] = useState(post.totalMate);
  let [inputText, setInputText] = useState(post.content);
  let [imageFile, setImageFile] = useState(null);
  let [thumbnail, setThumbnail] = useState(post.image);

  // textarea 박스크기 늘이기
  let [textareaHeight, setTextareaHeight] = useState(40);
  const handleChangeHeight = (e) => {
    if (textareaHeight <= e.target.scrollHeight) {
      let newHeight = e.target.scrollHeight;
      setTextareaHeight(newHeight);
      setInputText(e.target.value);
      // console.log('늘어날때', e.target.scrollHeight)
    } else {
      setTextareaHeight(textareaHeight - 10);
      setInputText(e.target.value);
      // console.log('줄어들때', e.target.scrollHeight)
    }
  };


  // 스크롤 페이지 상단으로 이동 함수
  const toTheTop = () => {
    window.scrollTo(0, 0);
  };

  // Input 값 받는 함수
  const handleClickRadioBox = (e) => {
    setSelectRadioBox(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setSelectCategory(e.target.value);
  };
  const handleChangeTitle = (e) => {
    setInputTitle(e.target.value);
  };
  const handleChangeText = (e) => {
    setInputText(e.target.value);
  };
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };
  const handleChangeTime = (e) => {
    setSelectTime(e.target.value);
  };
  const handleChangeNum = (e) => {
    setSelectPeopleNum(e.target.value);
  };

  const handleClickSubmit = async (e) => {
    let dataSet = {
      title: inputTitle,
      content: inputText,
      category: selectCategory || '기타',
      market: locationInfo[0],
      url: locationInfo[2],
      date: date,
      time: selectTime,
      tradeType: selectRadioBox,
      totalMate: selectPeopleNum,
      region: locationInfo[1].split(' ')[1],
      address: locationInfo[1],
      imageKey: imageFile,
    };

    // await axios({
    //   method: 'PATCH',
    //   url: `${process.env.REACT_APP_API_URL}/articles/${post.id}`,
    //   {withCredentials: true},
    //   dataSet,
    // })
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/articles/${post.id}`, dataSet)
      .then((res) => {
        dispatch(postListReset());
        toTheTop();
        history.push('/list');
        alert('글이 성공적으로 수정되었습니다.');
      })
      .catch((err) => {
        console.log(err);
        if (String(err).includes('422')) alert('글을 모두 작성해주세요.');
        else if (String(err).includes('401')) alert('권한 없음 ');
        else alert('서버에러');
      });
    // console.log(
    //   imageFile,
    //   selectRadioBox,
    //   selectCategory,
    //   inputTitle,
    //   //locationInfo,
    //   locationInfo[0], locationInfo[1], locationInfo[1].split(' ')[1],
    //   date,
    //   selectTime,
    //   selectPeopleNum,
    //   inputText
    // )
  };

  let image = '';
  let postImageKey = '';
  const handleChangeUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    createImage(files[0]);
    const signedURL = await axios.get(
      'https://lddqjxftp2.execute-api.ap-northeast-2.amazonaws.com/default/post-image-upload-with-s3',
      {
        withCredentials: false,
      }
    );
    // console.log('signedURL', signedURL);
    postImageKey = signedURL.data.Key;
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
      const postImage = `https://d2fg2pprparkkb.cloudfront.net/${postImageKey}?w=100&h=100&f=webp&q=90`;
      setImageFile(postImageKey);
      setThumbnail(postImage);
      // console.log('thumbnail', thumbnail);
    }
    // if (e.target.files[0]) {
    //   // const uploadFile = e.target.files[0]
    //   // const formData = new FormData();
    //   // formData.append('profileImage', uploadFile);
    //   // setImageFile(formData);
    //   const uploadFile = e.target.files[0];
    //   setImageFile(uploadFile);
    //   // console.log('2', thumbnail)
    //   let reader = new FileReader();
    //   // 1. 파일을 읽어 버퍼에 저장합니다. 파일 상태 업데이트
    //   reader.readAsDataURL(e.target.files[0]);
    //   reader.onloadend = () => {
    //     // 2. 읽기가 완료되면 아래코드가 실행됩니다.
    //     const image_code = reader.result;
    //     if (image_code) {
    //       //  images.push(base64.toString())
    //       setThumbnail(image_code.toString());
    //       // console.log('3', thumbnail)
    //     }
    //   };
    // }
  };

  function createImage(file) {
    // var image = new Image()
    const MAX_IMAGE_SIZE = 2000000;
    let reader = new FileReader();
    reader.onload = (e) => {
      // const includeJPEG = e.target.result.includes('data:image/jpeg');
      // const includePNG = e.target.result.includes('data:image/png');
      const includeImg = e.target.result.includes('data:image');
      console.log('length: ');
      if (!includeImg) {
        return alert('Wrong file type - image only.');
      }
      // if (e.target.result.length > MAX_IMAGE_SIZE) {
      //   return alert('이미지 용량이 너무 큽니다');
      // }
      image = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  //이미지 삭제버튼 실행함수
  const handleClickDeleteImg = (e) => {
    if (imageFile) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/articles/image`,
          {
            withCredentials: true,
          },
          {
            imageKey: imageFile,
          }
        )
        .catch((err) => {
          console.log(err);
        });
    }
    setThumbnail(null);
    setImageFile(null);
  };

  return (
    <>
      {mapModal ? (
        <MapModalWrapper>
          <MapModal
            className="map_modal"
            setMapModal={setMapModal}
            setLocationInfo={setLocationInfo}
            locationInfo={locationInfo}
          ></MapModal>
        </MapModalWrapper>
      ) : (
        <div></div>
      )}
      <Wrapper>
        <div className="detail">
          <UlDiv newHeightPx={textareaHeight}>
            <li className="image_box">
              <div className="image">
                <img className="basic_image" src={thumbnail} />
              </div>
              <div className="img_text">
                필요한 사진을 추가해보세요.
                <br /> 사진은 최대1장 첨부 가능합니다.
              </div>
              <div className="btn_list">
                <label htmlFor="image" className="upload_btn profile_btn">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="input_hidden"
                    onChange={handleChangeUpload}
                  />
                   +
                </label>
                <div
                  className="delete_btn profile_btn"
                  onClick={handleClickDeleteImg}
                >
                -
                </div>
              </div>
            </li>
            <li className="radio_box writing_area">
              <label htmlFor="buy">
                <input
                  id="buy"
                  type="radio"
                  name="about"
                  value="jointPurchase"
                  defaultChecked={
                    post.tradeType === 'jointPurchase' ||
                    post.tradeType === '공구'
                      ? true
                      : false
                  }
                  onClick={handleClickRadioBox}
                />
                &nbsp;&nbsp;공구
              </label>
              <label className="label_right" htmlFor="share">
                <input
                  id="share"
                  type="radio"
                  name="about"
                  value="share"
                  defaultChecked={
                    post.tradeType === 'share' || post.tradeType === '나눔'
                      ? true
                      : false
                  }
                  onClick={handleClickRadioBox}
                />
                &nbsp;&nbsp;나눔
              </label>
            </li>
            
            <li className="category_box writing_area">
              <select className="select_css" name="category" onChange={handleChangeCategory}>
                <option value="">카테고리</option>
                {CategoryList.map((el, idx) => (
                  <option
                    key={idx}
                    value={el}
                    selected={post.category === el ? true : false}
                  >
                    {el}
                  </option>
                ))}
              </select>
            </li>
            <li className="title_box writing_area">
              <div className="text">
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  onChange={handleChangeTitle}
                  value={inputTitle}
                />
              </div>
            </li>
            <li className="location_box writing_area">
              <div className="text">
                <input
                  type="text"
                  readOnly
                  value={locationInfoText}
                  placeholder="장소를 선택하세요"
                />
              </div>
              <div
                className="s_btn"
                onClick={(e) => {
                  setMapModal(!mapModal);
                }}
              >
                장소 찾기
              </div>
            </li>
            <li className="date_box writing_area">
              <div className="text">
                <input
                  type="date"
                  value={date}
                  min={minDate}
                  max={maxDate}
                  onChange={handleChangeDate}
                />
              </div>
            </li>
            <li className="writing_area">
              <div className="time_box s_writing_area">
                <select
                  className="time_select select_css"
                  name="time"
                  onChange={handleChangeTime}
                >
                  <option value="">시간대</option>
                  {TimeList.map((el, idx) => (
                    <option
                      key={idx}
                      value={el}
                      selected={post.time === el ? true : false}
                    >
                      {el}
                    </option>
                  ))}
                </select>
              </div>
              <div className="people_box s_writing_area">
                <select
                  className="people_num_select select_css"
                  name="people_num"
                  onChange={handleChangeNum}
                >
                  <option value="">총 인원 수</option>
                  {PeopleNumList.map((el, idx) => (
                    <option
                      key={idx}
                      value={el}
                      selected={post.totalMate === el ? true : false}
                    >
                      {el}
                    </option>
                  ))}
                </select>
                <span>명</span>
              </div>
            </li>
            <li className="text_box writing_area">
              <div className="text">
                <textarea
                  className="textarea"
                  placeholder={post.content}
                  onKeyUp={handleChangeHeight}
                  onKeyDown={handleChangeHeight}
                  onChange={handleChangeText}
                  value={inputText}
                ></textarea>
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
            수정완료
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default PostingEditing;

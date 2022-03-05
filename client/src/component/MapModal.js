import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import guCodeList from '../resource/guCodeList'
import { ReactComponent as SearchIcon } from '../icon/search_icon.svg';

const { kakao } = window;

axios.defaults.withCredentials = true;

const MapModalWrapper = styled.div`
  position: absolute;
  top: -150px;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;

  > div.map_modal {
    max-width: 1200px;
    width: 100%;
    height: 80vh;
    background-color: white;
    position: relative;
    top: 15%;
    box-sizing: border-box;
    margin:80px auto 0 auto;
    border-radius: 8px;
    > .close {
      width: 28px;
      height: 28px;
      color: #8b8585;
      float: right;
      font-size: 30px;
      cursor: pointer;
    }
    >div.map_box{
      width: 100%;
      height: 100%;
      >div#map_list {
        float: left;
        width: 360px;
        height: 100%;
        padding-top: 40px;
        /* background-color: purple; */
        > div.search_box {
          width: 314px;
          height: 45px;
          line-height: 38px;
          border-radius: 10px;
          box-sizing: border-box;
          margin: 0 16px 16px 30px;
          padding-left: 20px;
          background-color: white;
          /* border: solid 1.5px #dadfe5; */
          overflow: hidden;
          border:2px solid #ededed;
          > input.input {
            line-height: 45px;
            width: 236px;
            display: inline-block;
            height: 45px;
            outline: none;
            border: 0px solid;
            font-size: 16px;
            &::placeholder{
              font-size: 14px;
              color:#bcbcbc;
            }
          }
          > div.search_btn {
            line-height: 38px;
            text-align: center;
            float: right;
            margin-right: 16px;
            width:36px;
            height: 40px;
            outline: 0;
            top: 7px;
            > .search_icon {
              width: 16px;
              margin-right: -18px;
              padding-top: 13px;
            }
          }
        }
        >div#markList{
          width: 100%;
          height: calc(100% - 86px);
          padding: 10px 16px 0px 30px;
          z-index: 999;
          /* background-color: red; */
          > div.line {
            width: 100%;
            height: 1px;
            background-color: rgba(0, 0, 0, 0.1);
            margin-bottom: 16px;
          }
          > div.location_box {
            width: 100%;
            height: 30px;
            margin-bottom: 10px;
            font-size: 16px;
            line-height: 30px;
            > div.present_location{
              width: auto;
              float: left;
              color: #464646;
            }
            > div.setting_btn{
              font-size: 14px;
              float: right;
              text-align: center;
              width: 120px;
              height: 30px;
              border-radius: 100px;
              background-color: #464646;
              color: rgba(255, 255, 255, 0.9);
              cursor: pointer;
            } 
          }
          >ul.search_list{
            width: 100%;
            height: calc(100% - 113px);
            overflow: auto;
            border-top: 2px solid rgba(0, 0, 0, 0.1);
            border-bottom: 2px solid rgba(0, 0, 0, 0.1);
            >div.text {
              font-size: 16px;
              font-weight: 500;
              color: rgba(0, 0, 0, 0.3);
              padding: 16px 0 16px 10px;
            }
            >li:nth-child(${(props)=> props.clickIdx}) {
              background-color: rgba(0, 0, 0, 0.03);
            }
            >li.search_result{
              /* background-color: white; */
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              padding: 16px 0 16px 10px;
              cursor: pointer;
              >span.title{
                font-size: 16px;
                font-weight: 500;
              } 
              >span.info{
                padding-left: 5px;
                font-size: 15px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.4);
              }
              >div.address{
                font-size: 15px;
                font-weight: 400;
                padding-top: 5px;
              }
              >label {
                display: inline-block;
                width: 80px;
                height: 32px;
                position: relative;
                margin: 10px 0 0 0;
                >input[type='radio']{
                  appearance: none;
                }
                >input[type='radio']:checked + div.btn {
                  border: 1px solid #ff4342;
                  font-weight: 500;
                  color: #ff4342;
                }
                >div.btn{
                  position: absolute;
                  top: 0;
                  width: 80px;
                  line-height: 32px;
                  text-align: center;
                  height: 32px;
                  border: 1px solid rgba(0, 0, 0, 0.15);
                  font-size: 14px;
                  border-radius: 100px;
                  color: rgba(0, 0, 0, 0.5);
                  cursor: pointer;
                }
                >div.btn:hover {
                  border: 1px solid rgba(0, 0, 0, 0.4);
                  font-weight: 500;
                  color: rgba(0, 0, 0, 0.6);
                }
              } 
            }
            >div.search_result:hover{
              background-color: #ededed;
            }
          }
          .search_list::-webkit-scrollbar {
            width: 10px;
          }
          .search_list::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          }
          .search_list::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          }
          > div.confirm_btn{
            text-align: center;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            font-weight: 500;
            background-color: #ececec;
            border: 1px solid #eaeaea;
            color: #969696;
            box-sizing: border-box;
            margin-top: 16px;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: 1px 1px 5px 0px #00000014;
            &:hover {
              border: 0px;
              background-color: #ff4342;
              color: #ffe1e0;
            }
          }
        } 
      } 
      >div.map_img{
        width: 100%;
        height: 100%;
        padding: 40px 30px 30px 360px;
        /* background-color: rgba(0, 0, 255, 0.5); */
        > div.choice_box{
          position: absolute;
          z-index: 999;
          max-width:790px;
          width: calc(100vw - 425px);
          top: 50px;
          right : 40px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background-color: rgba(255, 250, 176, 0.8);
          padding : 5px 10px;
          line-height: 30px;
          > span.choice{
            font-size: 15px;
            font-weight: 500;
          }
          > span.choice_text{
            padding-left: 5px;
            font-size: 15px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.6);
          }
        }
        >div.present_address{
          width: auto;
          right : 40px;
          bottom: 40px;
          height: 40px;
          border-radius: 10px;
          background-color: white;
          line-height: 40px;
          padding: 0 10px;
          opacity: 0.85;
          position: absolute;
          z-index: 999;
          font-size: 14px;
        }
        >div#map{
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }   
    }
  }
  .infowindow{
    position: absolute;
    width: 180px;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    background-color: white;
    height: 30px;
    line-height: 30px;
    top: -2px;
    left: -15px;
    border-radius: 100px;
    border : 2px solid #ffe312;
  }
  .infowindow.red {
    border : 2px solid red;
  }

  /* #90bd19; */
  @media only screen and (max-width: 768px){
      position: absolute;
      top: -100px;
      right: 0;
      bottom: 0;
      left: 0;
      background: white;
      min-height: 100vh;
      height: auto;
      z-index: 100;
      > div.map_modal {
        position: relative;
        top:20px;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius:0;
        width: 100%;
        height: auto;
      > .close {
      }
      >div.map_box{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column-reverse;
        >div#map_list {
          width: 100%;
          position: relative;
          top: 480px;
          height: auto;
          padding: 0px;
          margin-bottom: 30px;
          > div.search_box {
            width: calc(100% - 44px);
            padding: 0 22px;
            margin: 0px 0px 0px 22px;
            > input.input {
              width: 80%;
              margin: 0;
            }
            > div.search_btn {
              width: 20%;
              margin-right: -30px;
            }
          }
          > div#markList{
            height: auto;
            padding: 22px;
            /* background-color: aqua; */
            > div.line {
              margin-top:16px;
            }
            > div.location_box {
              > div.present_location{
              }
              > div.setting_btn{
              } 
            }
            > ul.search_list{
              width: 100%;
              height: calc(100vh - 683px);
              min-height: 200px;
              >div.text {
              }
              > li.search_result{
                >span.title{
                } 
                >span.info{
                }
                >div.address{
                }
                >div.btn {
                } 
              }
            }
            > div.confirm_btn{
                text-align: center;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                font-weight: 500;
                background-color: #ff4342;
                border: 1px solid #eaeaea;
                color: #ffe1e0;
                box-sizing: border-box;
                margin-top: 16px;
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 1px 1px 5px 0px #00000014;
              }
          }
        }    
        >div.map_img{
          width: 100%;
          height: 450px;
          padding: 0 22px;
          position: absolute;
          top: 40px;
          /* background-color: green; */
          > div.choice_box{
            position: absolute;
            z-index: 999;
            max-width:790px;
            width: calc(100% - 64px);
            top: 10px;
            right : 32px;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 250, 176, 0.8);
            padding : 5px 10px;
            line-height: 20px;
            > span.choice{
              font-size: 15px;
              font-weight: 500;
            }
            > span.choice_text{
              padding-left: 5px;
              font-size: 15px;
              font-weight: 500;
              color: rgba(0, 0, 0, 0.6);
            }
          }
          >div.present_address{
            width: auto;
            right : 30px;
            bottom: 10px;
            height: 40px;
            border-radius: 10px;
            background-color: white;
            line-height: 40px;
            padding: 0 10px;
            opacity: 0.9;
            position: absolute;
            z-index: 999;
            font-size: 14px;
          }
          >div#map{
          }   
        }
      }
    }
  }
`;

const MapModal = ({ setMapModal, setLocationInfo, locationInfo }) => {
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  let dispatch = useDispatch();
  // useState로 Input 값 받기
  let[inputWord, setInputWord] = useState('');
  let[searchWord, setSearchWord] = useState('');
  let[searching, setSearching] = useState(0);
  let defaultLocation = [setUserInfo.region||'서대문구' , guCodeList[1][setUserInfo.region||'서대문구'][0], guCodeList[1][setUserInfo.region||'서대문구'][1]]; // 서대문구 위치에 사용자 프로필의 구를 써준다.
  let[location, setLocation] = useState(defaultLocation[0]); //지도위치에 따라 변화하는 구, default : 내 프로필 구
  let[defaultCoordinate, setDefaultCoordinate] = useState([defaultLocation[2], defaultLocation[1], setUserInfo.region||'서대문구']);
  let[doroAddress, setDoroAddress] = useState('');
  let[jibunAddress, setJibunAddress] = useState('');
  let[markerName, setMarkerName] = useState('');
  let[searchResult, setSearchResult] = useState([]);
  let searchMarkerList = [];
  let [clickIdx, setClickIdx] = useState(1); // 클릭한 내용 배경색 바꾸기
  //-------- 선언된 함수들
   // 함수1 : 내동네로 이동하는 함수
  const handleClickResetLocation = (e) => {
    // console.log('이동하겠지 ? ');
    setSearchWord('');
    setLocation(defaultLocation[0]);
    setDoroAddress('');
    setJibunAddress('');
    setMarkerName('');
    setSearchResult([]);
    setDefaultCoordinate([defaultLocation[2], defaultLocation[1]]);
    // 이전에 생성된 지도 지우기
    let removeDiv = document.getElementById('map'); 
    while ( removeDiv.hasChildNodes() ) { 
      removeDiv.removeChild( removeDiv.firstChild ); 
    };
    //useEffect실행
    setSearching(searching+1);
  }
  
  // 함수2 : 
   const handleChangeSearchWord = (e) => {
    // console.log('검색');
    setInputWord(e.target.value);
  }

  // 함수3 : 검색하기 icon 클릭 시 검색 실행되는 함수
  const handleClickSearch = (e) => {
    // axios : 검색 요청
    if(inputWord!==''){
      setSearchWord(`${location} ${inputWord}`);
      // setSearchResult([]);
      // searchMarkerList = [];
      // 이전에 생성된 지도 지우기
      setClickIdx(1);
      let removeDiv = document.getElementById('map'); 
      while ( removeDiv.hasChildNodes() ) { 
        removeDiv.removeChild( removeDiv.firstChild ); 
      };
      //useEffect실행
      setSearching(searching+1);
    }
  }

  // 함수4 :  Enter 입력 시 검색 실행되는 함수
  const onCheckEnter = (e) => {
    if(e.key === 'Enter') {
      handleClickSearch();
    }
  }

  // 함수5 : 마커위치로 이동하는 함수
  const handleClickMarker = (e) => {
    // 이전에 생성된 지도 지우기
    let removeDiv = document.getElementById('map'); 
    while ( removeDiv.hasChildNodes() ) { 
      removeDiv.removeChild( removeDiv.firstChild ); 
    };
    let idx = e.target.getAttribute('value');
    
    // 클릭한 것에 배경색 주기
    setClickIdx(Number(idx)+1);
    
    // marker위치로 바꿔주기
    // setDefaultCoordinate([y, x]);
    let x = searchResult[idx]['x'];
    let y = searchResult[idx]['y'];
    let place_name =  searchResult[idx]['place_name'];
    setDefaultCoordinate([Number(y), Number(x), place_name]);
    setSearchWord('');
    // console.log(defaultCoordinate);
    //useEffect실행
    setSearching(searching+1);
  }

  // 함수6: 장소 선택하는 함수
  const handleClickChoiceLocationInfo = (e) => {
    let idx = e.target.getAttribute('value');
    setLocationInfo([searchResult[idx]['place_name'],searchResult[idx]['road_address_name'] || searchResult[idx]['address_name'], searchResult[idx]['place_url']]);
    console.log(locationInfo)
  }


  // kakao map api 
  useEffect(() => {
    

    let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(...defaultCoordinate), // 지도의 중심좌표
            level: 6// 지도의 확대 레벨
        };  

    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다      
    let ps = new kakao.maps.services.Places(map); // 장소 검색 객체를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});//인포윈도우 생성 객체

    // ---------현재 위치에 마크표시하기 함수 ------------------------------
    displayMarkerPresent(defaultCoordinate)
    function displayMarkerPresent(place) {
      // console.log('실행중?', place[1], place[0])
      let imageSrc3 = "https://media.vlpt.us/images/ez0ez0/post/471bf46b-bdbf-4fe5-b183-0231cbcdf108/location%20(4).png"; 
      // 마커 이미지의 이미지 크기 입니다
      let imageSize = new kakao.maps.Size(35,35); 
      
      // 마커 이미지를 생성합니다    
      let markerImage = new kakao.maps.MarkerImage(imageSrc3, imageSize); 
      
      // 마커를 생성하고 지도에 표시합니다
      let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place[0], place[1]) ,
          image : markerImage
      });  

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div class="infowindow red">' + place[2] + '</div>');
        infowindow.open(map, marker);
    });
    }
      
    // ---------대형마트,백화점,슈퍼,홈플러스 지도에 표시하는 함수 묶음 ------------------------------
    // 키워드로 장소를 검색합니다
    ps.keywordSearch('홈플러스', placesSearchCB); 
    ps.keywordSearch('슈퍼', placesSearchCB); 
    ps.keywordSearch('마트', placesSearchCB); 
    ps.keywordSearch('백화점', placesSearchCB); 
    
    // 마커 이미지의 이미지 주소입니다
    let imageSrc = "https://media.vlpt.us/images/ez0ez0/post/f6c18017-bc2a-4037-b602-99145bef53f5/trolley.png"; 
    
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            for (let i=0; i<data.length; i++) {
                if(data[i].y != defaultCoordinate[0] && data[i].x != defaultCoordinate[1]){ 
                  displayMarker(data[i]);
                } 
            }       
        } 
    }

    // 지도에 마커를 표시하는 함수입니다 
    function displayMarker(place) {
        // 마커 이미지의 이미지 크기 입니다
        let imageSize = new kakao.maps.Size(32,32); 
        
        // 마커 이미지를 생성합니다    
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        // 마커를 생성하고 지도에 표시합니다
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) ,
            image : markerImage
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {

            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div class="infowindow">' + place.place_name + '</div>');
            infowindow.open(map, marker);
            // console.log('콘솔', infowindow.getContent().split('>')[1].split('<')[0]);
            setMarkerName(place.place_name);
            setDoroAddress(place.road_address_name);
            setJibunAddress(place.address_name);
        });
    }
    
    // 기능들--------------------------

    // ---------검색창에 검색결과 마커를 지도에 표시하는 함수 묶음 ------------------------------
    // 마커 이미지의 이미지 주소입니다
    let imageSrc2 = "https://media.vlpt.us/images/ez0ez0/post/471bf46b-bdbf-4fe5-b183-0231cbcdf108/location%20(4).png";  
    

    // 지도상 현재 위치 찾아서 검색범위 설정하는 함수 
    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function() {
      let center = map.getCenter();
      // console.log(center.getLat(), center.getLng());
      let presentGeocoder = new kakao.maps.services.Geocoder();
      let callbackGuCode = function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            let guCode = result[0].code.slice(0,5);
            if(guCodeList[0][guCode][0]){setLocation(guCodeList[0][guCode][0]);}
            else setLocation(defaultLocation[0]);
            // console.log('지도변화',location, guCodeList[0][guCode]);
          }
      };
      presentGeocoder.coord2RegionCode(center.getLng(), center.getLat(), callbackGuCode);
    });
    
    // 키워드로 장소를 검색합니다
    if(searchWord !== ''){ ps.keywordSearch(searchWord, myPlacesSearchCB); }
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function myPlacesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            for (var i=0; i<data.length; i++) {
                displayMarkerSearching(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
            }   
            setSearchResult(searchMarkerList);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        } 
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarkerSearching(place) {
        // 마커 이미지의 이미지 크기 입니다
        let imageSize = new kakao.maps.Size(35, 35); 
        
        // 마커 이미지를 생성합니다    
        let markerImage = new kakao.maps.MarkerImage(imageSrc2, imageSize); 
        
        // 마커를 생성하고 지도에 표시합니다
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x), 
            image : markerImage
        });
        searchMarkerList = searchMarkerList.concat([place]);
        console.log(searchMarkerList);
        // console.log(place, searchMarkerList)
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div class="infowindow red">' + place.place_name + '</div>');
            infowindow.open(map, marker);
            // console.log('콘솔', infowindow.getContent().split('>')[1].split('<')[0]);
            // console.log(place);
            setMarkerName(place.place_name);
            setDoroAddress(place.road_address_name);
            setJibunAddress(place.address_name);
        });
    }

    // ---------클릭한 곳의 위치 찾는 함수 묶음 ------------------------------
    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
      // console.log(mouseEvent.latLng)
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        // console.log(infowindow.getContent());
        if (status === kakao.maps.services.Status.OK) {
          setMarkerName('');
          result[0].road_address ? setDoroAddress(result[0].road_address.address_name) : setDoroAddress('');
          result[0].address ? setJibunAddress(result[0].address.address_name) : setJibunAddress('');
        }
      });
    });
    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

  }, [searching]);

  

  return (
    <MapModalWrapper clickIdx={clickIdx}>
      <div className="map_modal">
        <div className="close" onClick={() => setMapModal(false)}>
          &times;
        </div>
        <div className='map_box'>
          <div id='map_list'> 
            <div className='search_box'>
              <input className='input' type='text' onChange={handleChangeSearchWord} onKeyPress={onCheckEnter} placeholder='장소를 검색해주세요.'/>
              <div className='search_btn' onClick={handleClickSearch}> 
                <SearchIcon stroke='#868E96' className="icon search_icon" onClick={handleClickSearch}></SearchIcon>  
              </div>
            </div>
            <div id='markList'>
              {/* <div className='line'></div> */}
              <div className='location_box'>
                <div className='present_location'>검색 위치 &nbsp; &#9656; &nbsp; {location}</div>
                <div className='setting_btn' onClick={handleClickResetLocation} >내 동네로 이동</div>
              </div>
              { (searchResult.length === 0) ?
                <ul className='search_list'>
                  <div className='text'>장소를 검색해주세요.</div>
                </ul>
                :
                <ul className='search_list'>
                  { searchResult.map((el, idx)=>(
                    <li className='search_result' key={idx} value={idx} onClick={handleClickMarker}> 
                      <span className='title' value={idx}>{el['place_name']}</span>
                      <span className='info' value={idx}>{el['category_group_name']}</span>
                      <div className='address' value={idx}>{el['road_address_name'] || el['address_name']}</div>
                      {/* <div className={ idx + ' btn' } value={idx} onClick={handleClickChoiceLocationInfo}> 장소 선정 </div>  */}
                      <label htmlFor={idx} onClick={handleClickChoiceLocationInfo}>
                        <input id={idx} type="radio" name='choice_location' value={idx} checked={locationInfo[0] === el['place_name']} onChange={handleClickChoiceLocationInfo}/>
                        <div className='btn' value={idx}> 장소 선정</div>
                      </label>
                    </li>
                  ))}
                </ul>
              }
              <div className='confirm_btn'  onClick={() => setMapModal(false)}> 선택 완료 </div>
            </div>
          </div>
          <div className='map_img'>
            {locationInfo[0]!=='' ? 
              <div className='choice_box'>
                <span className='choice'> 선택된 장소 </span>
                <span className='choice_text'>{locationInfo[0]}, {locationInfo[1]}</span>
              </div> : 
              <div></div>
            }
            { jibunAddress ? 
              <div className='present_address'>
                {
                  doroAddress ? <div>{doroAddress}</div>
                  : <div>{jibunAddress}</div>
                }
              </div>
              : <div></div>
            }
            <div id='map'></div>
          </div>
        </div>
      </div>
    </MapModalWrapper>
  );
};

export default MapModal;

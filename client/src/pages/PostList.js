import React, { useState, useEffect, useRef, useCallback } from 'react';
import List from '../component/List';
import axios from 'axios';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import {
  showPostData,
  showMorePostList,
  categoryList,
  postListReset,
} from '../redux/actions/actions';
// import { useInView } from "react-intersection-observer";

const LoadingDiv = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 90px auto 90px auto;
`;

// ----------------------Loading 컴포넌트
function Loading() {
  return (
    <LoadingDiv>
      <Oval color="#00BFFF" height={30} width={30} />
    </LoadingDiv>
  );
}

// ------------------PostList 컴포넌트
const PostList = () => {
  const [categoryData, setCategoryData] = useState('');
  const [isLoding, setIsLoding] = useState(false); 
  const state = useSelector((state) => state.postListReducer); //리스트 상태값
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] =  useState(state.length / 10);


  // 페이지 별 리스트 요청 함수  ------ 3
  const postList = async (categoryData, pageNumber) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/articles/lists`, {
        params: {
          category: categoryData,
          page: pageNumber,
          // search: search,
          // sort: sort,
          // isHost: isHost,
        },
      })
      .then((listData) => {
        console.log(listData)
        if (listData.data.data.articleList.length === 0) {
          // setTimeout(() => {
          //   setIsLoding(false);
          // }, 500);
          setIsLoding(false);
        } else {
          setIsLoding(true);
          dispatch({
            type: 'SHOW_MORE_POSTLIST',
            payload: listData.data.data.articleList,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 로딩을 만나면 페이지 넘버를 바꿔준다. ------ 2 -> 1
  const pageEnd = useRef();
  useEffect(() => {
    if (isLoding) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1); // 페이지 넘버를 바꿔준다.
          }
        },
        { threshold: 0 }
      );
      observer.observe(pageEnd.current);
    }
  }, [isLoding]);

  // useEffect :: < 처음 로딩 될때 || 카테고리 데이터 바뀔때 || 페이지 숫자 바뀔때 > 만 실행되는 리스트 요청 함수 ------ 1
  useEffect(() => {
    postList(categoryData, pageNumber);
  }, [categoryData, pageNumber]);

  // 카테고리 바꿀 시 요청 함수(List 컴포넌트에서 사용)  ------ 0 -> 1
  const handleFilterCategory = (event) => {
    if (event.target.value === '전체') {
      dispatch(postListReset());
      setCategoryData('');
      setPageNumber(0);
    } else {
      dispatch(postListReset());
      setCategoryData(event.target.value);
      setPageNumber(0);
    }
  };

  return (
    <div className="section">
      <List
        categoryData={categoryData}
        handleFilterCategory={handleFilterCategory}
      ></List>
      <div ref={pageEnd}></div>
      {isLoding ? <Loading></Loading> : '더 이상 불러올 게시글이 없습니다.'}
    </div>
  );
};

export default PostList;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import List from '../component/List';
import axios from 'axios';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { postListReset } from '../redux/actions/actions';
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

const AlertDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 75px auto;
`;

// ----------------------Loading 컴포넌트
function Loading() {
  return (
    <LoadingDiv>
      <Oval color="#00BFFF" height={30} width={30} />
    </LoadingDiv>
  );
}

function EndAlert() {
  return (
    <>
      <AlertDiv>더 이상 불러올 게시글이 없습니다.</AlertDiv>
    </>
  );
}
// ------------------PostList 컴포넌트
const PostList = () => {
  const [isLoding, setIsLoding] = useState(true);
  const [categoryData, setCategoryData] = useState('');

  const [sort, setSort] = useState('');
  const state = useSelector((state) => state.postListReducer); //리스트 상태값
  const [pageNumber, setPageNumber] = useState(state.length / 10);
  const dispatch = useDispatch();

  // 페이지 별 리스트 요청 함수  ------ 3
  const postList = async (categoryData, pageNumber, sort) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/articles/lists`, {
        params: {
          category: categoryData,
          page: pageNumber,
          // search: search,
          sort: sort,
        },
      })
      .then((listData) => {
        let articleList = listData.data.data.articleList;
        console.log(articleList);
        // console.log('ArticleList', listData.data.data.articleList);
        if (listData.data.data.articleList.length === 0) {
          // setTimeout(() => {
          //   setIsLoding(false);
          // }, 500);
          setIsLoding(false);
        } else {
          setIsLoding(true);
          articleList = articleList.map((elem) => {
            let postImageKey = elem.image;
            elem.image = `https://d2fg2pprparkkb.cloudfront.net/${postImageKey}?w=115&h=115&f=webp&q=90`;
            return elem;
          });
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
    postList(categoryData, pageNumber, sort);
    // return () => {
    //   console.log('컴포넌트가 화면에서 사라짐')
    //   dispatch(postListReset());
    // }
  }, [categoryData, pageNumber, sort]);

  useEffect(() => {
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
      dispatch(postListReset());
    };
  }, []);

  // 카테고리 바꿀 시 요청 함수(List 컴포넌트에서 사용)  ------ 0 -> 1
  const handleFilterCategory = (event) => {
    console.log(event.target.getAttribute('data-value'))
    if (event.target.getAttribute('data-value') === '전체') {
      dispatch(postListReset());
      setCategoryData('');
      setPageNumber(0);
    } else {
      dispatch(postListReset());
      setCategoryData(event.target.getAttribute('data-value'));
      setPageNumber(0);
    }
  };

  // 정렬 카테고리 바꿀 시 요청 함수(List 컴포넌트에서 사용)  ------ 0 -> 1
  const handleFilterSort = (event) => {
    if (event.target.value === 'due-date') {
      dispatch(postListReset());
      setCategoryData('');
      setSort('due-date');
      setPageNumber(0);
    } else if (event.target.value === 'upload') {
      dispatch(postListReset());
      setCategoryData('');
      setPageNumber(0);
      setSort('');
    }
  };

  return (
    <div className="section">
      <List
        categoryData={categoryData}
        handleFilterCategory={handleFilterCategory}
        handleFilterSort={handleFilterSort}
      ></List>
      <div ref={pageEnd}></div>
      {isLoding ? <Loading></Loading> : <EndAlert></EndAlert>}
    </div>
  );
};

export default PostList;

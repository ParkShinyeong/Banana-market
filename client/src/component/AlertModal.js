import React from 'react';
import styled from 'styled-components';


// const ModalWrapper = styled.div`
//   max-width: 1200px;
//   /* background-color: powderblue; */
//   margin: 50px auto;
//   @media screen and (max-width: 767px) {
//     margin: 80px auto 30px auto;
//     width: 100%;
// `

function AlertModal ({announcement}){
  return (
    <div>
      <ModalWrapper>
        {announcement}
      </ModalWrapper>
    </div>
  );
};

export default AlertModal;
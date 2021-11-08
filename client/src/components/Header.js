import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 16px;
  padding-bottom: 16px;
`

const HeaderPicture = styled.img`
  padding-bottom: 16px;
  padding-right: 45%;
  padding-left: 45%;
  width: auto;
  height: auto;
`

const HeaderTitle = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: space-evenly;
  font-weight: bold;
  font-size: 32px;
`

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderPicture src={'https://i.pinimg.com/originals/d7/03/e6/d703e69ba28fd46cec7662edb50678d5.jpg'}/>
      <HeaderTitle>
        Rushing Stats
      </HeaderTitle>
    </HeaderWrapper>
  )
}

export default Header